import axios from "axios";
import React, { useContext } from "react";
import { MainUseContext } from "../../context/MainUseContext";

const SellGold_SilverBox = () => {
  const storeState = useContext(MainUseContext);
  let { augmontGoldContext } = storeState;
  let {
    merchantId_AccessToken,
    metalDetails,
    sellInputBoxValues,
    setUserBank,
    setVariousOptions,
    userBank,
    variousOptions,
    setSellInputBoxValues,
    setUserPassbook,
  } = augmontGoldContext.augmontGoldData;

  let { sellInputBoxChangeHandler } = augmontGoldContext;

  const metalChangeHandler = (type) => {
    setVariousOptions({ ...variousOptions, metalSelected: type });
    setSellInputBoxValues({
      gramsBox: "",
      amountBox: "",
    });
  };

  const sellMetalHandler = async () => {
    var data = new FormData();
    const merchantTransactionId = Math.random().toString(36).substring(2);

    if (
      variousOptions.metalSelected == "gold" &&
      variousOptions.sellType == "amount"
    ) {
      data.append("uniqueId", "17a8937e-ec5f-41bc-a1e2-f18e9dd7a664");
      data.append("lockPrice", metalDetails.rates.gSell);
      data.append("blockId", metalDetails.blockId);
      data.append("metalType", "gold");
      data.append("amount", sellInputBoxValues.amountBox);
      data.append("merchantTransactionId", merchantTransactionId);
      data.append("userBank[accountName]", userBank.accountName);
      data.append("userBank[accountNumber]", userBank.accountNumber);
      data.append("userBank[ifscCode]", userBank.ifscCode);
    } else if (
      variousOptions.metalSelected == "gold" &&
      variousOptions.sellType == "grams"
    ) {
      data.append("uniqueId", "17a8937e-ec5f-41bc-a1e2-f18e9dd7a664");
      data.append("lockPrice", metalDetails.rates.gSell);
      data.append("blockId", metalDetails.blockId);
      data.append("metalType", "gold");
      data.append("quantity", sellInputBoxValues.gramsBox);
      data.append("merchantTransactionId", merchantTransactionId);
      data.append("userBank[accountName]", userBank.accountName);
      data.append("userBank[accountNumber]", userBank.accountNumber);
      data.append("userBank[ifscCode]", userBank.ifscCode);
    } else if (
      variousOptions.metalSelected == "silver" &&
      variousOptions.sellType == "amount"
    ) {
      data.append("uniqueId", "17a8937e-ec5f-41bc-a1e2-f18e9dd7a664");
      data.append("lockPrice", metalDetails.rates.sSell);
      data.append("blockId", metalDetails.blockId);
      data.append("metalType", "silver");
      data.append("amount", sellInputBoxValues.amountBox);
      data.append("merchantTransactionId", merchantTransactionId);
      data.append("userBank[accountName]", userBank.accountName);
      data.append("userBank[accountNumber]", userBank.accountNumber);
      data.append("userBank[ifscCode]", userBank.ifscCode);
    } else if (
      variousOptions.metalSelected == "silver" &&
      variousOptions.sellType == "grams"
    ) {
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
      if (fetchResponse.status == 200) {
        if (fetchResponse.data.statusCode == 200) {
          alert(fetchResponse.data.message);
          setUserPassbook({
            silverGrms: fetchResponse.data.result.data.silverBalance,
            goldGrms: fetchResponse.data.result.data.goldBalance,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-3/4 border-2 border-slate-500 rounded-lg p-2 flex flex-col gap-y-6 self-center items-center">
      {" "}
      {/* metal rates */}
      {metalDetails == "" ? null : (
        <div className="flex justify-between w-1/3">
          <div className="flex flex-col gap-y-0 items-center font-bold text-lg">
            <h1>Gold</h1>
            <h1>{metalDetails.rates.gSell} /gm</h1>
          </div>
          <div className="flex flex-col gap-y-0 items-center font-bold text-lg">
            <h1>Silver</h1>
            <h1>{metalDetails.rates.sSell} /gm</h1>
          </div>
        </div>
      )}
      {/* buy sell options */}
      <div className="flex justify-between w-1/3 ">
        <h1
          className={
            variousOptions.optionsSelected == "buy"
              ? "border-b-2 border-red-500 hover:cursor-pointer font-semibold text-lg text-red-500"
              : "border-b-2 border-white hover:cursor-pointer font-semibold text-lg text-red-500"
          }
          onClick={() =>
            setVariousOptions({
              ...variousOptions,
              optionsSelected: "buy",
              page: "buy page",
            })
          }
        >
          Buy
        </h1>
        <h1
          className={
            variousOptions.optionsSelected == "sell"
              ? "border-b-2 border-red-500 hover:cursor-pointer font-semibold text-lg text-red-500"
              : "border-b-2 border-white hover:cursor-pointer font-semibold text-lg text-red-500"
          }
          onClick={() =>
            setVariousOptions({
              ...variousOptions,
              optionsSelected: "sell",
              page: "sell page",
            })
          }
        >
          Sell
        </h1>
      </div>
      {/* type of metal */}
      <div className="flex w-3/4 border-2 border-slate-600 justify-between p-1 rounded-lg">
        <h1
          className={
            variousOptions.metalSelected == "gold"
              ? "bg-red-500 text-white p-2 w-1/2 hover:cursor-pointer text-center"
              : "text-red bg-white hover:cursor-pointer p-2 w-1/2 text-center"
          }
          onClick={() => metalChangeHandler("gold")}
          //   onClick={() => metalChangeHandler("gold")}
        >
          GOLD 24K 999
        </h1>
        <h1
          className={
            variousOptions.metalSelected == "silver"
              ? "bg-red-500 text-white hover:cursor-pointer p-2 w-1/2 text-center"
              : "text-red-500 bg-white hover:cursor-pointer p-2 w-1/2 text-center"
          }
          onClick={() => metalChangeHandler("silver")}
          //   onClick={() => metalChangeHandler("silver")}
        >
          SILVER 24K 999
        </h1>
      </div>
      {/* input box fo grams and amount */}
      <div className="flex w-3/4 justify-between p-1">
        <input
          type={"number"}
          placeholder={"Grams"}
          className="w-1/3 border-2 border-slate-500 pl-3"
          value={sellInputBoxValues.gramsBox}
          onChange={(e) => sellInputBoxChangeHandler(e, "grams")}
          onClick={() =>
            setVariousOptions({ ...variousOptions, sellType: "grams" })
          }
        />
        <h1>{"-><-"}</h1>
        <input
          type={"number"}
          placeholder={"Amount"}
          className="w-1/3 border-2 border-slate-500 pl-3"
          value={sellInputBoxValues.amountBox}
          onChange={(e) => sellInputBoxChangeHandler(e, "amount")}
          onClick={() =>
            setVariousOptions({ ...variousOptions, sellType: "amount" })
          }
        />
      </div>
      {/* bank details section */}
      <div className="w-1/2 p-2 flex flex-col gap-y-3">
        <h1 className="text-center">Enter Bank Details For Money Transfer</h1>
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
      </div>
      {/* quick Sell button */}
      <button
        className="bg-red-500 text-white px-3 py-1 w-1/3 rounded-lg"
        onClick={sellMetalHandler}
      >
        Quick Sell
      </button>
    </div>
  );
};

export default SellGold_SilverBox;
