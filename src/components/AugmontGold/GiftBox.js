import React, { useContext } from "react";
import { MainUseContext } from "../../context/MainUseContext";

const GiftBox = () => {
  const storeState = useContext(MainUseContext);
  let { augmontGoldContext } = storeState;
  let {
    giftInputBoxValues,
    metalDetails,
    setGiftInputBoxValues,
    setVariousOptions,
    variousOptions,
  } = augmontGoldContext.augmontGoldData;

  let {} = augmontGoldContext;
  return (
    <div className="w-3/4 border-2 border-slate-500 rounded-lg p-2 flex flex-col gap-y-6 self-center items-center">
      <h1>Gift Gold</h1>

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
            variousOptions.metalSelected == "gold"
              ? "bg-red-500 text-white p-2 w-1/2 hover:cursor-pointer text-center"
              : "text-red bg-white hover:cursor-pointer p-2 w-1/2 text-center"
          }
          onClick={() =>
            setVariousOptions({ ...variousOptions, metalSelected: "gold" })
          }
        >
          GOLD 24K 999
        </h1>
        <h1
          className={
            variousOptions.metalSelected == "silver"
              ? "bg-red-500 text-white hover:cursor-pointer p-2 w-1/2 text-center"
              : "text-red-500 bg-white hover:cursor-pointer p-2 w-1/2 text-center"
          }
          onClick={() =>
            setVariousOptions({ ...variousOptions, metalSelected: "silver" })
          }
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
          onClick={() =>
            setVariousOptions({ ...variousOptions, sellType: "grams" })
          }
        />
      </div>
      <button
        className="bg-red-500 text-white px-3 py-1 w-1/3 rounded-lg"
        // onClick={giftHandler}
      >
        Send Gift
      </button>
    </div>
  );
};

export default GiftBox;
