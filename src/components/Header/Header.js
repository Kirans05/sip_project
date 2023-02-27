import React, { useState } from "react";
// import { BiSearchAlt2 } from "react-icons/bi";
// import { IoIosNotifications } from "react-icons/io";
// import { GiHamburgerMenu } from "react-icons/gi";
import Drawer from "../Drawer/Drawer";

const Header = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const displayDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <div className="w-full h-16 flex flex-row justify-between md:justify-end items-center gap-x-3 border-2 p-5 sticky top-0 z-10 bg-black text-white">
      {/* <GiHamburgerMenu className="text-xl md:hidden" onClick={displayDrawer} />
      {showDrawer == false ? null : <Drawer displayDrawer={displayDrawer} />}
      <h1 className="text-2xl md:hidden">Sipto</h1>
      <div className="flex items-center gap-x-0 md:gap-x-3">
        <BiSearchAlt2 className="text-2xl hover:cursor-pointer" />
        <IoIosNotifications className="text-2xl hover:cursor-pointer" /> */}
        {/* <h1 className='text-2xl hover:cursor-pointer'>User</h1> */}
      {/* </div> */}
    </div>
  );
};

export default Header;
