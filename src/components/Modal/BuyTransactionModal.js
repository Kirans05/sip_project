import axios from "axios";
import React, { useContext } from "react";
import supabase from "../../Config/supabaseClient";
import { MainUseContext } from "../../context/MainUseContext";
import Alert from "../Alert/Alert";
import TRansactionTimer from "../SafeGold/TRansactionTimer";

const BuyTransactionModal = ({
  afterPurchaseHandler,
  callAlertBox,
  closeTRans_BuyPrice,
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
  } = safeGoldContext;

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
        afterPurchaseHandler(fetchResponse.data);
      }
    } catch (err) {
      alert(err.response.data.message);
      return;
    }
  };

  const getConfirmBuyApi = async (safeGoldUserId, tx_id, pincode) => {
    const options = {
      url: `https://partners-staging.safegold.com/v1/users/${safeGoldUserId}/buy-gold-confirm`,
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: "Bearer 38778d59d5e17cfadc750e87703eb5e2",
        "content-type": "application/json",
      },
      data: JSON.stringify({ tx_id, pincode }),
    };
    try {
      let response = await axios(options);
      if (response.status == 200) {
        alert("Gold Purchase Successfull!");
        let response = await getSafeGoldBalance(safeGoldData.sfUserData.id);
      }
    } catch (err) {
      alert(err.response.data.message);
      return;
    }
  };

  const deductWalletBalance = async (money, walletBalance, userId) => {
    if (money > walletBalance) {
      alert("Insufficient Balance to Withdraw");
      return;
    }

    try {
      let withdrawResponse = await supabase.rpc("decrement_balance", {
        amount: Math.ceil(Number(money)),
      });

      if (withdrawResponse.error) {
        try {
          let transactionResponse = await supabase.rpc(
            "update_transaction_details",
            {
              amount: money.toString(),
              sender: "withdraw balance",
              receiver: "user",
              message: "Gold Purchase Transaction Failed",
              id: userId,
              type: "debit",
              status: "failed",
            }
          );
          if (transactionResponse.status == 200) {
            alert("Transaction Failed");
            return;
          } else {
            alert("Internal Server Problem");
            return;
          }
        } catch (err) {}
      }

      if (withdrawResponse.status == 200) {
        try {
          let transactionResponse = await supabase.rpc(
            "update_transaction_details",
            {
              amount: money.toString(),
              sender: "withdraw balance",
              receiver: "user",
              message: "Gold Purchase Transaction",
              id: userId,
              type: "debit",
              status: "success",
            }
          );
          if (transactionResponse.status == 200) {
            getConfirmBuyApi(
              safeGoldData.sfUserData.id,
              safeGoldData.goldTransaction.tx_id,
              safeGoldData.sfUserData.pincode
            );
          } else {
            alert("Internal Server Problem");
            return;
          }
        } catch (err) {}
      }
    } catch (err) {}
  };

  const confirmBuyHandler = async () => {
    let response = await deductWalletBalance(
      Number(safeGoldData.goldTransaction.buy_price),
      userData.wallet_balance,
      userData.id
    );
  };

  const timerExpired = () => {
    closeTRans_BuyPrice();
  };

  return (
    <div className="fixed bottom-16 md:bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
      {/* <!-- Background overlay, show/hide based on modal state. --> */}
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      {/* <!-- Modal panel, show/hide based on modal state. --> */}
      <div className="relative bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        {/* <!-- Body --> */}
        <div className="p-4">
          <div className="flex flex-col gap-y-3">
            <h1 className="text-xl self-center">Transaction Details</h1>
            <div className="flex w-full justify-between">
              <h1>Transaction Id</h1>
              <h1>{safeGoldData.goldTransaction.tx_id}</h1>
            </div>
            <div className="flex w-full justify-between">
              <h1>Buy Price</h1>
              <h1>{safeGoldData.goldTransaction.buy_price}</h1>
            </div>
            <div className="flex w-full justify-between">
              <h1>Gold Amount</h1>
              <h1>{safeGoldData.goldTransaction.gold_amount}</h1>
            </div>
            <div className="flex w-full justify-between">
              <h1>GST Amount</h1>
              <h1>{safeGoldData.goldTransaction.gst_amount}</h1>
            </div>
            <button
              className="border-2 bg-slate-700 text-white"
              onClick={confirmBuyHandler}
            >
              Confirm Buy
            </button>
            <div className="flex justify-between bg-orange-200 p-1">
              <h1>This Transaction is valid till</h1>
              <TRansactionTimer timerExpired={timerExpired} />
            </div>
          </div>
        </div>

        {/* <!-- Footer --> */}
        <div className="bg-gray-50 px-4 py-3 sm:px-6">
          <div className="text-right">
            <button
              className="text-sm font-medium leading-5 bg-white border border-gray-300 rounded-md px-4 py-2 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition duration-150 ease-in-out"
              // onClick={closeHandler}
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

export default BuyTransactionModal;
