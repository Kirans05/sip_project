import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MainUseContext } from "../../context/MainUseContext";
import supabase from "../../Config/supabaseClient";

const Profile = () => {
  const router = useRouter();
  const storeState = useContext(MainUseContext);
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    pan_card_number: "",
    DOB: "",
  });

  const fetchProfileData = async (userId) => {
    try {
      let fetchResponse = await supabase
        .from("profiles")
        .select("first_name, last_name, phone_number, pan_card_number, DOB")
        .eq("id", userId);
      if (fetchResponse.error) {
      }

      if (fetchResponse.data) {
        setUserData(fetchResponse.data[0]);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchProfileData(
      JSON.parse(localStorage.getItem("sb-ziaxsvytbaahgjrompdd-auth-token"))
        .user.id
    );
  }, []);

  return (
    <div className="w-full flex flex-col gap-y-6 p-1 items-stretch">
      <img
        src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
        alt="profile Image"
        className="w-1/3 md:w-1/6 self-center"
      />
      <div className="flex flex-col gap-y-4">
        <div className="flex justify-between">
          <h1 className="text-lg md:text-xl">First Name</h1>
          <h1 className="text-lg md:text-xl">
            {userData.first_name == null ? "-" : userData.first_name}
          </h1>
        </div>
        <hr className="border-b-2 border-gray-400" />
        <div className="flex justify-between">
          <h1 className="text-lg md:text-xl">Last Name</h1>
          <h1 className="text-lg md:text-xl">
            {userData.last_name == null ? "-" : userData.last_name}
          </h1>
        </div>
        <hr className="border-b-2 border-gray-400" />
        <div className="flex justify-between">
          <h1 className="text-lg md:text-xl">Phone Number</h1>
          <h1 className="text-lg md:text-xl">
            {userData.phone_number == null ? "-" : userData.phone_number}
          </h1>
        </div>
        <hr className="border-b-2 border-gray-400" />
        <div className="flex justify-between">
          <h1 className="text-lg md:text-xl">Pan Card</h1>
          <h1 className="text-lg md:text-xl">
            {userData.pan_card_number == null ? "-" : userData.pan_card_number}
          </h1>
        </div>
        <hr className="border-b-2 border-gray-400" />
        <div className="flex justify-between">
          <h1 className="text-lg md:text-xl">Date of Birth</h1>
          <h1 className="text-lg md:text-xl">
            {userData.DOB == null ? "-" : userData.DOB}
          </h1>
        </div>
        <hr className="border-b-2 border-gray-400" />
        <button
          className="bg-green-500 h-8 w-full md:w-1/3 rounded-xl self-center mt-4"
          onClick={() => router.push("/EditProfile")}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Profile;
