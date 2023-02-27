import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import supabase from "../../Config/supabaseClient";
import { RxDashboard } from "react-icons/rx";
import { VscAccount } from "react-icons/vsc";
import { GrTransaction } from "react-icons/gr";
import { CiMoneyBill } from "react-icons/ci";
import { BiWalletAlt } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineGold } from "react-icons/ai";

const Drawer = ({ displayDrawer }) => {
  const router = useRouter();
  const [userExist, setUserExist] = useState(false);

  const logoutHandler = async () => {
    const res = await supabase.auth.signOut();
    router.push("/LoginPage");
  };

  useEffect(() => {
    if (localStorage.getItem("sb-ziaxsvytbaahgjrompdd-auth-token") == null) {
      setUserExist(false);
    } else {
      setUserExist(true);
    }
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 px-0 pb-4 h-1/2 ">
      {/* <!-- Background overlay, show/hide based on drawer state. --> */}
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      {/* <!-- Drawer panel, show/hide based on drawer state. --> */}
      <div className="relative bg-black rounded-lg shadow-xl transform transition-all w-3/4 sm:w-1/2  h-screen flex flex-col gap-y-6 pl-4 pt-6 pr-4">
        {/* app name and close button */}
        <div className="text-white flex items-center justify-between">
          <h1 className="text-3xl">Sipto</h1>
          <AiOutlineClose className="text-2xl" onClick={displayDrawer} />
        </div>

        {/* login and signup buttons */}
        <div
          className={userExist == false ? "flex flex-col gap-y-3" : "hidden"}
        >
          <h1
            className={
              router.pathname == "/LoginPage"
                ? "text-xl text-black hover:cursor-pointer bg-gray-400  rounded-lg p-1"
                : "text-xl text-white hover:cursor-pointer p-1"
            }
            onClick={() => router.push("/LoginPage")}
          >
            Login
          </h1>
          <h1
            className={
              router.pathname == "/SignupPage"
                ? "text-xl text-black hover:cursor-pointer bg-gray-400  rounded-lg p-1"
                : "text-xl text-white hover:cursor-pointer p-1"
            }
            onClick={() => router.push("/SignupPage")}
          >
            Singup
          </h1>
        </div>

        {/* dashboard, account, payment buttons */}
        <div className={userExist == true ? "flex flex-col gap-y-5" : "hidden"}>
          <div
            className={
              router.pathname == "/Dashboard"
                ? "text-black hover:cursor-pointer bg-gray-400  rounded-lg p-1 flex items-center gap-x-2"
                : "text-white hover:cursor-pointer p-1 flex items-center gap-x-2"
            }
            onClick={() => router.push("/Dashboard")}
          >
            <RxDashboard className="text-xl" />
            <h1 className="text-xl">Dashboard</h1>
          </div>
          <div
            className={
              router.pathname == "/Account"
                ? "text-black hover:cursor-pointer bg-gray-400  rounded-lg p-1 flex items-center gap-x-2"
                : "text-white hover:cursor-pointer p-1 flex items-center gap-x-2"
            }
            onClick={() => router.push("/Account")}
          >
            <VscAccount className="text-xl" />
            <h1 className="text-xl">Account</h1>
          </div>
          <div
            className={
              router.pathname == "/Transactions"
                ? "text-black hover:cursor-pointer bg-gray-400  rounded-lg p-1 flex items-center gap-x-2"
                : "text-white hover:cursor-pointer p-1 flex items-center gap-x-2"
            }
            onClick={() => router.push("/Transactions")}
          >
            <GrTransaction
              className={
                router.pathname == "/Transactions"
                  ? "text-black"
                  : "text-white bg-white"
              }
            />
            <h1 className="text-xl">Transactions</h1>
          </div>
          <div
            className={
              router.pathname == "/Withdraw"
                ? "text-black hover:cursor-pointer bg-gray-400  rounded-lg p-1 flex items-center gap-x-2"
                : "text-white hover:cursor-pointer p-1 flex items-center gap-x-2"
            }
            onClick={() => router.push("/Withdraw")}
          >
            <CiMoneyBill className="text-xl" />
            <h1 className="text-xl">Withdraw</h1>
          </div>
          <div
            className={
              router.pathname == "/Wallet"
                ? "text-black hover:cursor-pointer bg-gray-400  rounded-lg p-1 flex items-center gap-x-2"
                : "text-white hover:cursor-pointer p-1 flex items-center gap-x-2"
            }
            onClick={() => router.push("/Wallet")}
          >
            <BiWalletAlt className="text-xl" />
            <h1 className="text-xl">Wallet</h1>
          </div>
          <div
            className={
              router.pathname == "/Assests"
                ? "text-black hover:cursor-pointer bg-gray-400  rounded-lg p-1 flex items-center gap-x-2"
                : "text-white hover:cursor-pointer p-1 flex items-center gap-x-2"
            }
            onClick={() => router.push("/Assests")}
          >
            <AiOutlineGold className="text-xl" />
            <h1 className="text-xl">Assests</h1>
          </div>
          {/* <div
          className={
            router.pathname == "/SafeGold"
              ? "text-black hover:cursor-pointer bg-gray-400  rounded-lg p-1 flex items-center gap-x-2"
              : "text-white hover:cursor-pointer p-1 flex items-center gap-x-2"
          }
          onClick={() => router.push("/SafeGold")}
        >
          <AiOutlineGold className="text-xl" />
          <h1 className="text-xl">SafeGold</h1>
        </div> */}
          <div
            className={
              "text-white hover:cursor-pointer p-1 flex items-center gap-x-2"
            }
            onClick={() => logoutHandler()}
          >
            <FiLogOut />
            <h1 className="text-xl">Logout</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
