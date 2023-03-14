import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MainUseContext } from "../../context/MainUseContext";
import IndividualProducts from "./IndividualProducts";

const Products = () => {
  const storeState = useContext(MainUseContext);
  let { augmontGoldContext } = storeState;
  let { merchantId_AccessToken } = augmontGoldContext.augmontGoldData;
  const [productList, setProductList] = useState([]);

  const fetchAllProducts = async () => {
    let options = {
      url: "https://uat-api.augmontgold.com/api/merchant/v1/products?page=1&count=30",
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
        if (fetchResponse.data.statusCode == 200) {
          setProductList(fetchResponse.data.result.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="w-full rounded-lg py-4 px-0 flex flex-col gap-y-6 self-center items-center">
      <h1>List Of Products</h1>
      <div className="flex gap-y-12 w-full flex-wrap gap-x-2 justify-around">
        {productList.map((item, index) => {
          return <IndividualProducts key={index} item={item} />;
        })}
      </div>
    </div>
  );
};

export default Products;
