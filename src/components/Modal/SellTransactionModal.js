import axios from "axios";
import React, { useContext } from "react";
import supabase from "../../Config/supabaseClient";
import { MainUseContext } from "../../context/MainUseContext";
import TRansactionTimer from "../SafeGold/TRansactionTimer";

const SellTransactionModal = ({
  gramValueInBox,
  goldValueInBox,
  callAlertBox,
  afterPurchaseHandler,
  closeTRans_SellPrice,
}) => {
  const storeState = useContext(MainUseContext);
  let { userDetailsContext, safeGoldContext } = storeState;
  let { updateUserData, updateUserId, userId, userData } = userDetailsContext;
  let {
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
  } = safeGoldContext;

  const creditWalletBalance = async (money, userId) => {
    try {
      let fetchResponse = await supabase.rpc("update_wallet_balance", {
        amount: Math.ceil(Number(money)),
      });
      if (fetchResponse.error) {
        try {
          let transactionResponse = await supabase.rpc(
            "update_transaction_details",
            {
              amount: money.toString(),
              sender: "user adding fund",
              receiver: "user",
              message: "Gold Sell Transaction failed",
              id: userId,
              type: "credit",
              status: "failed",
            }
          );
          if (transactionResponse.status == 200) {
            alert("TRansaction Failed");
            return {
              name: "error",
            };
          } else {
            alert("Internal Server Problem");
            return {
              name: "error",
            };
          }
        } catch (err) {}
      }

      if (fetchResponse.status == 200) {
        try {
          let transactionResponse = await supabase.rpc(
            "update_transaction_details",
            {
              amount: money.toString(),
              sender: "user adding fund",
              receiver: "user",
              message: "Gold Sell TRansaction",
              id: userId,
              type: "credit",
              status: "success",
            }
          );
          if (transactionResponse.status == 200) {
            // alert("Successfully Added Balance");
            return {
              name: "success",
            };
          } else {
            alert("Internal Server Problem");
            return {
              name: "error",
            };
          }
        } catch (err) {}
      }
    } catch (err) {}
  };

  const getConfirmSellApi = async (safeGoldUserId, tx_id) => {
    const options = {
      url: `https://partners-staging.safegold.com/v1/users/${safeGoldUserId}/sell-gold-confirm`,
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: "Bearer 38778d59d5e17cfadc750e87703eb5e2",
        "content-type": "application/json",
      },
      data: JSON.stringify({ tx_id }),
    };
    try {
      let response = await axios(options);
      if (response.status == 200) {
        alert("Gold Sell Successfully");
        return {
          name: "success",
          message: "Gold Sell Successfully",
        };
      }
      return {
        name: "error",
      };
    } catch (err) {
      alert(err.response.data.message);
      return {
        name: "error",
        message: err.response.data,
      };
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
      if (fetchResponse.status == 200) {
        return {
          name: "success",
          data: fetchResponse.data,
        };
      }
      return {
        name: "error",
      };
    } catch (err) {
      alert(err.response.data.message);
      return {
        name: "error",
        message: err.response.data,
      };
    }
  };

  const sellTotalAmountCalculator = (entered_gram, current_price) => {
    let totalAmount = Number(entered_gram) * Number(current_price) * 100;
    return Math.ceil(totalAmount) / 100;
  };

  const confirmSellHandler = async () => {
    if (safeGoldData.unit == "Amount") {
      let response = await getConfirmSellApi(
        safeGoldData.sfUserData.id,
        safeGoldData.goldTransaction.tx_id
      );
      if (response.name == "success") {
        // callAlertBox()
        let fundResponse = await creditWalletBalance(goldValueInBox, userId);
        // afterSellHandler();
        if (fundResponse.name == "success") {
          // dispatch(updateGoldTransaction(""));
          let balanceResponse = await getSafeGoldBalance(
            safeGoldData.sfUserData.id
          );
          // dispatch(addSafeGoldData(balanceResponse.data));
          afterPurchaseHandler(balanceResponse.data);
        }
      }
    } else {
      let response = await getConfirmSellApi(
        safeGoldData.sfUserData.id,
        safeGoldData.goldTransaction.tx_id
      );
      if (response.name == "success") {
        let sell_price = sellTotalAmountCalculator(
          gramValueInBox,
          safeGoldData.goldLiveSellPrice.current_price
        );
        let fundResponse = await creditWalletBalance(sell_price, userId);
        if (fundResponse.name == "success") {
          // dispatch(updateGoldTransaction(""));
          let balanceResponse = await getSafeGoldBalance(
            safeGoldData.sfUserData.id
          );
          // dispatch(addSafeGoldData(balanceResponse.data));
          afterPurchaseHandler(balanceResponse.data);
        }
      }
    }
  };

  // const closeHandler = () => {
  //   dispatch(updateGoldTransaction(""));
  //   afterSellHandler();
  // };

  const timerExpired = () => {
    // closeHandler();
    closeTRans_SellPrice();
  };

  return (
    <div className="fixed bottom-28 md:bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
      {/* <!-- Background overlay, show/hide based on modal state. --> */}
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      {/* <!-- Modal panel, show/hide based on modal state. --> */}
      <div className="relative bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        {/* <!-- Body --> */}
        <div className="flex flex-col gap-y-2 p-4">
          <h1 className="text-xl self-center">Transaction Details</h1>
          <div className="flex w-full justify-between">
            <h1>Transaction Id</h1>
            <h1>{safeGoldData.goldTransaction.tx_id}</h1>
          </div>
          <div className="flex w-full justify-between">
            <h1>Sell Price</h1>
            <h1>{safeGoldData.goldTransaction.sell_price}</h1>
          </div>
          <div className="flex w-full justify-between">
            <h1>Gold Amount</h1>
            <h1>{safeGoldData.goldTransaction.gold_amount}</h1>
          </div>
          <button
            className="border-2 bg-slate-700 text-white"
            onClick={confirmSellHandler}
          >
            Confirm Sell
          </button>
          <div className="flex justify-between bg-orange-200 p-1">
            <h1>This Transaction is valid till</h1>
            <TRansactionTimer timerExpired={timerExpired} />
          </div>
        </div>

        {/* <!-- Footer --> */}
        <div className="bg-gray-50 px-4 py-3 sm:px-6">
          <div className="text-right">
            <button
              className="text-sm font-medium leading-5 bg-white border border-gray-300 rounded-md px-4 py-2 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition duration-150 ease-in-out"
              onClick={afterPurchaseHandler}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellTransactionModal;
