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
  });

  const updateListOfAssestsArray = (data) => {
    setListOfAssestsData({ ...listOfAssestsData, listOfAssestsArray: data });
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
    goldLiveSellPrice:"",
    totalTransactions:[]
  });

  const updateSfUserData = (data) => {
    setSafeGoldData({ ...safeGoldData, sfUserData: data });
  };

  const updateTransactType = (data) => {
    setSafeGoldData({ ...safeGoldData, transactType: data, goldLiveBuyPrice:"", goldLiveSellPrice:"" });
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
    setSafeGoldData({...safeGoldData, goldTransaction:"", goldLiveBuyPrice:""})
  }


  const updateGoldLiveSellPrice = (data) => {
    setSafeGoldData({ ...safeGoldData, goldLiveSellPrice: data });
  };

  const closeTransaction_sellPrice = () => {
    setSafeGoldData({...safeGoldData, goldTransaction:"", goldLiveSellPrice:""})
  }


  const updateTotalTransactions = (data) => {
    setSafeGoldData({...safeGoldData, totalTransactions:data})
  }

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
          updateTotalTransactions
        },
      }}
    >
      <Component {...pageProps} />
    </MainUseContext.Provider>
  );
};

export default Context;
