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

  const fetchUserPassbook = async () => {
    let options = {
      url: `https://uat-api.augmontgold.com/api/merchant/v1/users/17a8937e-ec5f-41bc-a1e2-f18e9dd7a664/passbook`,
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${merchantId_AccessToken.accessToken}`,
      },
    };
    try {
      let fetchResponse = await axios(options);
      console.log(fetchResponse);
    } catch (err) {}
  };

  const fetchGold_SilverRates = async () => {
    let options = {
      url: "https://uat-api.augmontgold.com/api/merchant/v1/rates",
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${merchantId_AccessToken.accessToken}`,
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
      data.append(
        "merchantTransactionId",
        merchantTransactionId
      );
      data.append("uniqueId", "17a8937e-ec5f-41bc-a1e2-f18e9dd7a664");
      data.append("blockId", metalDetails.blockId);
    }

    let options = {
      url:"https://uat-api.augmontgold.com/api/merchant/v1/buy",
      method:"POST",
      headers:{
        "content-type":"application/json",
        "Authorization":`Bearer ${merchantId_AccessToken.accessToken}`
      },
      data:data
    }
    try{
      let fetchResponse = await axios(options)
      console.log(fetchResponse)
    }catch(err){

    }
  };

  useEffect(() => {
    generateAccessToken();
  }, []);

  return (
    <div className="w-full flex flex-row">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="p-2 pt-6 md:p-6 flex flex-col items-center ">
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
            onClick={fetchUserPassbook}
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
        </div>
      </div>
    </div>
  );
};

export default AugmontGold;
