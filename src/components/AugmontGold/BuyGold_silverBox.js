import React from "react";

const BuyGold_silverBox = ({metalDetails, setOptionSelected, metalChangeHandler, setPurchaseType, inputBoxChangeHandler, differentAmountButtonHandler, BuyMetalHandler, optionsSelected, metalSelected}) => {
  return (
    <div className="w-3/4 border-2 border-slate-500 rounded-lg p-2 flex flex-col gap-y-6 self-center items-center">
      {/* metal rates */}
      <div className="flex justify-between w-1/3">
        <div className="flex flex-col gap-y-0 items-center font-bold text-lg">
          <h1>Gold</h1>
          <h1>{metalDetails.rates.gBuy} /gm</h1>
        </div>
        <div className="flex flex-col gap-y-0 items-center font-bold text-lg">
          <h1>Silver</h1>
          <h1>{metalDetails.rates.sBuy} /gm</h1>
        </div>
      </div>

      {/* buy sell options */}
      <div className="flex justify-between w-1/3 ">
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
      </div>

      {/* type of metal */}
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

      {/* input box fo grams and amount */}
      <div className="flex w-3/4 justify-between p-1">
        <input
          type={"number"}
          placeholder={"Grams"}
          className="w-1/3 border-2 border-slate-500 pl-3"
          value={inputBoxValues.gramsBox}
          onChange={(e) => inputBoxChangeHandler(e, "grams")}
          onClick={() => setPurchaseType("grams")}
        />
        <h1>{"-><-"}</h1>
        <input
          type={"number"}
          placeholder={"Amount"}
          className="w-1/3 border-2 border-slate-500 pl-3"
          value={inputBoxValues.amountBox}
          onChange={(e) => inputBoxChangeHandler(e, "amount")}
          onClick={() => setPurchaseType("amount")}
        />
      </div>

      {/* amount buttons like 500, 1000, 10000 */}
      <div className="w-3/4 flex justify-between">
        <button
          className="bg-gray-200 text-black px-3 py-1"
          onClick={() => differentAmountButtonHandler(500)}
        >
          +500
        </button>
        <button
          className="bg-gray-200 text-black px-3 py-1"
          onClick={() => differentAmountButtonHandler(1000)}
        >
          +1000
        </button>
        <button
          className="bg-gray-200 text-black px-3 py-1"
          onClick={() => differentAmountButtonHandler(5000)}
        >
          +5000
        </button>
        <button
          className="bg-black text-white px-3 py-1 w-1/3"
          onClick={() => differentAmountButtonHandler(10000)}
        >
          +10000
        </button>
      </div>

      {/* quick buy button */}
      <button
        className="bg-red-500 text-white px-3 py-1 w-1/3 rounded-lg"
        onClick={BuyMetalHandler}
      >
        Quick Buy
      </button>
    </div>
  );
};

export default BuyGold_silverBox;
