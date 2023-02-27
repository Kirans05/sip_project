import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../src/components/Sidebar/Sidebar";
import Header from "../src/components/Header/Header";
// import { BiRupee } from "react-icons/bi";
// import { IoFilterSharp } from "react-icons/io5";
// import { AiOutlineHistory } from "react-icons/ai";
import BottomMenu from "../src/components/BottomMenu/BottomMenu";
import { MainUseContext } from "../src/context/MainUseContext";
import supabase from "../src/Config/supabaseClient";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

const Transactions = () => {
  const storeState = useContext(MainUseContext);
  let { userDetailsContext, transactionContext } = storeState;
  let { updateTransactionArray, transactionData } = transactionContext;
  const [userWalletBalance, setUserWalletBalance] = useState(0);
  const [pagNumber, setPagNumber] = useState(0);
  const [totalPage, setTotalPageNumber] = useState(0);

  const fetchUSersWalletBalance = async (userId) => {
    try {
      let fetchResponse = await supabase
        .from("profiles")
        .select("wallet_balance")
        .eq("id", userId);

      if (fetchResponse.error) {
      }

      if (fetchResponse.data) {
        setUserWalletBalance(fetchResponse.data[0].wallet_balance);
      }
    } catch (err) {}
  };

  const fetchUserTransactionList = async (userId) => {
    try {
      let fetchResponse = await supabase
        .from("transaction_table")
        .select("*")
        .eq("id", userId)
        .order("transaction_table_id", { ascending: false });
      console.log(fetchResponse);
      if (fetchResponse.error) {
      }

      if (fetchResponse.data) {
        updateTransactionArray(fetchResponse.data);
        setTotalPageNumber(Math.ceil(fetchResponse.data.length / 10));
      }
    } catch (err) {}
  };


  const decreasePagNumber = () => {
    if(pagNumber == 0){
    }else{
      setPagNumber(pagNumber - 10)
    }
  }


  const increasePagNumber = () => {
    if(Math.ceil(pagNumber/10) == Math.ceil(transactionData.transactionArray.length/10)){
      
    }else{
      setPagNumber(pagNumber + 10)
    }
  }

  useEffect(() => {
    fetchUSersWalletBalance(
      JSON.parse(localStorage.getItem("sb-ziaxsvytbaahgjrompdd-auth-token"))
        .user.id
    );
    fetchUserTransactionList(
      JSON.parse(localStorage.getItem("sb-ziaxsvytbaahgjrompdd-auth-token"))
        .user.id
    );
  }, []);

  return (
    <div className="w-full flex flex-row">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="p-2 pt-6 md:p-6 flex flex-col gap-y-7 mb-12">
          {/* current balance menu */}
          <div className="border-4 bordedr-black w-full md:w-1/3 rounded-2xl p-6 flex flex-col gap-y-4 self-center">
            <h1 className="text-xl">Current Balance</h1>
            <h1 className="text-xl">Available for Investing</h1>
            <h1 className="text-xl flex items-center">
              {/* <BiRupee /> &nbsp; {userWalletBalance} */}
               {userWalletBalance}
            </h1>
          </div>

          {/* history and filter bar */}
          <div className="flex items-center justify-between px-4 md:px-16 py-3 shadow-xl ">
            <div className="flex items-center gap-x-2 hover:cursor-pointer">
              {/* <AiOutlineHistory className="text-md md:text-xl" /> */}
              <h1 className="text-md md:text-xl hover:cursor-pointer">
                History
              </h1>
            </div>
            <div className="flex gap-x-5 items-center">
              {/* <div className="flex items-center gap-x-2 border-2 px-3 py-1 rounded-xl border-black hover:cursor-pointer">
                <IoFilterSharp className="text-md md:text-xl" />
                <h1 className="text-md md:text-xl">Filter</h1>
              </div> */}
              <div className="flex items-center gap-x-3">
                {/* <AiOutlineArrowLeft onClick={decreasePagNumber} className="hover:cursor-pointer"/> */}
                <h1 onClick={decreasePagNumber} className="hover:cursor-pointer">{`<-`}</h1>
                <h1>
                  {pagNumber/10}-{totalPage}
                </h1>
                {/* <AiOutlineArrowRight onClick={increasePagNumber} className="hover:cursor-pointer"/> */}
                <h1 onClick={increasePagNumber} className="hover:cursor-pointer">{`->`}</h1>
              </div>
            </div>
          </div>

          {/* transactions list */}
          <div className="w-full flex flex-col gap-y-4">
            {transactionData.transactionArray.map((item, index) => {
              if (index >= pagNumber && index < pagNumber + 10) {
                return (
                  <div
                    key={index}
                    className="flex w-full justify-between items-center p-3 border-2 rounded-2xl shadow-xl"
                  >
                    <div className="flex flex-col gap-y-1">
                      <h1>{item.message}</h1>
                      <h1
                        className={
                          item.status == "success"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {item.status}
                      </h1>
                    </div>
                    <div className="flex flex-col items-end gap-y-1">
                      <h1
                        className={
                          item.type == "credit"
                            ? "text-green-600 flex items-center"
                            : "text-red-600 flex items-center"
                        }
                      >
                        {/* <BiRupee /> */}
                        {item.amount}
                      </h1>
                      <h1>
                        {item.created_at.substring(0, 10)}{" "}
                        {item.created_at.substring(11, 16)}
                      </h1>
                    </div>
                  </div>
                );
              }
            })}
          </div>

          <BottomMenu />
        </div>
      </div>
    </div>
  );
};

export default Transactions;
