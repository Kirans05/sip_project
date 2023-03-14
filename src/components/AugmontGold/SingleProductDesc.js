import axios from "axios";
import React, { useContext, useEffect } from "react";
import { MainUseContext } from "../../context/MainUseContext";

const SingleProductDesc = () => {
  const storeState = useContext(MainUseContext);
  let { augmontGoldContext } = storeState;
  let {
    merchantId_AccessToken,
    deliverProdDetails,
    setDeliverProdDetails,
    variousOptions,
  } = augmontGoldContext.augmontGoldData;

  const getSingleProductDetails = async () => {
    let options = {
      url: `https://uat-api.augmontgold.com/api/merchant/v1/products/${variousOptions.deliverProductId}`,
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${merchantId_AccessToken.accessToken}`,
      },
    };

    try {
      let fetchResponse = await axios(options);
      console.log(fetchResponse);
      if (fetchResponse.status == 200) {
        if (
          fetchResponse.data.statusCode == 200 &&
          fetchResponse.data.message == "Product retrieved successfully."
        ) {
          setDeliverProdDetails(fetchResponse.data.result.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSingleProductDetails();
  }, []);

  return (
    <div className="w-full border-2 border-slate-300 rounded-lg p-4 flex flex-col gap-y-6">
      {deliverProdDetails == "" ? null : (
        <div className="flex justify-between gap-x-5">
          {deliverProdDetails == "" ? null : (
            <img
              src={deliverProdDetails.productImages[0].url}
              alt={"Product Image"}
              className="w-1/3 border-2 border-slate-300 rounded-2xl h-80 self-center"
            />
          )}
          <div className="w-full flex flex-col gap-y-5 px-5">
            {/* first row */}
            <div className="flex justify-between px-0">
              {/* first column */}
              <div className="flex flex-col gap-y-1">
                <h1 className="font-semibold text-md">
                  {deliverProdDetails.name}
                </h1>
                <h1 className="text-sm">SKU : {deliverProdDetails.sku}</h1>
                <h1 className="font-semibold text-md">
                  Rs {deliverProdDetails.basePrice}
                </h1>
              </div>
              {/* second column */}
              <div>
                <h1 className="font-semibold text-md">Quantity - 1</h1>
              </div>
            </div>
            <hr className="border-b-2" />
            <h1 className="text-center font-semibold text-sm">
              Expected Delivery Date 28/03/2023
            </h1>
            <hr className="border-b-2" />
            {/* third row */}
            <div className="flex flex-col gap-y-2 px-52">
              <div className="flex justify-between">
                <h1>SKU</h1>
                <h1>{deliverProdDetails.sku}</h1>
              </div>
              <div className="flex justify-between">
                <h1>Actual Weight(gms)</h1>
                <h1>{deliverProdDetails.productWeight}</h1>
              </div>
              <div className="flex justify-between">
                <h1>Redeem Weight(gms)</h1>
                <h1>{deliverProdDetails.redeemWeight}</h1>
              </div>
              <div className="flex justify-between">
                <h1>Purity</h1>
                <h1>{deliverProdDetails.purity}</h1>
              </div>
              <div className="flex justify-between">
                <h1>Metal Type</h1>
                <h1>{deliverProdDetails.metalType}</h1>
              </div>
            </div>
            <hr className="border-b-2" />
            <button className="h-11 border-2 w-1/2 self-center bg-emerald-800 text-white rounded-xl">
              Request Delivery
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProductDesc;
