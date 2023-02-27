import React from "react";
import Header from "../src/components/Header/Header";
import Sidebar from "../src/components/Sidebar/Sidebar";

const CustomerSupport = () => {
  return (
    <div className="w-full flex flex-row">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="p-2 pt-6 md:p-6 flex flex-col gap-y-7 mb-12"></div>
      </div>
    </div>
  );
};

export default CustomerSupport;
