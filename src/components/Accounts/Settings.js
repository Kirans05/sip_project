import React from "react";
import { AiOutlineRight } from "react-icons/ai";

const Settings = () => {
  return (
    <div className="flex flex-col gap-y-5 w-full p-1 md:px-12 md:py-4">
      <div className="flex justify-between hover:cursor-pointer">
        <h1 className="text-lg md:text-xl">Change Password</h1>
        <AiOutlineRight className="text-lg md:text-xl" />
      </div>
      <div className="flex flex-col gap-y-3">
        <h1 className="text-xl">Payment Statement</h1>
        <div className="flex justify-between hover:cursor-pointer">
          <h1 className="text-lg md:text-xl">Payment Methods</h1>
          <AiOutlineRight className="text-lg md:text-xl" />
        </div>
        <div className="flex justify-between hover:cursor-pointer">
          <h1 className="text-lg md:text-xl">Daily Savings</h1>
          <AiOutlineRight className="text-lg md:text-xl" />
        </div>
        <div className="flex justify-between hover:cursor-pointer">
          <h1 className="text-lg md:text-xl">Savings Plan</h1>
          <AiOutlineRight className="text-lg md:text-xl" />
        </div>
        <div className="flex justify-between hover:cursor-pointer">
          <h1 className="text-lg md:text-xl">Round offs</h1>
          <AiOutlineRight className="text-lg md:text-xl" />
        </div>
      </div>
      <div className="flex flex-col gap-y-3">
        <h1 className="text-xl">Privacy and Permissions</h1>
        <div className="flex justify-between hover:cursor-pointer">
          <h1 className="text-lg md:text-xl">Terms And Conditions</h1>
          <AiOutlineRight className="text-lg md:text-xl" />
        </div>
        <div className="flex justify-between hover:cursor-pointer">
          <h1 className="text-lg md:text-xl">Privacy policy</h1>
          <AiOutlineRight className="text-lg md:text-xl" />
        </div>
      </div>
    </div>
  );
};

export default Settings;
