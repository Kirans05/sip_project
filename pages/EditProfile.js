import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../src/components/Sidebar/Sidebar";
import Header from "../src/components/Header/Header";
import BottomMenu from "../src/components/BottomMenu/BottomMenu";
import supabase from "../src/Config/supabaseClient";
import { MainUseContext } from "../src/context/MainUseContext";

const EditProfile = () => {
  const storeState = useContext(MainUseContext);
  let { userDetailsContext, transactionContext } = storeState;
  let { userId, updateUserId } = userDetailsContext;
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    DOB: "",
    pan_card_number: "",
  });
  const [reRender, setRerender] = useState(false);

  const inputChangeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const fetchUserDetails = async (userId) => {
    try {
      let fetchResponse = await supabase
        .from("profiles")
        .select("first_name, last_name, phone_number, DOB, pan_card_number")
        .eq("id", userId);

      if (fetchResponse.error) {
        alert("Unable to Get User Details");
        return;
      }

      if (fetchResponse.data) {
        setUserData(fetchResponse.data[0]);
      }
    } catch (err) {}
  };

  const saveButtonHandler = async () => {
    try {
      const saveResponse = await supabase
        .from("profiles")
        .update(userData)
        .eq("id", userId);
      console.log(saveResponse);

      if (saveResponse.error) {
        alert("Unable to Update The Data");
        return;
      }

      if (saveResponse.status == 204) {
        alert("Successfully updated!");
        setRerender(!reRender);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    updateUserId(
      JSON.parse(localStorage.getItem("sb-ziaxsvytbaahgjrompdd-auth-token"))
        .user.id
    );
    fetchUserDetails(
      JSON.parse(localStorage.getItem("sb-ziaxsvytbaahgjrompdd-auth-token"))
        .user.id
    );
  }, [reRender]);

  return (
    <div className="w-full flex flex-row">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="p-2 pt-6 md:p-6 flex flex-col items-center z-40 bg-white mb-12 md:mb-0">
          <div className="w-full md:w-1/3 flex flex-col gap-y-6">
            <h1 className="text-2xl self-center">Edit Profile</h1>
            <div className="flex flex-col gap-y-2">
              <label className="text-xl">First Name</label>
              <input
                type={"text"}
                placeholder={"Enter Your First Name"}
                className="border-4 w-full pl-2 h-10"
                name="first_name"
                value={userData.first_name}
                onChange={inputChangeHandler}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-xl">Last Name</label>
              <input
                type={"text"}
                placeholder={"Enter Your last Name"}
                className="border-4 w-full pl-2 h-10"
                name="last_name"
                value={userData.last_name}
                onChange={inputChangeHandler}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-xl">Phone Number</label>
              <input
                type={"number"}
                placeholder={"Enter Your Phone Number"}
                className="border-4 w-full pl-2 h-10"
                name="phone_number"
                value={userData.phone_number}
                onChange={inputChangeHandler}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-xl">Pan Card</label>
              <input
                type={"text"}
                placeholder={"Enter Your Pan Card Number"}
                className="border-4 w-full pl-2 h-10"
                name="pan_card_number"
                value={userData.pan_card_number}
                onChange={inputChangeHandler}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-xl">Date of Birth</label>
              <input
                type={"date"}
                placeholder={"Enter Your Date of Birth"}
                className="border-4 w-full pl-2 h-10"
                name="DOB"
                value={userData.DOB}
                onChange={inputChangeHandler}
              />
            </div>
            <button
              className="bg-green-600 h-9 rounded-2xl text-white"
              onClick={saveButtonHandler}
            >
              Save
            </button>
          </div>
        </div>
        <BottomMenu />
      </div>
    </div>
  );
};

export default EditProfile;
