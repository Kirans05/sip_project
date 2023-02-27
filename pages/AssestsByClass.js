import React from "react";
import Header from "../src/components/Header/Header";
import Sidebar from "../src/components/Sidebar/Sidebar";

const AssestsByClass = () => {
  return (
    <div className="w-full flex flex-row">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="p-2 pt-6 md:p-6 flex flex-col items-center "></div>
      </div>
    </div>
  );
};

export default AssestsByClass;
