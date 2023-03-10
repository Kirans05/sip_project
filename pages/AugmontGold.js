import React, { useEffect, useState } from "react";
import Sidebar from "../src/components/Sidebar/Sidebar";
import Header from "../src/components/Header/Header";
import axios from "axios";
import AugmontSignInModal from "../src/components/Modal/AugmontSignInModal";

const AugmontGold = () => {
  const [merchantId_AccessToken, setMerchantId_AccessToken] = useState({
    merchantId: "",
    accessToken: "",
  });

  const [buttonClicked, setButtonClicked] = useState({
    signIn: false,
  });

  const [metalDetails, setMetalDetails] = useState("");
  const [userPassbook, setUserPassbook] = useState("");
  const [passbookRerender, setPassbookRerender] = useState(true);
  const [optionsSelected, setOptionSelected] = useState("buy")
  const [metalSelected, setMetalSelected] = useState("gold")

  const closeSignInModal = () => {
    setButtonClicked({ ...buttonClicked, signIn: !buttonClicked.signIn });
  };

  const generateAccessToken = async () => {
    let options = {
      url: "https://uat-api.augmontgold.com/api/merchant/v1/auth/login",
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: {
        email: "kiran@10xgeeks.com",
        password: "pBuMZR7|_O{WQ@i8",
      },
    };
    try {
      let fetchResponse = await axios(options);
      if (fetchResponse.status == 200) {
        if (fetchResponse.data.message == "Logged in successfully.") {
          setMerchantId_AccessToken({
            merchantId: fetchResponse.data.result.data.merchantId,
            accessToken: fetchResponse.data.result.data.accessToken,
          });
          await fetchUserPassbook(fetchResponse.data.result.data.accessToken);
          await fetchGold_SilverRates(
            fetchResponse.data.result.data.accessToken
          );
        }
      }
    } catch (err) {}
  };

  const fetchUserAddressList = async () => {
    let options = {
      url: `https://uat-api.augmontgold.com/api/merchant/v1/users/17a8937e-ec5f-41bc-a1e2-f18e9dd7a664/address`,
      method: "get",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${merchantId_AccessToken.accessToken}`,
      },
    };
    try {
      let fetchResponse = await axios(options);
      console.log(fetchResponse);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserPassbook = async (token = null) => {
    let options = {
      url: `https://uat-api.augmontgold.com/api/merchant/v1/users/17a8937e-ec5f-41bc-a1e2-f18e9dd7a664/passbook`,
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${
          token == null ? merchantId_AccessToken.accessToken : token
        }`,
      },
    };
    try {
      let fetchResponse = await axios(options);
      console.log(fetchResponse);
      if (fetchResponse.status == 200) {
        if (fetchResponse.data.message == "Passbook generated successfully.") {
          setUserPassbook(fetchResponse.data.result.data);
        }
      }
    } catch (err) {}
  };

  const fetchGold_SilverRates = async (token = null) => {
    let options = {
      url: "https://uat-api.augmontgold.com/api/merchant/v1/rates",
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${
          token == null ? merchantId_AccessToken.accessToken : token
        }`,
      },
    };
    try {
      let fetchResponse = await axios(options);
      console.log(fetchResponse);
      if (fetchResponse.status == 200) {
        if (fetchResponse.data.message == "Rates retrieved successfully.") {
          setMetalDetails(fetchResponse.data.result.data);
        }
      }
    } catch (err) {}
  };

  const BuyGold = async () => {
    let data = new FormData();
    const merchantTransactionId = Math.random().toString(36).substring(2);
    if (metalDetails != "") {
      data.append("lockPrice", metalDetails.rates.gBuy);
      data.append("metalType", "gold");
      data.append("amount", "1000");
      // data.append("quantity", "0.1");
      data.append("merchantTransactionId", merchantTransactionId);
      data.append("uniqueId", "17a8937e-ec5f-41bc-a1e2-f18e9dd7a664");
      data.append("blockId", metalDetails.blockId);
    }

    let options = {
      url: "https://uat-api.augmontgold.com/api/merchant/v1/buy",
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${merchantId_AccessToken.accessToken}`,
      },
      data: data,
    };
    try {
      let fetchResponse = await axios(options);
      console.log(fetchResponse);
    } catch (err) {}
  };

  useEffect(() => {
    generateAccessToken();
  }, []);

  // useEffect(() => {
  //   if (merchantId_AccessToken.accessToken != "") {
  //     fetchUserPassbook(merchantId_AccessToken.accessToken);
  //   }
  // }, [passbookRerender]);

  // useEffect(() => {
  //   // let interval = setInterval(fetchGold_SilverRates, 15000)
  //   // return () => clearInterval(interval)
  // }, []);

  return (
    <div className="w-full flex flex-row">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="p-2 pt-6 md:p-6 flex flex-col gap-y-3 w-full">
          <h1>Augmont api</h1>
          <div className="border-2 w-full">
            <div className="flex justify-end gap-x-3">
              <h1>Digi Gold</h1>
              <h1>Delivery</h1>
              <h1>SIP</h1>
              <h1
                onClick={() =>
                  setButtonClicked({
                    ...buttonClicked,
                    signIn: !buttonClicked.signIn,
                  })
                }
                className="hover:cursor-pointer"
              >
                Sign In
              </h1>
            </div>
            {buttonClicked.signIn ? (
              <AugmontSignInModal
                closeSignInModal={closeSignInModal}
                merchantId_AccessToken={merchantId_AccessToken}
              />
            ) : null}
          </div>
          <button onClick={fetchUserAddressList}>user Address List</button>
          <button
            onClick={() =>
              fetchUserPassbook(merchantId_AccessToken.accessToken)
            }
            className="border-2 border-green-500 text-white bg-green-500"
          >
            fetchUserPassbook
          </button>
          <button
            onClick={fetchGold_SilverRates}
            className="border-2 border-green-500 text-white bg-green-500"
          >
            fetchGold_SilverRates
          </button>
          <button
            onClick={BuyGold}
            className="border-2 border-green-500 text-white bg-green-500"
          >
            BuyGold
          </button>

          {/* user passbook and buy sell details */}
          <div className="flex flex-col gap-y-3">
            {/* user passbook */}
            {userPassbook == "" ? null : (
              <div className="border-2 border-slate-500 w-1/2 flex flex-col gap-y-4 p-2 rounded-lg self-center">
                <h1 className="self-center">My Vault</h1>
                <div className="flex justify-between">
                  <div className="flex flex-col items-center gap-y-1">
                    <h1>GOLD GRAMS</h1>
                    <h1>{userPassbook.goldGrms}</h1>
                  </div>
                  <div className="flex flex-col items-center gap-y-1">
                    <h1>SILVER GRAMS</h1>
                    <h1>{userPassbook.silverGrms}</h1>
                  </div>
                </div>
              </div>
            )}

            {metalDetails == "" ? null : (
              <div className="w-3/4 border-2 border-slate-500 rounded-lg p-2 flex flex-col gap-y-4 self-center items-center">
                {/* metal rates */}
                <div className="flex justify-between w-1/3">
                  <div className="flex flex-col gap-y-1 items-center">
                    <h1>Gold</h1>
                    <h1>{metalDetails.rates.gBuy}</h1>
                  </div>
                  <div className="flex flex-col gap-y-1 items-center">
                    <h1>Silver</h1>
                    <h1>{metalDetails.rates.sBuy}</h1>
                  </div>
                </div>

                {/* buy sell options */}
                <div className="flex justify-between w-1/3 ">
                  <h1 className={optionsSelected == "buy" ? "border-b-2 border-slate-500 hover:cursor-pointer": "border-b-2 border-white hover:cursor-pointer"}
                  onClick={() => setOptionSelected("buy")}
                  >Buy</h1>
                  <h1 className={optionsSelected == "sell" ? "border-b-2 border-slate-500 hover:cursor-pointer": "border-b-2 border-white hover:cursor-pointer"}
                  onClick={() => setOptionSelected("sell")}
                  >Sell</h1>
                </div>


                {/* type of metal */}
                <div className="flex w-3/4 border-2 border-slate-600 justify-between p-1 rounded-lg">
                    <h1 className={metalSelected == "gold" ? "bg-red-500 text-white p-2 w-1/2 hover:cursor-pointer text-center": "text-red bg-white hover:cursor-pointer p-2 w-1/2 text-center"}
                    onClick={() => setMetalSelected("gold")}
                    >GOLD 24K 999</h1>
                    <h1 className={metalSelected == "silver" ? "bg-red-500 text-white hover:cursor-pointer p-2 w-1/2 text-center": "text-red-500 bg-white hover:cursor-pointer p-2 w-1/2 text-center"}
                    onClick={() => setMetalSelected("silver")}
                    >SILVER 24K 999</h1>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AugmontGold;
