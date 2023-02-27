import { useRouter } from "next/router";
import React from "react";
import BottomMenu from "../src/components/BottomMenu/BottomMenu";
import Header from "../src/components/Header/Header";
import Sidebar from "../src/components/Sidebar/Sidebar";

const Assests = () => {
    const router = useRouter()
  return (
    <div className="w-full flex flex-row">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="p-2 pt-6 md:p-6 flex flex-col md:flex-row w-full flex-wrap gap-x-10 gap-y-10 mb-12 md:justify-around">
          <div className=" flex flex-col gap-y-2 w-full md:w-1/4">
            <h1 className="text-lg">Crypto Basket and Coins</h1>
            <div className="border-2 border-slate-300 p-2 rounded-xl flex flex-col items-center gap-y-4">
              <h1 className="text-md">Explore All Crypto Baskets and Coins</h1>
              <h1>Image</h1>
              <button className="border-2 bg-blue-600 w-full text-white p-1 rounded-xl"
              onClick={() => router.push("/LIstOfAssests")}
              >
                START INVESTING
              </button>
            </div>
          </div>
          <div className=" flex flex-col gap-y-2 w-full md:w-1/4">
            <h1 className="text-lg">Gold Saving Schema</h1>
            <div className="border-2 border-slate-300 p-2 rounded-xl flex flex-col items-center gap-y-4">
              <h1 className="text-md">Explore All Gold Savings Schema</h1>
              <h1>Image</h1>
              <button className="border-2 bg-blue-600 w-full text-white p-1 rounded-xl">
                START INVESTING
              </button>
            </div>
          </div>
          <div className=" flex flex-col gap-y-2 w-full md:w-1/4">
            <h1 className="text-lg">Crypto 10</h1>
            <div className="border-2 border-slate-300 p-2 rounded-xl flex flex-col items-center gap-y-4">
              <h1 className="text-md">Invest in Crypto 10</h1>
              <h1>Image</h1>
              <button className="border-2 bg-blue-600 w-full text-white p-1 rounded-xl">
                START INVESTING
              </button>
            </div>
          </div>
          <div className=" flex flex-col gap-y-2 w-full md:w-1/4">
            <h1 className="text-lg">Gold +</h1>
            <div className="border-2 border-slate-300 p-2 rounded-xl flex flex-col items-center gap-y-4">
              <h1 className="text-md">Invest in Gold +</h1>
              <h1>Image</h1>
              <button className="border-2 bg-blue-600 w-full text-white p-1 rounded-xl">
                START INVESTING
              </button>
            </div>
          </div>
          <div className=" flex flex-col gap-y-2 w-full md:w-1/4">
            <h1 className="text-lg">Digital Gold</h1>
            <div className="border-2 border-slate-300 p-2 rounded-xl flex flex-col items-center gap-y-4">
              <h1 className="text-md">Invest in Digital Gold</h1>
              <h1>Image</h1>
              <button className="border-2 bg-blue-600 w-full text-white p-1 rounded-xl"
              onClick={() => router.push("/SafeGold")}
              >
                START INVESTING
              </button>
            </div>
          </div>
        </div>
          <BottomMenu />
      </div>
    </div>
  );
};

export default Assests;
