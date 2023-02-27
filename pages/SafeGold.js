import React, { useContext, useEffect, useState } from "react";
import Header from "../src/components/Header/Header";
import Sidebar from "../src/components/Sidebar/Sidebar";
import BuyGoldBox from "../src/components/SafeGold/BuyGoldBox";
import SellGoldBox from "../src/components/SafeGold/SellGoldBox";
import TransactionData from "../src/components/SafeGold/TransactionData";
import BottomMenu from "../src/components/BottomMenu/BottomMenu";
import { MainUseContext } from "../src/context/MainUseContext";
import supabase from "../src/Config/supabaseClient";
import axios from "axios";

const SafeGold = () => {
  const storeState = useContext(MainUseContext);
  let { userDetailsContext, safeGoldContext } = storeState;
  let { updateUserData, updateUserId, userId, userData } = userDetailsContext;
  let {
    safeGoldData,
    updateSfUserData,
    updateTransactType,
    updateGoldLiveBuyPrice,
    updateGoldLiveSellPrice,
    updateTotalTransactions,
  } = safeGoldContext;
  const [inputUserDetails, setInputUserDetails] = useState({
    name: "",
    mobile_no: "",
    email: "",
    pin_code: "",
    delivery_address: "",
  });
  const [reRender, setRerender] = useState(true);

  const inputValueChangeHandler = (e) => {
    if (e.target.name == "mobile_no" || e.target.name == "pin_code") {
      setInputUserDetails({
        ...inputUserDetails,
        [e.target.name]: Number(e.target.value),
      });
    } else {
      setInputUserDetails({
        ...inputUserDetails,
        [e.target.name]: e.target.value,
      });
    }
  };

  let registerHandler = async () => {
    if (
      inputUserDetails.name == "" ||
      inputUserDetails.mobile_no == "" ||
      inputUserDetails.email == "" ||
      inputUserDetails.pin_code == "" ||
      inputUserDetails.delivery_address == ""
    ) {
      alert("Please Fill All The Feilds");
      return;
    }

    let options = {
      url: "https://partners-staging.safegold.com/v1/users",
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: "Bearer 38778d59d5e17cfadc750e87703eb5e2",
        "content-type": "application/json",
      },
      data: JSON.stringify(inputUserDetails),
    };
    try {
      let fetchResponse = await axios(options);
      console.log(fetchResponse);
      if (fetchResponse.status == 200) {
        updateSfUserData(fetchResponse.data);
        insertSafeGoldIdToDb(fetchResponse.data.id, userId);
      }

      if (fetchResponse.status == 400) {
        alert("Unable to Create User");
        return;
      }
    } catch (err) {
      alert(err.response.data.message);
      return;
    }
  };

  const insertSafeGoldIdToDb = async (safeGoldUserId, userId) => {
    try {
      let fetchResponse = await supabase
        .from("profiles")
        .update({ safe_gold_user_id: safeGoldUserId })
        .eq("id", userId);

      if (fetchResponse.error) {
        alert("Unable to Create User!");
        return;
      }

      if (fetchResponse.status == 204) {
        alert("User Successfully Created");
        setRerender(!reRender);
        return;
      }
    } catch (err) {
      alert(err.response.data.message);
      return;
    }
  };

  let getSafeGoldBalance = async (safeGoldId) => {
    let option = {
      url: `https://partners-staging.safegold.com/v1/users/${safeGoldId}`,
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer 38778d59d5e17cfadc750e87703eb5e2",
      },
    };
    try {
      let fetchResponse = await axios(option);
      console.log(fetchResponse);
      if (fetchResponse.status == 200) {
        updateSfUserData(fetchResponse.data);
      }
    } catch (err) {
      alert(err.response.data.message);
      return;
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      let fetchResponse = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId);
      console.log(fetchResponse);
      if (fetchResponse.error) {
      }

      if (fetchResponse.data) {
        updateUserData(fetchResponse.data[0]);
        if (fetchResponse.data[0]["safe_gold_user_id"] != null) {
          getSafeGoldBalance(fetchResponse.data[0]["safe_gold_user_id"]);
        }
      }
    } catch (err) {
      alert(err.response.data.message);
      return;
    }
  };

  const optionButtons = (type) => {
    if (type == "Buy Gold") {
      updateTransactType("Buy Gold");
    } else if (type == "Sell Gold") {
      updateTransactType("Sell Gold");
    }
  };

  const fetchTransactions = async (safeGoldUserId) => {
    updateTransactType("Transactions");
    const option = {
      url: `https://partners-staging.safegold.com/v1/users/${safeGoldUserId}/transactions`,
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer 38778d59d5e17cfadc750e87703eb5e2",
      },
    };
    try {
      let response = await axios(option);
      console.log(response);
      if (response.status == 200) {
        updateTotalTransactions(response.data.transactions);
      }
    } catch (err) {
      console.log(err)
      alert(err.response.data.message);
    }
  };

  useEffect(() => {
    updateUserId(
      JSON.parse(localStorage.getItem("sb-ziaxsvytbaahgjrompdd-auth-token"))
        .user.id
    );
  }, []);

  useEffect(() => {
    fetchUserDetails(
      JSON.parse(localStorage.getItem("sb-ziaxsvytbaahgjrompdd-auth-token"))
        .user.id
    );
  }, [reRender]);

  return (
    <div className="w-full flex flex-row">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="p-2 pt-6 md:p-6 flex flex-col w-full gap-y-5 items-center mb-14">
          {/* user registeration with safe gold api box */}
          {userData == "" ? null : (
            <>
              {userData["safe_gold_user_id"] != null ? null : (
                <div className="w-full md:w-1/3 flex flex-col gap-y-4 self-center">
                  <h1 className="text-md md:text-xl text-center">
                    Please Fill Your Details
                  </h1>
                  <div className="flex flex-col gap-y-2">
                    <label className="text-md md:text-xl">Name</label>
                    <input
                      type={"text"}
                      placeholder={"Enter Your Name"}
                      className="border-2 h-10 pl-2"
                      value={inputUserDetails.name}
                      name="name"
                      onChange={inputValueChangeHandler}
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <label className="text-md md:text-xl">Mobile Number</label>
                    <input
                      type={"number"}
                      placeholder={"Enter Your Mobile Number"}
                      className="border-2 h-10 pl-2"
                      value={inputUserDetails.mobile_no}
                      name="mobile_no"
                      onChange={inputValueChangeHandler}
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <label className="text-md md:text-xl">Email</label>
                    <input
                      type={"text"}
                      placeholder={"Enter Your Email Id"}
                      className="border-2 h-10 pl-2"
                      value={inputUserDetails.email}
                      name="email"
                      onChange={inputValueChangeHandler}
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <label className="text-md md:text-xl">Pin Code</label>
                    <input
                      type={"number"}
                      placeholder={"Enter Pin Code"}
                      className="border-2 h-10 pl-2"
                      value={inputUserDetails.pin_code}
                      name="pin_code"
                      onChange={inputValueChangeHandler}
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <label className="text-md md:text-xl">
                      Delivery Address
                    </label>
                    <input
                      type={"text"}
                      placeholder={"Enter Your Address"}
                      className="border-2 h-10 pl-2"
                      value={inputUserDetails.delivery_address}
                      name="delivery_address"
                      onChange={inputValueChangeHandler}
                    />
                  </div>
                  <button
                    className="border-2 p-1 rounded-xl bg-green-400 text-white"
                    onClick={registerHandler}
                  >
                    Register
                  </button>
                </div>
              )}
            </>
          )}

          {/* gold Balance Box */}
          {safeGoldData.sfUserData == "" ? null : (
            <div className="border-2 border-slate-400 w-full md:w-1/3 p-4 rounded-xl flex flex-col gap-y-5 hover:cursor-pointer">
              <h1 className="text-lg md:text-xl">Total Gold Balance</h1>
              <h1 className="text-lg md:text-xl">
                {safeGoldData.sfUserData.gold_balance} &nbsp;gm
              </h1>
              <div className="w-full flex justify-between gap-x-2">
                <button
                  className="border-2 p-2 bg-slate-600 text-white rounded-2xl"
                  onClick={() => optionButtons("Buy Gold")}
                >
                  Buy Gold
                </button>
                <button
                  className="border-2 p-2 bg-slate-600 text-white rounded-2xl"
                  onClick={() => optionButtons("Sell Gold")}
                >
                  Sell Gold
                </button>
                <button
                  className="border-2 p-2 bg-slate-600 text-white rounded-2xl"
                  onClick={fetchTransactions}
                >
                  Transactions
                </button>
              </div>
            </div>
          )}

          {/* buy gold and sell gold setup box */}
          {safeGoldData.transactType == "" ? null : safeGoldData.transactType ==
            "Buy Gold" ? (
            <BuyGoldBox />
          ) : safeGoldData.transactType == "Sell Gold" ? (
            <SellGoldBox />
          ) : safeGoldData.totalTransactions.length == 0 ? (
            <h1>No Transaction Record Found</h1>
          ) : (
            <div className="w-full flex flex-col gap-y-5">
              {safeGoldData.totalTransactions.map((item, index) => {
                return <TransactionData key={index} item={item} />;
              })}
            </div>
          )}

          <BottomMenu />
        </div>
      </div>
    </div>
  );
};

export default SafeGold;
