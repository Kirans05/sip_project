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

  const BuyMetalHandler = async () => {
    let data = new FormData();
    const merchantTransactionId = Math.random().toString(36).substring(2);
    if (metalSelected == "gold" && purchaseType == "amount") {
      data.append("lockPrice", metalDetails.rates.gBuy);
      data.append("metalType", "gold");
      data.append("amount", inputBoxValues.amountBox);
      data.append("merchantTransactionId", merchantTransactionId);
      data.append("uniqueId", "17a8937e-ec5f-41bc-a1e2-f18e9dd7a664");
      data.append("blockId", metalDetails.blockId);
    } else if (metalSelected == "gold" && purchaseType == "grams") {
      data.append("lockPrice", metalDetails.rates.gBuy);
      data.append("metalType", "gold");
      data.append("quantity", inputBoxValues.gramsBox);
      data.append("merchantTransactionId", merchantTransactionId);
      data.append("uniqueId", "17a8937e-ec5f-41bc-a1e2-f18e9dd7a664");
      data.append("blockId", metalDetails.blockId);
    } else if (metalSelected == "silver" && purchaseType == "amount") {
      data.append("lockPrice", metalDetails.rates.sBuy);
      data.append("metalType", "silver");
      data.append("amount", inputBoxValues.amountBox);
      data.append("merchantTransactionId", merchantTransactionId);
      data.append("uniqueId", "17a8937e-ec5f-41bc-a1e2-f18e9dd7a664");
      data.append("blockId", metalDetails.blockId);
    } else if (metalSelected == "silver" && purchaseType == "grams") {
      data.append("lockPrice", metalDetails.rates.sBuy);
      data.append("metalType", "silver");
      data.append("quantity", inputBoxValues.gramsBox);
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

  const sellMetalHandler = async () => {
    var data = new FormData();
    const merchantTransactionId = Math.random().toString(36).substring(2);

    if (metalSelected == "gold" && sellType == "amount") {
      data.append("uniqueId", "17a8937e-ec5f-41bc-a1e2-f18e9dd7a664");
      data.append("lockPrice", metalDetails.rates.gSell);
      data.append("blockId", metalDetails.blockId);
      data.append("metalType", "gold");
      data.append("amount", sellInputBoxValues.amountBox);
      data.append("merchantTransactionId", merchantTransactionId);
      data.append("userBank[accountName]", userBank.accountName);
      data.append("userBank[accountNumber]", userBank.accountNumber);
      data.append("userBank[ifscCode]", userBank.ifscCode);
    } else if (metalSelected == "gold" && sellType == "grams") {
      data.append("uniqueId", "17a8937e-ec5f-41bc-a1e2-f18e9dd7a664");
      data.append("lockPrice", metalDetails.rates.gSell);
      data.append("blockId", metalDetails.blockId);
      data.append("metalType", "gold");
      data.append("quantity", sellInputBoxValues.gramsBox);
      data.append("merchantTransactionId", merchantTransactionId);
      data.append("userBank[accountName]", userBank.accountName);
      data.append("userBank[accountNumber]", userBank.accountNumber);
      data.append("userBank[ifscCode]", userBank.ifscCode);
    } else if (metalSelected == "silver" && sellType == "amount") {
      data.append("uniqueId", "17a8937e-ec5f-41bc-a1e2-f18e9dd7a664");
      data.append("lockPrice", metalDetails.rates.sSell);
      data.append("blockId", metalDetails.blockId);
      data.append("metalType", "silver");
      data.append("amount", sellInputBoxValues.amountBox);
      data.append("merchantTransactionId", merchantTransactionId);
      data.append("userBank[accountName]", userBank.accountName);
      data.append("userBank[accountNumber]", userBank.accountNumber);
      data.append("userBank[ifscCode]", userBank.ifscCode);
    } else if (metalSelected == "silver" && sellType == "grams") {
      data.append("uniqueId", "17a8937e-ec5f-41bc-a1e2-f18e9dd7a664");
      data.append("lockPrice", metalDetails.rates.sSell);
      data.append("blockId", metalDetails.blockId);
      data.append("metalType", "silver");
      data.append("quantity", sellInputBoxValues.gramsBox);
      data.append("merchantTransactionId", merchantTransactionId);
      data.append("userBank[accountName]", userBank.accountName);
      data.append("userBank[accountNumber]", userBank.accountNumber);
      data.append("userBank[ifscCode]", userBank.ifscCode);
    }

    let options = {
      url: "https://uat-api.augmontgold.com/api/merchant/v1/sell",
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
      if (fetchResponse.status == 200) {
        if (fetchResponse.data.statusCode == 200) {
          // setPassbookRerender(!passbookRerender)
          setUserPassbook({
            ...userPassbook,
            silverGrms: fetchResponse.data.result.data.silverBalance,
            goldGrms: fetchResponse.data.result.data.goldBalance,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
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
                  setButtonClicked({
                    ...buttonClicked,
                    giftMetal: !buttonClicked.giftMetal,
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
                // onClick={() =>
                //   setButtonClicked({
                //     ...buttonClicked,
                //     products: !buttonClicked.products,
                //   })
                // }
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
            {userPassbook == "" ? null : (
              <Passbook userPassbook={userPassbook} />
            )}

            {/* products list */}
            {/* {buttonClicked.products == false ? null : (
              <Products accessToken={merchantId_AccessToken.accessToken} />
            )} */}

            {
              variousOptions.page == "" ? <h1>No Page</h1>
              : variousOptions.page == "products page" ? <Products />
              : <h1>other pages</h1>
            }

            {/* {metalDetails == "" ? null : optionsSelected == "buy" ? (
              <BuyGold_silverBox
                metalDetails={metalDetails}
                setOptionSelected={setOptionSelected}
                metalChangeHandler={metalChangeHandler}
                setPurchaseType={setPurchaseType}
                inputBoxChangeHandler={inputBoxChangeHandler}
                differentAmountButtonHandler={differentAmountButtonHandler}
                BuyMetalHandler={BuyMetalHandler}
                optionsSelected={optionsSelected}
              />
            ) : (
              <div className="w-3/4 border-2 border-slate-500 rounded-lg p-2 flex flex-col gap-y-6 self-center items-center"> */}
            {/* metal rates */}
            {/* <div className="flex justify-between w-1/3">
                  <div className="flex flex-col gap-y-0 items-center font-bold text-lg">
                    <h1>Gold</h1>
                    <h1>{metalDetails.rates.gSell} /gm</h1>
                  </div>
                  <div className="flex flex-col gap-y-0 items-center font-bold text-lg">
                    <h1>Silver</h1>
                    <h1>{metalDetails.rates.sSell} /gm</h1>
                  </div>
                </div> */}

            {/* buy sell options */}
            {/* <div className="flex justify-between w-1/3 ">
                  <h1
                    className={
                      optionsSelected == "buy"
                        ? "border-b-2 border-red-500 hover:cursor-pointer font-semibold text-lg text-red-500"
                        : "border-b-2 border-white hover:cursor-pointer font-semibold text-lg text-red-500"
                    }
                    onClick={() => setOptionSelected("buy")}
                  >
                    Buy
                  </h1>
                  <h1
                    className={
                      optionsSelected == "sell"
                        ? "border-b-2 border-red-500 hover:cursor-pointer font-semibold text-lg text-red-500"
                        : "border-b-2 border-white hover:cursor-pointer font-semibold text-lg text-red-500"
                    }
                    onClick={() => setOptionSelected("sell")}
                  >
                    Sell
                  </h1>
                </div> */}

            {/* type of metal */}
            {/* <div className="flex w-3/4 border-2 border-slate-600 justify-between p-1 rounded-lg">
                  <h1
                    className={
                      metalSelected == "gold"
                        ? "bg-red-500 text-white p-2 w-1/2 hover:cursor-pointer text-center"
                        : "text-red bg-white hover:cursor-pointer p-2 w-1/2 text-center"
                    }
                    onClick={() => metalChangeHandler("gold")}
                  >
                    GOLD 24K 999
                  </h1>
                  <h1
                    className={
                      metalSelected == "silver"
                        ? "bg-red-500 text-white hover:cursor-pointer p-2 w-1/2 text-center"
                        : "text-red-500 bg-white hover:cursor-pointer p-2 w-1/2 text-center"
                    }
                    onClick={() => metalChangeHandler("silver")}
                  >
                    SILVER 24K 999
                  </h1>
                </div> */}

            {/* input box fo grams and amount */}
            {/* <div className="flex w-3/4 justify-between p-1">
                  <input
                    type={"number"}
                    placeholder={"Grams"}
                    className="w-1/3 border-2 border-slate-500 pl-3"
                    value={sellInputBoxValues.gramsBox}
                    onChange={(e) => sellInputBoxChangeHandler(e, "grams")}
                    onClick={() => setSellType("grams")}
                  />
                  <h1>{"-><-"}</h1>
                  <input
                    type={"number"}
                    placeholder={"Amount"}
                    className="w-1/3 border-2 border-slate-500 pl-3"
                    value={sellInputBoxValues.amountBox}
                    onChange={(e) => sellInputBoxChangeHandler(e, "amount")}
                    onClick={() => setSellType("amount")}
                  />
                </div> */}

            {/* bank details section */}
            {/* <div className="w-1/2 p-2 flex flex-col gap-y-3">
                  <h1 className="text-center">
                    Enter Bank Details For Money Transfer
                  </h1>
                  <div className="flex flex-col gap-y-2">
                    <h1>Enter Account Name</h1>
                    <input
                      type={"text"}
                      placeholder={"Enter Account Name"}
                      className="border-2 pl-2 py-1 border-slate-400"
                      value={userBank.accountName}
                      onChange={(e) =>
                        setUserBank({
                          ...userBank,
                          accountName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <h1>Enter Account Number</h1>
                    <input
                      type={"number"}
                      placeholder={"Enter Account Number"}
                      className="border-2 pl-2 py-1 border-slate-400"
                      value={userBank.accountNumber}
                      onChange={(e) =>
                        setUserBank({
                          ...userBank,
                          accountNumber: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <h1>Enter IFSC Code</h1>
                    <input
                      type={"text"}
                      placeholder={"Enter IFSC Code"}
                      className="border-2 pl-2 py-1 border-slate-400"
                      value={userBank.ifscCode}
                      onChange={(e) =>
                        setUserBank({ ...userBank, ifscCode: e.target.value })
                      }
                    />
                  </div>
                </div> */}

            {/* quick Sell button */}
            {/* <button
                  className="bg-red-500 text-white px-3 py-1 w-1/3 rounded-lg"
                  onClick={sellMetalHandler}
                >
                  Quick Sell
                </button> */}
            {/* </div>
            )} */}

            {/* gift gold */}
            {/* <div className="w-3/4 border-2 border-slate-500 rounded-lg p-2 flex flex-col gap-y-6 self-center items-center">
              <h1>Gift Gold</h1>
              <input
                type={"text"}
                placeholder={"Enter Mobile Number"}
                className="w-1/3 border-2 border-slate-500 pl-3"
                value={giftInputBoxValues.recipientNumber}
                onChange={(e) =>
                  setGiftInputBoxValues({
                    ...giftInputBoxValues,
                    recipientNumber: e.target.value,
                  })
                }
              />
              <div className="flex w-3/4 border-2 border-slate-600 justify-between p-1 rounded-lg">
                <h1
                  className={
                    metalSelected == "gold"
                      ? "bg-red-500 text-white p-2 w-1/2 hover:cursor-pointer text-center"
                      : "text-red bg-white hover:cursor-pointer p-2 w-1/2 text-center"
                  }
                  onClick={() => metalChangeHandler("gold")}
                >
                  GOLD 24K 999
                </h1>
                <h1
                  className={
                    metalSelected == "silver"
                      ? "bg-red-500 text-white hover:cursor-pointer p-2 w-1/2 text-center"
                      : "text-red-500 bg-white hover:cursor-pointer p-2 w-1/2 text-center"
                  }
                  onClick={() => metalChangeHandler("silver")}
                >
                  SILVER 24K 999
                </h1>
              </div>
              <div className="flex w-3/4 justify-between p-1">
                <input
                  type={"number"}
                  placeholder={"Grams"}
                  className="w-1/3 border-2 border-slate-500 pl-3"
                  value={giftInputBoxValues.gramsBox}
                  onChange={(e) =>
                    setGiftInputBoxValues({
                      ...giftInputBoxValues,
                      gramsBox: Number(e.target.value),
                    })
                  }
                  onClick={() => setSellType("grams")}
                />
              </div>
              <button
                className="bg-red-500 text-white px-3 py-1 w-1/3 rounded-lg"
                onClick={giftHandler}
              >
                Send Gift
              </button>
            </div> */}
          </div>
          <h1>Augmont</h1>
        </div>
      </div>
    </div>
  );
};

export default AugmontGold;
