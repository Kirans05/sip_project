import React, { useContext } from "react";
import { MainUseContext } from "../../context/MainUseContext";

const IndividualProducts = ({ item }) => {

  const storeState = useContext(MainUseContext);
  let { augmontGoldContext } = storeState;
  let { merchantId_AccessToken, setVariousOptions, variousOptions } = augmontGoldContext.augmontGoldData;

  return (
    <div className="border-2 border-slate-200 flex flex-col w-1/4 items-center py-2 px-0 gap-y-3 rounded-xl hover:cursor-pointer"
    onClick={() => setVariousOptions({...variousOptions, deliverProductId:item.sku, page: "single product details"})}
    >
      <img
        src={`${item.productImages[0].url}`}
        alt={"Image"}
        className="w-1/3"
      />
      <h1 className="font-semibold text-sm">{item.productWeight} gms</h1>
      <h1 className="text-xs">{item.name}</h1>
      <h1 className="font-semibold text-md">{item.basePrice} Rs</h1>
      <h1 className="text-xs">{"{Making & Delivery Charges}"}</h1>
    </div>
  );
};

export default IndividualProducts;
