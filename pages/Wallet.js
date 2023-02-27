import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../src/components/Sidebar/Sidebar";
import Header from "../src/components/Header/Header";
// import { BiRupee } from "react-icons/bi";
import supabase from "../src/Config/supabaseClient";
import BottomMenu from "../src/components/BottomMenu/BottomMenu";
import { MainUseContext } from "../src/context/MainUseContext";

const Wallet = () => {
  const storeState = useContext(MainUseContext);
  let { userDetailsContext, transactionContext } = storeState;
  let { userId, updateUserId } = userDetailsContext;
  const [inputBalance, setInputBalance] = useState(0);
  const [userWalletBalance, setUserWalletBalance] = useState("");
  const [reRender, setReRender] = useState(true);

  const fetchUserWalletDetails = async (userId) => {
    try {
      let fetchResponse = await supabase
        .from("profiles")
        .select("wallet_balance")
        .eq("id", userId);

      if (fetchResponse.error) {
        alert("Unable to fetch user Data");
        return;
      }

      if (fetchResponse.data) {
        setUserWalletBalance(fetchResponse.data[0].wallet_balance);
      }
    } catch (err) {}
  };

  const addFundButton = async () => {
    if (inputBalance <= 0) {
      alert("Please Add Money More Than 0");
      return;
    }
    try {
      let fundResponse = await supabase.rpc("update_wallet_balance", {
        amount: Number(inputBalance),
      });

      if (fundResponse.error) {
        try {
          let transactionResponse = await supabase.rpc(
            "update_transaction_details",
            {
              amount: inputBalance.toString(),
              sender: "user adding fund",
              receiver: "user",
              message: "transaction failed",
              id: userId,
              type: "credit",
              status: "failed",
            }
          );
          if (transactionResponse.status == 200) {
            alert("TRansaction Failed");
          } else {
            alert("Internal Server Problem");
          }
        } catch (err) {}
      }

      if (fundResponse.status == 200) {
        try {
          let transactionResponse = await supabase.rpc(
            "update_transaction_details",
            {
              amount: inputBalance.toString(),
              sender: "user adding fund",
              receiver: "user",
              message: "fund added to wallet",
              id: userId,
              type: "credit",
              status: "success",
            }
          );
          if (transactionResponse.status == 200) {
            setReRender(!reRender);
            alert("Successfully Added Balance");
          } else {
            alert("Internal Server Problem");
          }
        } catch (err) {}
      }
    } catch (err) {}
  };

  useEffect(() => {
    updateUserId(
      JSON.parse(localStorage.getItem("sb-ziaxsvytbaahgjrompdd-auth-token"))
        .user.id
    );
    fetchUserWalletDetails(
      JSON.parse(localStorage.getItem("sb-ziaxsvytbaahgjrompdd-auth-token"))
        .user.id
    );
  }, [reRender]);

  return (
    <div className="w-full flex flex-row">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="p-2 pt-6 md:p-6 flex flex-col gap-y-7 items-center mb-12">
          <h1 className="text-2xl">My Investment Account</h1>
          <div className="border-4 bordedr-black w-full md:w-1/3 rounded-2xl p-6 flex flex-col gap-y-4">
            <h1 className="text-xl">Current Balance</h1>
            <h1 className="text-xl">Available for Investing</h1>
            <h1 className="text-xl flex items-center">
              {/* <BiRupee /> &nbsp; {userWalletBalance} */}
              {userWalletBalance}
            </h1>
          </div>
          <div className="border-4 bordedr-black w-full md:w-1/3 rounded-2xl p-6 flex flex-col gap-y-5">
            <h1 className="text-xl">Add Money</h1>
            <input
              placeholder={"Enter Amount"}
              className="border-2 pl-2 h-10"
              value={inputBalance}
              onChange={(e) => setInputBalance(Number(e.target.value))}
            />
            <div className="flex justify-between">
              <button
                className="border-2 py-1 px-3 rounded-xl bg-gray-700 text-white"
                onClick={() => setInputBalance(5000)}
              >
                + 5000
              </button>
              <button
                className="border-2 py-1 px-3 rounded-xl bg-gray-700 text-white"
                onClick={() => setInputBalance(25000)}
              >
                + 25000
              </button>
              <button
                className="border-2 py-1 px-3 rounded-xl bg-gray-700 text-white"
                onClick={() => setInputBalance(50000)}
              >
                + 50000
              </button>
            </div>
            <button
              className="bg-green-500 text-white w-1/2 self-center h-9 rounded-xl"
              onClick={addFundButton}
            >
              Add Fund
            </button>
          </div>
        </div>
        <BottomMenu />
      </div>
    </div>
  );
};

export default Wallet;
