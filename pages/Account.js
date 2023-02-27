import React, { useState } from "react";
import Profile from "../src/components/Accounts/Profile";
import Settings from "../src/components/Accounts/Settings";
import BottomMenu from "../src/components/BottomMenu/BottomMenu";
import Header from "../src/components/Header/Header";
import Sidebar from "../src/components/Sidebar/Sidebar";

const Account = () => {
  const [optionsSelected, setOptionSelected] = useState("profile");

  return (
    <div className="w-full flex flex-row">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="p-2 pt-6 md:p-6 flex flex-col items-center w-full gap-y-6 mb-12 md:mb-0">
          <div className="w-3/4 px-2 md:px-0 md:w-1/2 flex flex-row justify-between">
            <h1
              className={
                optionsSelected == "profile"
                  ? "text-2xl border-b-2 border-black hover:cursor-pointer"
                  : "text-2xl border-b-2 border-white hover:cursor-pointer"
              }
              onClick={() => setOptionSelected("profile")}
            >
              Profile
            </h1>
            <h1
              className={
                optionsSelected == "settings"
                  ? "text-2xl border-b-2 border-black hover:cursor-pointer"
                  : "text-2xl border-b-2 border-white hover:cursor-pointer"
              }
              onClick={() => setOptionSelected("settings")}
            >
              Settings
            </h1>
          </div>
          {optionsSelected == "profile" ? <Profile /> : <Settings />}
        </div>
        <BottomMenu />
      </div>
    </div>
  );
};

export default Account;
