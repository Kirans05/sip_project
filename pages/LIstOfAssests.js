import React, { useContext, useEffect } from "react";
import Header from "../src/components/Header/Header";
import Sidebar from "../src/components/Sidebar/Sidebar";
import AssestsComponent from "../src/components/ListOfAssests/AssestsComponent";
import supabase from "../src/Config/supabaseClient";
import { MainUseContext } from "../src/context/MainUseContext";
import BasketComponent from "../src/components/ListOfAssests/BasketComponent";

const LIstOfAssests = () => {
  const storeState = useContext(MainUseContext);
  console.log(storeState);
  let { listOfAssestsContext, userDetailsContext } = storeState;
  let {
    listOfAssestsData,
    updateListOfAssestsArray,
    updateListOfBasketsArray,
  } = listOfAssestsContext;

  const fetchAllAssests = async () => {
    try {
      let fetchResponse = await supabase.from("new_assests_table").select("*");
      console.log(fetchResponse.data);
      if (fetchResponse.error) {
      }

      if (fetchResponse.data) {
        updateListOfAssestsArray(fetchResponse.data);
      }
    } catch (err) {}
  };

  const fetchAllBaskets = async () => {
    try {
      let fetchResponse = await supabase.from("bakset_Table").select("*");

      if (fetchResponse.error) {
        return;
      }

      if (fetchResponse.status == 200) {
        updateListOfBasketsArray(fetchResponse.data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchAllAssests();
  }, []);

  useEffect(() => {
    fetchAllBaskets();
  }, []);

  return (
    <div className="w-full flex flex-row">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="p-2 pt-6 md:p-6 flex flex-col md:flex-row w-full flex-wrap gap-x-10 gap-y-10 mb-12">
          <div className="w-full flex flex-col gap-y-4 items-center">
            <h1 className="font-semibold">List Of Assests</h1>
            <div className="w-full flex flex-col gap-y-4 items-center">
              {listOfAssestsData.listOfAssestsArray.map((item, index) => {
                return <AssestsComponent key={index} item={item} />;
              })}
            </div>
          </div>
          <div className="w-full flex flex-col gap-y-4 items-center">
            <h1 className="font-semibold">List of Baskets</h1>
            <div className="flex flex-col md:flex-row flex-wrap gap-x-2 justify-around gap-y-5">
              {listOfAssestsData.listOfBasketsArray.map((item, index) => {
                return <BasketComponent key={index} item={item} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LIstOfAssests;
