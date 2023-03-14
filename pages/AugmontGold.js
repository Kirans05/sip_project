import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../src/components/Sidebar/Sidebar";
import Header from "../src/components/Header/Header";
import axios from "axios";
import AugmontSignInModal from "../src/components/Modal/AugmontSignInModal";
import AugmontProfileModal from "../src/components/Modal/AugmontProfileModal";
import Products from "../src/components/AugmontGold/Products";
import Passbook from "../src/components/AugmontGold/Passbook";
import BuyGold_silverBox from "../src/components/AugmontGold/BuyGold_silverBox";
import { MainUseContext } from "../src/context/MainUseContext";
import SellGold_SilverBox from "../src/components/AugmontGold/SellGold_SilverBox";
import GiftBox from "../src/components/AugmontGold/GiftBox";
import SingleProductDesc from "../src/components/AugmontGold/SingleProductDesc";

const AugmontGold = () => {
  const storeState = useContext(MainUseContext);
  let { augmontGoldContext } = storeState;
  console.log(augmontGoldContext);
  let {
    merchantId_AccessToken,
    setMerchantId_AccessToken,
    buttonClicked,
    giftInputBoxValues,
    inputBoxValues,
    metalDetails,
    passbookRerender,
    sellInputBoxValues,
    setButtonClicked,
    setGiftInputBoxValues,
    setInputBoxValues,
    setMetalDetails,
    setPassbookRerender,
    setSellInputBoxValues,
    setUserBank,
    setUserPassbook,
    setVariousOptions,
    userBank,
    userPassbook,
    variousOptions,
  } = augmontGoldContext.augmontGoldData;

  let {
    buyGoldThroughAmount,
    buyGoldThroughGrams,
    buySilverThroughAmount,
    buySilverThroughGrams,
    closeSignInModal,
    differentAmountButtonHandler,
    giftInputBoxChangeHandler,
    inputBoxChangeHandler,
    metalChangeHandler,
    profileBtnClicked,
    sellGoldThroughAmount,
    sellGoldThroughGrams,
    sellInputBoxChangeHandler,
    sellSilverThroughAmount,
    sellSilverThroughGrams,
  } = augmontGoldContext;

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
    } catch (err) {
      console.log(err);
    }
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

  const giftHandler = async () => {
    const merchantTransactionId = Math.random().toString(36).substring(2);

    var data = new FormData();
    data.append("merchantTransactionId", merchantTransactionId);
    data.append("sender[uniqueId]", "17a8937e-ec5f-41bc-a1e2-f18e9dd7a664");
    data.append("receiver[uniqueId]", giftInputBoxValues.recipientNumber);
    data.append("metalType", "gold");
    data.append("quantity", giftInputBoxValues.gramsBox);

    let options = {
      url: "https://uat-api.augmontgold.com/api/merchant/v1/transfer",
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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    generateAccessToken();
  }, []);

  // useEffect(() => {
  //   if (merchantId_AccessToken.accessToken != "") {
  //     alert("hi")
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
        <div className="p-2 pt-6 md:p-6 flex flex-col gap-y-10 w-full">
          <div className="w-full">
            <div className="flex justify-end gap-x-3">
              <h1 className="text-xl font-semibold">Digi Gold</h1>
              <h1 className="text-xl font-semibold">Delivery</h1>
              <h1 className="text-xl font-semibold">SIP</h1>
              <h1
                className="text-xl font-semibold hover:cursor-pointer"
                onClick={() =>
                  setVariousOptions({
                    ...variousOptions,
                    page: "buy page",
                    optionsSelected: "buy",
                  })
                }
              >
                Buy
              </h1>
              {/* sell */}
              <h1
                className="text-xl font-semibold hover:cursor-pointer"
                onClick={() =>
                  setVariousOptions({
                    ...variousOptions,
                    page: "sell page",
                    optionsSelected: "sell",
                  })
                }
              >
                Sell
              </h1>
              {/* gift */}
              <h1
                className="text-xl font-semibold hover:cursor-pointer"
                onClick={() =>
                  setVariousOptions({
                    ...variousOptions,
                    page: "gift page",
                  })
                }
              >
                Gift
              </h1>
              <h1
                className="text-xl font-semibold hover:cursor-pointer"
                onClick={() =>
                  setVariousOptions({
                    ...variousOptions,
                    page: "products page",
                  })
                }
              >
                Products
              </h1>
              <h1
                className="text-xl font-semibold hover:cursor-pointer"
                onClick={() =>
                  setButtonClicked({
                    ...buttonClicked,
                    signIn: !buttonClicked.signIn,
                  })
                }
              >
                Sign In
              </h1>
              <h1
                className="text-xl font-semibold hover:cursor-pointer"
                onClick={() =>
                  setButtonClicked({
                    ...buttonClicked,
                    userAccount: !buttonClicked.userAccount,
                  })
                }
              >
                User
              </h1>
              {buttonClicked.userAccount == false ? null : (
                <div className="absolute z-10 -mr-2 mt-8 transform border-2 border-slate-400 w-fit px-2 py-2 bg-black text-white">
                  <div className="rounded-lg">
                    <div className="rounded-lg overflow-hidden">
                      <div className="z-20 relative flex flex-col gap-y-2">
                        <h1
                          className="hover:cursor-pointer"
                          onClick={profileBtnClicked}
                        >
                          My Profile
                        </h1>
                        <h1 className="hover:cursor-pointer">KYC</h1>
                        <h1 className="hover:cursor-pointer">My Orders</h1>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {buttonClicked.signIn ? (
              <AugmontSignInModal
                closeSignInModal={closeSignInModal}
                merchantId_AccessToken={merchantId_AccessToken}
              />
            ) : null}
            {buttonClicked.userProfile ? <AugmontProfileModal /> : null}
          </div>

          {/* user passbook and buy sell details */}
          <div className="flex flex-col gap-y-10">
            {/* user passbook */}
            {userPassbook == "" ? null : <Passbook />}

            {variousOptions.page == "" ? null : variousOptions.page ==
              "products page" ? (
              <Products />
            ) : variousOptions.page == "buy page" ? (
              <BuyGold_silverBox />
            ) : variousOptions.page == "sell page" ? (
              <SellGold_SilverBox />
            ) : variousOptions.page == "gift page" ? (
              <GiftBox />
            ) : variousOptions.page == "single product details" ? (
              <SingleProductDesc />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AugmontGold;

// let {
//   merchantId_AccessToken,
//   setMerchantId_AccessToken,
//   buttonClicked,
//   giftInputBoxValues,
//   inputBoxValues,
//   metalDetails,
//   passbookRerender,
//   sellInputBoxValues,
//   setButtonClicked,
//   setGiftInputBoxValues,
//   setInputBoxValues,
//   setMetalDetails,
//   setPassbookRerender,
//   setSellInputBoxValues,
//   setUserBank,
//   setUserPassbook,
//   setVariousOptions,
//   userBank,
//   userPassbook,
//   variousOptions,
// } = augmontGoldContext.augmontGoldData;

// let {
//   buyGoldThroughAmount,
//   buyGoldThroughGrams,
//   buySilverThroughAmount,
//   buySilverThroughGrams,
//   closeSignInModal,
//   differentAmountButtonHandler,
//   giftInputBoxChangeHandler,
//   inputBoxChangeHandler,
//   metalChangeHandler,
//   profileBtnClicked,
//   sellGoldThroughAmount,
//   sellGoldThroughGrams,
//   sellInputBoxChangeHandler,
//   sellSilverThroughAmount,
//   sellSilverThroughGrams,
// } = augmontGoldContext;
