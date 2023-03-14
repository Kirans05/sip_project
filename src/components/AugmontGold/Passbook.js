import React, { useContext } from "react";
import { MainUseContext } from "../../context/MainUseContext";

const Passbook = () => {
  const storeState = useContext(MainUseContext);
  let { augmontGoldContext } = storeState;
  let { userPassbook } = augmontGoldContext.augmontGoldData;
  return (
    <div className="border-2 border-slate-500 w-1/2 flex flex-col gap-y-4 p-2 rounded-lg self-center">
      <h1 className="self-center font-semibold text-xl">My Vault</h1>
      <div className="flex justify-around font-bold">
        <div className="flex flex-col items-center gap-y-1">
          <h1>GOLD GRAMS</h1>
          <h1 className="text-red-500">{userPassbook.goldGrms} Grams</h1>
        </div>
        <div className="border-r-2 border-slate-600"></div>
        <div className="flex flex-col items-center gap-y-1">
          <h1>SILVER GRAMS</h1>
          <h1 className="text-red-500">{userPassbook.silverGrms} Grams</h1>
        </div>
      </div>
    </div>
  );
};

export default Passbook;
