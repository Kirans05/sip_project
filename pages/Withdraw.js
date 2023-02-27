import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../src/components/Sidebar/Sidebar";
import Header from "../src/components/Header/Header";
import supabase from "../src/Config/supabaseClient";
// import { BiRupee } from "react-icons/bi";
import BottomMenu from "../src/components/BottomMenu/BottomMenu";
import { MainUseContext } from "../src/context/MainUseContext";

const Withdraw = () => {
  const storeState = useContext(MainUseContext);
  console.log(storeState);
  let { userDetailsContext, transactionContext } = storeState;
  let { userId, updateUserId } = userDetailsContext;
  const [balance, setBalance] = useState(0);
  const [userWalletBalance, setUserWalletBalance] = useState("Not Fetched");
  const [reRender, setRerender] = useState(true);

  const fetchUserData = async (userId) => {
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

  const moneyDeduction = async () => {
    if (userWalletBalance == "Not Fetched") {
      alert("Unable to Withdraw Please try again later");
      return;
    }

    if (balance.toString() == "NaN") {
      alert("Enter a Valid Amount");
      return;
    }

    if (balance <= 0) {
      alert("Enter amount greater than 0");
      return;
    }

    if (balance > userWalletBalance) {
      alert("Insufficient Balance to Withdraw");
    }

    try {
      let withdrawResponse = await supabase.rpc("decrement_balance", {
        amount: Number(balance),
      });

      if (withdrawResponse.error) {
        try {
          let transactionResponse = await supabase.rpc(
            "update_transaction_details",
            {
              amount: balance.toString(),
              sender: "withdraw balance",
              receiver: "user",
              message: "transaction failed",
              id: userId,
              type: "debit",
              status: "failed",
            }
          );
          if (transactionResponse.status == 200) {
            alert("Transaction Failed");
          } else {
            alert("Internal Server Problem");
          }
        } catch (err) {}
      }

      if (withdrawResponse.status == 200) {
        try {
          let transactionResponse = await supabase.rpc(
            "update_transaction_details",
            {
              amount: balance.toString(),
              sender: "withdraw balance",
              receiver: "user",
              message: "withdrawing balance",
              id: userId,
              type: "debit",
              status: "success",
            }
          );
          if (transactionResponse.status == 200) {
            setRerender(!reRender);
            alert("Successfully Blanace withdrawed");
          } else {
            alert("Internal Server Problem");
          }
        } catch (err) {}
      }
    } catch (err) {}
  };

  useEffect(() => {
    updateUserId(
      JSON.parse(localStorage.getItem("sb-ziaxsvytbaahgjrompdd-auth-token"))
        .user.id
    );

    fetchUserData(
      JSON.parse(localStorage.getItem("sb-ziaxsvytbaahgjrompdd-auth-token"))
        .user.id
    );
  }, [reRender]);

  return (
    <div className="w-full flex flex-row">
      <Sidebar />
      <div className="w-full flex flex-col gap-y-10">
        <Header />
        <div className="p-2 pt-6 md:p-6 flex flex-col items-center gap-y-5">
          <div className="border-4 bordedr-black w-full md:w-1/3 rounded-2xl p-6 flex flex-col gap-y-4">
            <h1 className="text-xl md:text-2xl">Current Balance</h1>
            <h1 className="text-xl">Available for Investing</h1>
            <h1 className="text-xl flex items-center">
              {/* <BiRupee /> &nbsp; {userWalletBalance} */}
              {userWalletBalance}
            </h1>
          </div>
          <div className="border-4 bordedr-black w-full md:w-1/3 rounded-2xl p-6 flex flex-col gap-y-4">
            <h1 className="text-xl md:text-2xl">Withdraw From Wallet</h1>
            <input
              placeholder="Enter Amount To Withdraw"
              className="w-full border-2 pl-2 h-9"
              value={balance}
              onChange={(e) => setBalance(Number(e.target.value))}
            />
            <button
              className="w-full bg-violet-600 h-9 rounded-lg text-white"
              onClick={moneyDeduction}
            >
              Withdraw
            </button>
          </div>
        </div>
        <BottomMenu />
      </div>
    </div>
  );
};

export default Withdraw;
