import React, { useContext, useEffect, useState } from "react";
import crypto from "crypto";
import axios from "axios";
import Sidebar from "../src/components/Sidebar/Sidebar";
import Header from "../src/components/Header/Header";
import CryptoJS from "crypto-js";
import supabase from "../src/Config/supabaseClient";
import { useRouter } from "next/router";
import { MainUseContext } from "../src/context/MainUseContext";
import PassportFile from "../src/components/sumsub/PassportFile";

const Sumsub = () => {
  const router = useRouter();
  const storeState = useContext(MainUseContext);
  console.log(storeState);
  let { userDetailsContext } = storeState;
  let { userData, updateUserData } = userDetailsContext;
  const [formData, setFormData] = useState({
    email: "kirans08298@gmail.com",
    phone: "+917624829864",
    fixedInfo: {
      firstName: "kiran",
      lastName: "s",
      legalName: "kiran s",
      gender: "male",
      dob: "1998-02-08",
      placeOfBirth: "bangalore",
      countryOfBirth: "India",
      stateOfBirth: "Karnataka",
      country: "IND",
      nationality: "IND",
      tin: "07AAGFF2194N1Z1",
    },
  });

  const [addressValues, setAddressValues] = useState({
    country: "IND",
    postCode: "562159",
    town: "m.g.road",
    street: "road street",
    state: "karnataka",
    buildingName: "building name",
    flatNumber: "501",
    buildingNumber: "121",
  });

  const inputChangeHandler = (e) => {
    if (e.target.name == "email" || e.target.name == "phone") {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      setFormData({
        ...formData,
        fixedInfo: { ...formData.fixedInfo, [e.target.name]: e.target.value },
      });
    }
  };

  const handleSubmit = async () => {
    const formValues = {
      ...formData,
      fixedInfo: {
        ...formData.fixedInfo,
        address: [
          addressValues.country,
          addressValues.postCode,
          addressValues.town,
          addressValues.state,
          addressValues.street,
          addressValues.buildingName,
          addressValues.flatNumber,
          addressValues.buildingNumber,
        ],
      },
    };
    try{
      let fetchResponse = await axios("/api/sumsub", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        data: formValues,
      });
      console.log(fetchResponse);
    }catch(err){

    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      let fetchResponse = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId);

      console.log(fetchResponse);
      if (fetchResponse.error) {
      }

      if (fetchResponse.data) {
        updateUserData(fetchResponse.data[0]);
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("sb-ziaxsvytbaahgjrompdd-auth-token")) ==
      null
    ) {
      router.push("/LoginPage");
    }
    fetchUserDetails(
      JSON.parse(localStorage.getItem("sb-ziaxsvytbaahgjrompdd-auth-token"))
        .user.id
    );
  }, []);

  return (
    <div className="w-full flex flex-row">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="p-2 pt-6 md:p-6 flex flex-col items-center ">
          <div className=" w-full flex flex-col gap-y-2">
            {userData == "" ? null : userData != null ? null : (
              <div className=" w-full flex flex-col gap-y-2">
                <div className="flex flex-col gap-y-2 justify-center w-full">
                  <label>Email Id</label>
                  <input
                    type={"text"}
                    placeholder={"Enter Your Email Id"}
                    className="border-2 pl-2"
                    value={formData.email}
                    name={"email"}
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className="flex flex-col gap-y-2 justify-center w-full">
                  <label>Phone Number</label>
                  <input
                    type={"text"}
                    placeholder={"Enter Your Phone Number"}
                    className="border-2 pl-2"
                    value={formData.phone}
                    name={"phone"}
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className="flex flex-col gap-y-2 justify-center w-full">
                  <label>First Name</label>
                  <input
                    type={"text"}
                    placeholder={"Enter Your First Name"}
                    className="border-2 pl-2"
                    value={formData.fixedInfo.firstName}
                    name={"firstName"}
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className="flex flex-col gap-y-2 justify-center w-full">
                  <label>Last Name</label>
                  <input
                    type={"text"}
                    placeholder={"Enter Your Last Name"}
                    className="border-2 pl-2"
                    value={formData.fixedInfo.lastName}
                    name={"lastName"}
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className="flex flex-col gap-y-2 justify-center w-full">
                  <label>Legal Name</label>
                  <input
                    type={"text"}
                    placeholder={"Enter Your Legal Name"}
                    className="border-2 pl-2"
                    value={formData.fixedInfo.legalName}
                    name={"legalName"}
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className="flex flex-col gap-y-2 justify-center w-full">
                  <label>Gender</label>
                  <div className="flex gap-x-5">
                    <div className="flex items-center gap-x-2">
                      <input
                        type={"radio"}
                        className="border-2 pl-2"
                        checked={
                          formData.fixedInfo.gender == "male" ? true : false
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            fixedInfo: {
                              ...formData.fixedInfo,
                              gender: "male",
                            },
                          })
                        }
                      />
                      <label>Male</label>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <input
                        type={"radio"}
                        className="border-2 pl-2"
                        checked={
                          formData.fixedInfo.gender == "female" ? true : false
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            fixedInfo: {
                              ...formData.fixedInfo,
                              gender: "female",
                            },
                          })
                        }
                      />
                      <label>Female</label>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <input
                        type={"radio"}
                        className="border-2 pl-2"
                        checked={
                          formData.fixedInfo.gender == "other" ? true : false
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            fixedInfo: {
                              ...formData.fixedInfo,
                              gender: "other",
                            },
                          })
                        }
                      />
                      <label>Others</label>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-y-2 justify-center w-full">
                  <label>Date Of Birth</label>
                  <input
                    type={"date"}
                    placeholder={"Enter Your Date of Birth"}
                    className="border-2 w-1/2"
                    value={formData.fixedInfo.dob}
                    name={"dob"}
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className="flex flex-col gap-y-2 justify-center w-full">
                  <label>Place of Birth</label>
                  <input
                    type={"text"}
                    placeholder={"Enter Your Place of Birth"}
                    className="border-2 pl-2"
                    value={formData.fixedInfo.placeOfBirth}
                    name={"placeOfBirth"}
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className="flex flex-col gap-y-2 justify-center w-full">
                  <label>Country of Birth</label>
                  <input
                    type={"text"}
                    placeholder={"Enter Your Country of Birth"}
                    className="border-2 pl-2"
                    value={formData.fixedInfo.countryOfBirth}
                    name={"countryOfBirth"}
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className="flex flex-col gap-y-2 justify-center w-full">
                  <label>State of Birth</label>
                  <input
                    type={"text"}
                    placeholder={"Enter Your State of Birth"}
                    className="border-2 pl-2"
                    value={formData.fixedInfo.stateOfBirth}
                    name={"stateOfBirth"}
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className="flex flex-col gap-y-2 justify-center w-full">
                  <label>Country Code</label>
                  <input
                    type={"text"}
                    placeholder={"Enter Your Country Code"}
                    className="border-2 pl-2"
                    value={formData.fixedInfo.country}
                    name={"country"}
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className="flex flex-col gap-y-2 justify-center w-full">
                  <label>Nationality</label>
                  <input
                    type={"text"}
                    placeholder={"Enter Your Nationality"}
                    className="border-2 pl-2"
                    value={formData.fixedInfo.nationality}
                    name={"nationality"}
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className="flex flex-col gap-y-2 justify-center w-full">
                  <label>Enter Your Country</label>
                  <input
                    type={"text"}
                    placeholder={"Enter Your Country"}
                    className="border-2 pl-2"
                    value={addressValues.country}
                    name={"country"}
                    onChange={(e) =>
                      setAddressValues({
                        ...addressValues,
                        country: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-y-2 justify-center w-full">
                  <label>Enter Your Postal Code</label>
                  <input
                    type={"text"}
                    placeholder={"Enter Your Postal Code"}
                    className="border-2 pl-2"
                    value={addressValues.postCode}
                    name={"postCode"}
                    onChange={(e) =>
                      setAddressValues({
                        ...addressValues,
                        postCode: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-y-2 justify-center w-full">
                  <label>Enter Your Town</label>
                  <input
                    type={"text"}
                    placeholder={"Enter Your Town"}
                    className="border-2 pl-2"
                    value={addressValues.town}
                    name={"town"}
                    onChange={(e) =>
                      setAddressValues({
                        ...addressValues,
                        town: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-y-2 justify-center w-full">
                  <label>Enter Your Street</label>
                  <input
                    type={"text"}
                    placeholder={"Enter Your Street"}
                    className="border-2 pl-2"
                    value={addressValues.street}
                    name={"street"}
                    onChange={(e) =>
                      setAddressValues({
                        ...addressValues,
                        street: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-y-2 justify-center w-full">
                  <label>Enter Your State</label>
                  <input
                    type={"text"}
                    placeholder={"Enter Your State"}
                    className="border-2 pl-2"
                    value={addressValues.state}
                    name={"state"}
                    onChange={(e) =>
                      setAddressValues({
                        ...addressValues,
                        state: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-y-2 justify-center w-full">
                  <label>Enter Your Building Name</label>
                  <input
                    type={"text"}
                    placeholder={"Enter Your Building Name"}
                    className="border-2 pl-2"
                    value={addressValues.buildingName}
                    name={"buildingName"}
                    onChange={(e) =>
                      setAddressValues({
                        ...addressValues,
                        buildingName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-y-2 justify-center w-full">
                  <label>Enter Your Flat Number</label>
                  <input
                    type={"text"}
                    placeholder={"Enter Your Flat Number"}
                    className="border-2 pl-2"
                    value={addressValues.flatNumber}
                    name={"flatNumber"}
                    onChange={(e) =>
                      setAddressValues({
                        ...addressValues,
                        flatNumber: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-y-2 justify-center w-full">
                  <label>Enter Your Building NUmber</label>
                  <input
                    type={"text"}
                    placeholder={"Enter Your Building NUmber"}
                    className="border-2 pl-2"
                    value={addressValues.buildingNumber}
                    name={"buildingNumber"}
                    onChange={(e) =>
                      setAddressValues({
                        ...addressValues,
                        buildingNumber: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-y-2 justify-center w-full">
                  <label>Enter Your TIN</label>
                  <input
                    type={"text"}
                    placeholder={"Enter Your TIN"}
                    className="border-2 pl-2"
                    value={formData.fixedInfo.tin}
                    name={"tin"}
                    onChange={inputChangeHandler}
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className="bg-green-700 border-2 text-white px-2 py-1 rounded-xl"
                >
                  Submit
                </button>
              </div>
            )}
            <div>
              <PassportFile />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sumsub;
