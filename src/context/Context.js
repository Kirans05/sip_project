import React, { createContext, useState } from "react";
import { MainUseContext } from "../context/MainUseContext";

// export const MainUseContext = createContext();

const Context = ({ props }) => {
  var { Component, ...rest } = props;
  var { pageProps } = props;

  //  userDetails state and funtions
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState("");

  const updateUserId = (id) => {
    setUserId(id);
  };

  const updateUserData = (data) => {
    setUserData(data);
  };

  // dashboard page related data and functions
  const [dashboardData, setDashboardData] = useState({
    images: [],
  });

  const updateDashboardImage = (data) => {
    setDashboardData({ ...dashboardData, images: data });
  };

  // tranaction page related data and functions
  const [transactionData, setTRansactionData] = useState({
    transactionArray: [],
  });

  const updateTransactionArray = (data) => {
    setTRansactionData({ ...transactionData, transactionArray: data });
  };

  // list of assests page related data and functions
  const [listOfAssestsData, setListOfAssestsData] = useState({
    listOfAssestsArray: [],
    listOfBasketsArray: [],
  });

  const updateListOfAssestsArray = (data) => {
    setListOfAssestsData({ ...listOfAssestsData, listOfAssestsArray: data });
  };

  const updateListOfBasketsArray = (data) => {
    setListOfAssestsData({ ...listOfAssestsData, listOfBasketsArray: data });
  };

  // individual assest data and functions
  const [individualAssestData, setIndividualAssestData] = useState({
    individualAssest: "",
  });

  const updateindividualAssestData = (data) => {
    setIndividualAssestData({
      ...individualAssestData,
      individualAssest: data,
    });
  };

  // safe gold data and functions
  const [safeGoldData, setSafeGoldData] = useState({
    sfUserData: "",
    transactType: "",
    unit: "Amount",
    goldLiveBuyPrice: "",
    goldTransaction: "",
    goldLiveSellPrice: "",
    totalTransactions: [],
  });

  const updateSfUserData = (data) => {
    setSafeGoldData({ ...safeGoldData, sfUserData: data });
  };

  const updateTransactType = (data) => {
    setSafeGoldData({
      ...safeGoldData,
      transactType: data,
      goldLiveBuyPrice: "",
      goldLiveSellPrice: "",
    });
  };

  const updateSafeGoldUnit = (data) => {
    setSafeGoldData({ ...safeGoldData, unit: data });
  };

  const updateGoldLiveBuyPrice = (data) => {
    setSafeGoldData({ ...safeGoldData, goldLiveBuyPrice: data });
  };

  const updateGoldTransaction = (data) => {
    setSafeGoldData({ ...safeGoldData, goldTransaction: data });
  };

  const updateAfterPurchase = (data) => {
    setSafeGoldData({
      ...safeGoldData,
      goldTransaction: "",
      goldLiveBuyPrice: "",
      goldLiveSellPrice: "",
      sfUserData: data,
    });
  };

  const closeTransaction_buyPrice = () => {
    setSafeGoldData({
      ...safeGoldData,
      goldTransaction: "",
      goldLiveBuyPrice: "",
    });
  };

  const updateGoldLiveSellPrice = (data) => {
    setSafeGoldData({ ...safeGoldData, goldLiveSellPrice: data });
  };

  const closeTransaction_sellPrice = () => {
    setSafeGoldData({
      ...safeGoldData,
      goldTransaction: "",
      goldLiveSellPrice: "",
    });
  };

  const updateTotalTransactions = (data) => {
    setSafeGoldData({ ...safeGoldData, totalTransactions: data });
  };



  // augmont gold states
  const [merchantId_AccessToken, setMerchantId_AccessToken] = useState({
    merchantId: "",
    accessToken: "",
  });

  const [buttonClicked, setButtonClicked] = useState({
    signIn: false,
    userAccount: false,
    userProfile: false,
    userKyc: false,
    userOrders: false,
    giftMetal: false,
    products: false,
  });

  const [metalDetails, setMetalDetails] = useState("");
  const [userPassbook, setUserPassbook] = useState("");
  const [passbookRerender, setPassbookRerender] = useState(true);
  const [variousOptions, setVariousOptions] = useState({
    optionsSelected: "buy",
    metalSelected: "gold",
    purchaseType: "amount",
    sellType: "amount",
    page:"",
    deliverProductId:""
  });
  const [deliverProdDetails, setDeliverProdDetails] = useState("")
  const [inputBoxValues, setInputBoxValues] = useState({
    gramsBox: "",
    amountBox: "",
  });
  const [sellInputBoxValues, setSellInputBoxValues] = useState({
    gramsBox: "",
    amountBox: "",
  });
  const [giftInputBoxValues, setGiftInputBoxValues] = useState({
    gramsBox: "",
    amountBox: "",
    recipientNumber: "",
  });
  const [userBank, setUserBank] = useState({
    accountName: "",
    accountNumber: "",
    ifscCode: "",
  });

  const profileBtnClicked = () => {
    setButtonClicked({
      ...buttonClicked,
      userProfile: !buttonClicked.userProfile,
      userAccount: false,
    });
  };

  const buyGoldThroughAmount = (amount) => {
    let currentRate = Number(metalDetails.rates.gBuy);
    let rateWithTax = (currentRate * 3) / 100 + currentRate;
    let gramsQty = Number(amount) / rateWithTax;
    gramsQty = gramsQty.toString().substring(0, 6);
    return Number(gramsQty);
  };

  const buyGoldThroughGrams = (grams) => {
    let currentRate = Number(metalDetails.rates.gBuy);
    let rateWithTax = (currentRate * 3) / 100 + currentRate;
    let amount = Number(grams) * rateWithTax;
    amount = amount * 100;
    amount = Math.ceil(amount) / 100;
    return Number(amount);
  };

  const buySilverThroughAmount = (amount) => {
    let currentRate = Number(metalDetails.rates.sBuy);
    let rateWithTax = (currentRate * 3) / 100 + currentRate;
    let gramsQty = Number(amount) / rateWithTax;
    gramsQty = gramsQty * 10000;
    gramsQty = gramsQty.toString().split(".")[0];
    return Number(gramsQty) / 10000;
  };

  const buySilverThroughGrams = (grams) => {
    let currentRate = Number(metalDetails.rates.sBuy);
    let rateWithTax = (currentRate * 3) / 100 + currentRate;
    let amount = Number(grams) * rateWithTax;
    amount = amount * 100;
    amount = Math.ceil(amount) / 100;
    return Number(amount);
  };

  const inputBoxChangeHandler = (e, type) => {
    if (variousOptions.metalSelected == "gold") {
      if (type == "amount") {
        setInputBoxValues({
          ...inputBoxValues,
          gramsBox: buyGoldThroughAmount(e.target.value),
          amountBox: Number(e.target.value),
        });
      } else if (type == "grams") {
        setInputBoxValues({
          ...inputBoxValues,
          amountBox: buyGoldThroughGrams(e.target.value),
          gramsBox: Number(e.target.value),
        });
      }
    } else if (variousOptions.metalSelected == "silver") {
      if (type == "amount") {
        setInputBoxValues({
          ...inputBoxValues,
          gramsBox: buySilverThroughAmount(e.target.value),
          amountBox: Number(e.target.value),
        });
      } else if (type == "grams") {
        setInputBoxValues({
          ...inputBoxValues,
          amountBox: buySilverThroughGrams(e.target.value),
          gramsBox: Number(e.target.value),
        });
      }
    }
  };

  const sellGoldThroughAmount = (enteredAmount) => {
    let amount = Number(enteredAmount);
    let currentRate = Number(metalDetails.rates.gSell);
    let gramsQty = amount / currentRate;
    gramsQty = gramsQty * 10000;
    gramsQty = gramsQty.toString().split(".")[0];
    return Number(gramsQty) / 10000;
  };

  const sellGoldThroughGrams = (grams) => {
    let currentRate = Number(metalDetails.rates.gSell);
    let amount = currentRate * Number(grams);
    amount = amount * 100;
    amount = Math.floor(amount) / 100;
    return Number(amount);
  };

  const sellSilverThroughAmount = (enteredAmount) => {
    let amount = Number(enteredAmount);
    let currentRate = Number(metalDetails.rates.sSell);
    let gramsQty = amount / currentRate;
    gramsQty = gramsQty * 10000;
    gramsQty = gramsQty.toString().split(".")[0];
    return Number(gramsQty) / 10000;
  };

  const sellSilverThroughGrams = (grams) => {
    let currentRate = Number(metalDetails.rates.sSell);
    let amount = currentRate * Number(grams);
    amount = amount * 100;
    amount = Math.floor(amount) / 100;
    return Number(amount);
  };

  const sellInputBoxChangeHandler = (e, type) => {
    if (variousOptions.metalSelected == "gold") {
      if (type == "amount") {
        setSellInputBoxValues({
          ...sellInputBoxValues,
          gramsBox: sellGoldThroughAmount(e.target.value),
          amountBox: Number(e.target.value),
        });
      } else if (type == "grams") {
        setSellInputBoxValues({
          ...sellInputBoxValues,
          gramsBox: Number(e.target.value),
          amountBox: sellGoldThroughGrams(e.target.value),
        });
      }
    } else if (variousOptions.metalSelected == "silver") {
      if (type == "amount") {
        setSellInputBoxValues({
          ...sellInputBoxValues,
          gramsBox: sellSilverThroughAmount(e.target.value),
          amountBox: Number(e.target.value),
        });
      } else if (type == "grams") {
        setSellInputBoxValues({
          ...sellInputBoxValues,
          gramsBox: Number(e.target.value),
          amountBox: sellSilverThroughGrams(e.target.value),
        });
      }
    }
  };

  const giftInputBoxChangeHandler = (e, type) => {
    if (variousOptions.metalSelected == "gold") {
      if (type == "amount") {
        giftInputBoxValues({
          ...giftInputBoxValues,
          gramsBox: sellGoldThroughAmount(e.target.value),
          amountBox: Number(e.target.value),
        });
      } else if (type == "grams") {
        giftInputBoxValues({
          ...giftInputBoxValues,
          gramsBox: Number(e.target.value),
          amountBox: sellGoldThroughGrams(e.target.value),
        });
      }
    } else if (variousOptions.metalSelected == "silver") {
      if (type == "amount") {
        giftInputBoxValues({
          ...giftInputBoxValues,
          gramsBox: sellSilverThroughAmount(e.target.value),
          amountBox: Number(e.target.value),
        });
      } else if (type == "grams") {
        giftInputBoxValues({
          ...giftInputBoxValues,
          gramsBox: Number(e.target.value),
          amountBox: sellSilverThroughGrams(e.target.value),
        });
      }
    }
  };

  const differentAmountButtonHandler = (amount) => {
    setInputBoxValues({
      ...inputBoxValues,
      gramsBox: buyGoldThroughAmount(amount),
      amountBox: Number(amount),
    });
  };

  const metalChangeHandler = (type) => {
    setVariousOptions({...variousOptions, metalSelected: type})
    // setMetalSelected(type);
    setInputBoxValues({
      gramsBox: "",
      amountBox: "",
    });
    setSellInputBoxValues({
      gramsBox: "",
      amountBox: "",
    });
  };

  const closeSignInModal = () => {
    setButtonClicked({ ...buttonClicked, signIn: !buttonClicked.signIn });
  };

  return (
    <MainUseContext.Provider
      value={{
        userDetailsContext: {
          userId,
          userData,
          updateUserId,
          updateUserData,
        },
        dashboardContext: {
          dashboardData,
          updateDashboardImage,
        },
        transactionContext: {
          transactionData,
          updateTransactionArray,
        },
        listOfAssestsContext: {
          listOfAssestsData,
          updateListOfAssestsArray,
          updateListOfBasketsArray,
        },
        individualAssestsContext: {
          individualAssestData,
          updateindividualAssestData,
        },
        safeGoldContext: {
          safeGoldData,
          updateSfUserData,
          updateTransactType,
          updateSafeGoldUnit,
          updateGoldLiveBuyPrice,
          updateGoldTransaction,
          updateAfterPurchase,
          closeTransaction_buyPrice,
          updateGoldLiveSellPrice,
          closeTransaction_sellPrice,
          updateTotalTransactions,
        },
        augmontGoldContext:{
          augmontGoldData:{
            merchantId_AccessToken,
            setMerchantId_AccessToken,
            buttonClicked,
            setButtonClicked,
            metalDetails,
            setMetalDetails,
            userPassbook, 
            setUserPassbook,
            passbookRerender,
            setPassbookRerender,
            variousOptions,
            setVariousOptions,
            inputBoxValues,
            setInputBoxValues,
            sellInputBoxValues,
            setSellInputBoxValues,
            giftInputBoxValues,
            setGiftInputBoxValues,
            userBank, 
            setUserBank,
            setDeliverProdDetails,
            deliverProdDetails
          },
          profileBtnClicked,
          buyGoldThroughAmount,
          buyGoldThroughGrams,
          buySilverThroughAmount,
          buySilverThroughGrams,
          inputBoxChangeHandler,
          sellGoldThroughAmount,
          sellGoldThroughGrams,
          sellSilverThroughAmount,
          sellSilverThroughGrams,
          sellInputBoxChangeHandler,
          giftInputBoxChangeHandler,
          differentAmountButtonHandler,
          metalChangeHandler,
          closeSignInModal
        }
      }}
    >
      <Component {...pageProps} />
    </MainUseContext.Provider>
  );
};

export default Context;
