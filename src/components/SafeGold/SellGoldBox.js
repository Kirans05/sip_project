import React, { useContext, useState } from "react";
import FecthPriceTimer from "./FecthPriceTimer";
import { FaRupeeSign } from "react-icons/fa";
import SellTransactionModal from "../Modal/SellTransactionModal";
import Alert from "../Alert/Alert";
import { MainUseContext } from "../../context/MainUseContext";
import axios from "axios";

const SellGoldBox = () => {
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


  const [goldValueInBox, setGoldValueInBox] = useState(0);
  const [gramValueInBox, setGramValueInBox] = useState(0);
  const [priceFetched, setPriceFetched] = useState(false);
  const [callAlert, setCallAlert] = useState(false);

  const goldBoxChangeHandler = (e) => {
    setGoldValueInBox(Number(e.target.value));
  };

  const gramBoxChangeHandler = (e) => {
    setGramValueInBox(Number(e.target.value));
  };


  const sellTotalGramCalculator = (entered_Amount, current_price) => {
    let totalGrams = (Number(entered_Amount) / Number(current_price)) * 10000;
    return Math.floor(totalGrams) / 10000;
  };


  const sellTotalAmountCalculator = (entered_gram, current_price) => {
    let totalAmount = Number(entered_gram) * Number(current_price) * 100;
    return Math.ceil(totalAmount) / 100;
  };



  const checkSellPrice = async () => {
    const options = {
      url: `https://partners-staging.safegold.com/v1/sell-price`,
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer 38778d59d5e17cfadc750e87703eb5e2",
      },
    };
    try {
      let fetchResponse = await axios(options);
      if (fetchResponse.status == 200) {
        setPriceFetched(true)
        updateGoldLiveSellPrice(fetchResponse.data)
      }
    } catch (err) {
      alert(err.response.data.message);
      return 
    }
  };



  const getSellVerifyApi = async (
    safeGoldUserId,
    rate_id,
    gold_amount,
    sell_price,
    unit
  ) => {
    const options = {
      url: `https://partners-staging.safegold.com/v4/users/${safeGoldUserId}/sell-gold-verify`,
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: "Bearer 38778d59d5e17cfadc750e87703eb5e2",
        "content-type": "application/json",
      },
      data: JSON.stringify({
        rate_id,
        gold_amount,
        sell_price,
      }),
    };
    try {
      let fetchResponse = await axios(options);
      if (fetchResponse.status == 200) {
        updateGoldTransaction(fetchResponse.data)
      }
    } catch (err) {
      alert(err.response.data.message);
      return 
    }
  };


  const SellGoldHandler = async () => {
    if (safeGoldData.unit == "Amount") {
      let gold_amount = sellTotalGramCalculator(
        goldValueInBox,
        safeGoldData.goldLiveSellPrice.current_price
      );
      let response = await getSellVerifyApi(
        safeGoldData.sfUserData.id,
        safeGoldData.goldLiveSellPrice.rate_id,
        Number(gold_amount),
        Number(goldValueInBox),
        safeGoldData.unit
      );
    } else {
      let sell_price = sellTotalAmountCalculator(
        gramValueInBox,
        safeGoldData.goldLiveSellPrice.current_price
      );
      let response = await getSellVerifyApi(
        safeGoldData.sfUserData.id,
        safeGoldData.goldLiveSellPrice.rate_id,
        Number(gramValueInBox),
        Number(sell_price),
        safeGoldData.unit
      );
    }
  };

  const confirmSellHandler = async () => {
    if (unit == "Amount") {
      let response = await getConfirmSellApi(
        safeGoldDetails.id,
        goldTransactionDetails.tx_id
      );
      if (response.name == "success") {
        let fundResponse = await creditWalletBalance(goldValueInBox, userId);
        if (fundResponse.name == "success") {
          dispatch(updateGoldTransaction(""));
          let balanceResponse = await getSafeGoldBalance(safeGoldDetails.id);
          dispatch(addSafeGoldData(balanceResponse.data));
        }
      }
    } else {
      let response = await getConfirmSellApi(
        safeGoldDetails.id,
        goldTransactionDetails.tx_id
      );
      if (response.name == "success") {
        let sell_price = sellTotalAmountCalculator(
          gramValueInBox,
          GoldLiveSellPrice.current_price
        );
        let fundResponse = await creditWalletBalance(sell_price, userId);
        if (fundResponse.name == "success") {
          dispatch(updateGoldTransaction(""));
          let balanceResponse = await getSafeGoldBalance(safeGoldDetails.id);
          dispatch(addSafeGoldData(balanceResponse.data));
        }
      }
    }
  };

  const timerExpired = () => {
    setPriceFetched(false);
    // dispatch(updateGoldLiveSellPrice(""));
    updateGoldLiveSellPrice("")
  };


  const afterPurchaseHandler = (data) => {
    setPriceFetched(false);
    updateAfterPurchase(data);
  };

  const closeTRans_SellPrice = () => {
    setPriceFetched(false);
    closeTransaction_sellPrice();
  };


  const callAlertBox = () => {
    setCallAlert(true);
    setTimeout(() => {
      setCallAlert(false);
    }, 11000);
  };

  return (
    <div className="w-full md:w-1/2 border-2 border-slate-400 p-4 flex flex-col gap-y-3 rounded-2xl">
      <h1 className="text-md md:text-xl text-center">Sell Gold</h1>

      {/* unit slection */}
      <div className="flex w-full md:w-1/3 self-center justify-around items-center">
        <div className="flex gap-x-1 items-center text-lg">
          <input
            type={"radio"}
            checked={safeGoldData.unit == "Amount" ? true : false}
            onChange={() => updateSafeGoldUnit("Amount")}
          />
          <label>Amount</label>
        </div>
        <div className="flex gap-x-1 items-center text-lg">
          <input
            type={"radio"}
            checked={safeGoldData.unit == "Grams" ? true : false}
            onChange={() => updateSafeGoldUnit("Grams")}
          />
          <label>Grams</label>
        </div>
      </div>

      {/* live price btton */}
      <div className="flex flex-col items-stretch">
        {priceFetched == false ? (
          <button className="bg-green-300" onClick={checkSellPrice}>
            Check Live Sell Price
          </button>
        ) : (
          <div className="flex justify-between bg-orange-200 p-1">
            <h1>This Price is Valid till</h1>
            <FecthPriceTimer timerExpired={timerExpired} />
          </div>
        )}
      </div>
      {safeGoldData.unit == "Amount" ? (
        <>
          {safeGoldData.goldLiveSellPrice == "" ? null : (
            <div className="w-full flex flex-col gap-y-4">
              <div className="flex justify-between items-center">
                <h1>Current Price of Gold</h1>
                <div className="flex items-center">
                  <FaRupeeSign />
                  <h1>{safeGoldData.goldLiveSellPrice.current_price}</h1>
                </div>
              </div>
              <div className="flex flex-col gay-y-3">
                <label>Enter Amount</label>
                <input
                  type={"number"}
                  placeholder={"Enter Amount to Purchase Gold"}
                  className="border-2 pl-2 w-1/2"
                  value={goldValueInBox}
                  onChange={goldBoxChangeHandler}
                />
              </div>
              <div className="flex justify-between items-center">
                <h1>Total Gold in gms</h1>
                <h1>
                  {sellTotalGramCalculator(
                    goldValueInBox,
                    safeGoldData.goldLiveSellPrice.current_price
                  )}{" "}
                  gm
                </h1>
              </div>
              <button
                className="border-2 bg-gray-400"
                onClick={SellGoldHandler}
              >
                Sell Now
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          {safeGoldData.goldLiveSellPrice == "" ? null : (
            <div className="w-full flex flex-col gap-y-4">
              <div className="flex justify-between items-center">
                <h1>Current Price of Gold</h1>
                <div className="flex items-center">
                  <FaRupeeSign />
                  <h1>{safeGoldData.goldLiveSellPrice.current_price}</h1>
                </div>
              </div>
              <div className="flex flex-col gay-y-3">
                <label>Enter Grams</label>
                <input
                  type={"number"}
                  placeholder={"Enter Grams to Purchase Gold"}
                  className="border-2 pl-2 w-1/2"
                  value={gramValueInBox}
                  onChange={gramBoxChangeHandler}
                />
              </div>
              <div className="flex justify-between items-center">
                <h1>Total Amount</h1>
                <div className="flex items-center">
                  <FaRupeeSign />
                  <h1>
                    {sellTotalAmountCalculator(
                      gramValueInBox,
                      safeGoldData.goldLiveSellPrice.current_price
                    )}
                  </h1>
                </div>
              </div>
              <button
                className="border-2 bg-gray-400"
                onClick={SellGoldHandler}
              >
                Sell Now
              </button>
            </div>
          )}
        </>
      )}

      {/* transactions box */}
      {safeGoldData.goldTransaction == "" ? null : (
        <SellTransactionModal
          // afterSellHandler={afterSellHandler}
          gramValueInBox={gramValueInBox}
          goldValueInBox={goldValueInBox}
          callAlertBox={callAlertBox}
          closeTRans_SellPrice={closeTRans_SellPrice}
          afterPurchaseHandler={afterPurchaseHandler}
        />
      )}

      {/* <Alert message={"warning"} duration={10000000} type={"warning"}/> */}
      {/* {callAlert ? (
        <Alert
          message={"Gold Sell Successfully"}
          duration={10000}
          type={"success"}
        />
      ) : null} */}
    </div>
  );
};

export default SellGoldBox;
