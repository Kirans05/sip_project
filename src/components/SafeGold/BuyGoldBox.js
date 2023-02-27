import React, { useContext, useEffect, useState } from "react";
import FecthPriceTimer from "./FecthPriceTimer";
import { FaRupeeSign } from "react-icons/fa";
import BuyTransactionModal from "../Modal/BuyTransactionModal";
import Alert from "../Alert/Alert";
import { MainUseContext } from "../../context/MainUseContext";
import axios from "axios";

const BuyGoldBox = () => {
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
  } = safeGoldContext;

  const [goldValueInBox, setGoldValueInBox] = useState(0);
  const [gramValueInBox, setGramValueInBox] = useState(0);
  const [priceFetched, setPriceFetched] = useState(false);
  const [callAlert, setCallAlert] = useState(false);

  // done
  const goldBoxChangeHandler = (e) => {
    setGoldValueInBox(Number(e.target.value));
  };

  // done
  const gramBoxChangeHandler = (e) => {
    setGramValueInBox(Number(e.target.value));
  };

  // done
  const checkLiveBuyPrice = async () => {
    const options = {
      url: `https://partners-staging.safegold.com/v1/buy-price`,
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer 38778d59d5e17cfadc750e87703eb5e2",
      },
    };
    try {
      let fetchResponse = await axios(options);
      if (fetchResponse.status == 200) {
        updateGoldLiveBuyPrice(fetchResponse.data);
        setPriceFetched(true);
      }
    } catch (err) {
      alert(err.response.data.message);
      return;
    }
  };

  const totalGstCalculator = (current_price, applicable_tax) => {
    let gstRate_and_price = Number(
      (Number(current_price) * (1 + Number(applicable_tax) / 100))
        .toString()
        .substring(0, 7)
    );
    return gstRate_and_price;
  };

  const totalGstCalculatorGrams = (current_price, applicable_tax) => {
    let gstRate_and_price = Number(
      Number(current_price) * (1 + Number(applicable_tax) / 100)
    );
    let gstPrice = parseFloat(gstRate_and_price.toFixed(2));
    return gstPrice;
  };

  const totalGramsCalculator = (
    current_price,
    applicable_tax,
    entered_Amount
  ) => {
    let gstRate_and_price = totalGstCalculator(current_price, applicable_tax);
    let finalGrams = Number(
      (Number(entered_Amount) / Number(gstRate_and_price))
        .toString()
        .substring(0, 6)
    );
    return finalGrams;
  };

  const totalAmountCalculator = (
    current_price,
    applicable_tax,
    entered_grams
  ) => {
    let gstRate_and_price = totalGstCalculatorGrams(
      current_price,
      applicable_tax
    );
    let finalAmount = Number(entered_grams) * Number(gstRate_and_price);
    return parseFloat(finalAmount.toFixed(2));
  };

  const getBuyVerifyApi = async (
    safeGoldUserId,
    rate_id,
    gold_amount,
    buy_price,
    unit
  ) => {
    const options = {
      url: `https://partners-staging.safegold.com/v4/users/${safeGoldUserId}/buy-gold-verify`,
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: "Bearer 38778d59d5e17cfadc750e87703eb5e2",
        "content-type": "application/json",
      },
      data: JSON.stringify({
        rate_id,
        gold_amount,
        buy_price,
      }),
    };
    try {
      let fetchResponse = await axios(options);
      if (fetchResponse.status == 200) {
        updateGoldTransaction(fetchResponse.data);
      }
    } catch (err) {
      alert(err.response.data.message);
      return;
    }
  };

  const buyGoldHandler = async () => {
    if (safeGoldData.unit == "Amount") {
      let gold_amount = totalGramsCalculator(
        safeGoldData.goldLiveBuyPrice.current_price,
        safeGoldData.goldLiveBuyPrice.applicable_tax,
        goldValueInBox
      );
      getBuyVerifyApi(
        safeGoldData.sfUserData.id,
        safeGoldData.goldLiveBuyPrice.rate_id,
        Number(gold_amount),
        Number(goldValueInBox),
        safeGoldData.unit
      );
    } else {
      let gold_amount = totalAmountCalculator(
        safeGoldData.goldLiveBuyPrice.current_price,
        safeGoldData.goldLiveBuyPrice.applicable_tax,
        gramValueInBox
      );
      getBuyVerifyApi(
        safeGoldData.sfUserData.id,
        safeGoldData.goldLiveBuyPrice.rate_id,
        Number(gramValueInBox),
        Number(gold_amount),
        safeGoldData.unit
      );
    }
  };

  const timerExpired = () => {
    setPriceFetched(false);
    updateGoldLiveBuyPrice("");
  };

  const afterPurchaseHandler = (data) => {
    setPriceFetched(false);
    updateAfterPurchase(data);
  };

  const closeTRans_BuyPrice = () => {
    setPriceFetched(false);
    closeTransaction_buyPrice();
  };

  const callAlertBox = () => {
    // setCallAlert(true)
    // setTimeout(() => {
    //   setCallAlert(false)
    // },11000)
  };


  useEffect(() => {
    // setInterval(() => {
    //   console.log("first")
    //   console.log(1)
    //   checkLiveBuyPrice()
    // },10000)
    // const interval = setInterval(() => {
    //   console.log("first")
    //   console.log(1)
    //   checkLiveBuyPrice()
    // }, 10000);

    // return () => clearInterval(interval);
  },[])

  return (
    <div className="w-full md:w-1/2 border-2 border-slate-400 p-4 flex flex-col gap-y-3 rounded-2xl">
      <h1 className="text-md md:text-xl text-center">Buy Gold</h1>
      {/* units */}
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
      {/* check live buy price */}
      <div className="flex flex-col items-stretch">
        {priceFetched == false ? (
          <button className="bg-green-300" onClick={checkLiveBuyPrice}>
            Check Live Buy Price
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
          {safeGoldData.goldLiveBuyPrice == "" ? null : (
            <div className="border-2 w-full flex flex-col gap-y-4">
              <div className="flex justify-between items-center">
                <h1>Current Price of Gold</h1>
                <div className="flex items-center">
                  <FaRupeeSign />
                  <h1>{safeGoldData.goldLiveBuyPrice.current_price}</h1>
                </div>
              </div>
              <div className="flex justify-between">
                <h1>Tax Applicable on Gold</h1>
                <h1>{safeGoldData.goldLiveBuyPrice.applicable_tax}%</h1>
              </div>
              <div className="flex justify-between">
                <h1>Rate Including GST</h1>
                <div className="flex items-center">
                  <FaRupeeSign />
                  <h1>
                    {totalGstCalculator(
                      safeGoldData.goldLiveBuyPrice.current_price,
                      safeGoldData.goldLiveBuyPrice.applicable_tax
                    )}
                  </h1>
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
              <div className="flex justify-between">
                <h1>Total Gold in gms</h1>
                <h1>
                  {totalGramsCalculator(
                    safeGoldData.goldLiveBuyPrice.current_price,
                    safeGoldData.goldLiveBuyPrice.applicable_tax,
                    goldValueInBox
                  )}{" "}
                  gm
                </h1>
              </div>
              <button className="border-2 bg-gray-400" onClick={buyGoldHandler}>
                Buy Now
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          {safeGoldData.goldLiveBuyPrice == "" ? null : (
            <div className="w-full flex flex-col gap-y-4">
              <div className="flex justify-between items-center">
                <h1>Current Price of Gold</h1>
                <div className="flex items-center">
                  <FaRupeeSign />
                  <h1>{safeGoldData.goldLiveBuyPrice.current_price}</h1>
                </div>
              </div>
              <div className="flex justify-between">
                <h1>Tax Applicable on Gold</h1>
                <h1>{safeGoldData.goldLiveBuyPrice.applicable_tax}%</h1>
              </div>

              <div className="flex justify-between">
                <h1>Rate Including GST</h1>
                <div className="flex items-center">
                  <FaRupeeSign />
                  <h1>
                    {totalGstCalculatorGrams(
                      safeGoldData.goldLiveBuyPrice.current_price,
                      safeGoldData.goldLiveBuyPrice.applicable_tax
                    )}
                  </h1>
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
              <div className="flex justify-between">
                <h1>Total Amount</h1>
                <div className="flex items-center">
                  <FaRupeeSign />
                  <h1>
                    {totalAmountCalculator(
                      safeGoldData.goldLiveBuyPrice.current_price,
                      safeGoldData.goldLiveBuyPrice.applicable_tax,
                      gramValueInBox
                    )}
                  </h1>
                </div>
              </div>
              <button className=" bg-gray-400" onClick={buyGoldHandler}>
                Buy Now
              </button>
            </div>
          )}
        </>
      )}

      {/* transactions box */}
      {safeGoldData.goldTransaction == "" ? null : (
        <BuyTransactionModal
          afterPurchaseHandler={afterPurchaseHandler}
          closeTRans_BuyPrice={closeTRans_BuyPrice}
          callAlertBox={callAlertBox}
        />
      )}

      {/* {
        callAlert ? <Alert message={"Gold Purchase Successfull"} duration={10000} type={"success"}/> : null
      } */}
    </div>
  );
};

export default BuyGoldBox;

// invoice_id
// :
// "SG2302170525481743143"
