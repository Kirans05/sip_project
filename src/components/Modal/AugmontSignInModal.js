import React, { useEffect, useState } from "react";
import axios from "axios";

const AugmontSignInModal = ({ closeSignInModal, merchantId_AccessToken }) => {
  const [statesList, setStatesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [customerData, setCustomerData] = useState({
    mobileNumber: "",
    uniqueId: "",
    userName: "",
    email: "",
    userCity: "",
    userState: "Andaman and Nicobar",
    userStateId: "joXp8X42",
  });

  const fetchStates = async () => {
    let options = {
      url: "https://uat-api.augmontgold.com/api/merchant/v1/master/states?count=100",
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${merchantId_AccessToken.accessToken}`,
      },
    };
    try {
      let fetchResponse = await axios(options);
      if (fetchResponse.status == 200) {
        if (
          fetchResponse.data.message == "State list retrieved successfully."
        ) {
          setStatesList(fetchResponse.data.result.data);
        }
      }
    } catch (err) {}
  };

  const stateChangeHandler = async (e) => {
    setCustomerData({ ...customerData, userState: e.target.value });
    let filterState = statesList.filter((item) => item.name == e.target.value);
    if (filterState.length) {
      fetchCities(filterState[0].id);
    }
  };

  const fetchCities = async (stateId) => {
    let options = {
      url: `https://uat-api.augmontgold.com/api/merchant/v1/master/cities?stateId=${stateId}&count=100`,
      method: "GET",
      headers: {
        "content-type": "appication/json",
        Authorization: `Bearer ${merchantId_AccessToken.accessToken}`,
      },
    };
    try {
      let fetchResponse = await axios(options);
      if (fetchResponse.status == 200) {
        if (fetchResponse.data.message == "City list retrieved successfully.") {
          setCitiesList(fetchResponse.data.result.data);
        }
      }
    } catch (err) {}
  };

  const registerHandler = async () => {
    if (customerData.mobileNumber == "") {
      alert("Please Enter Mobile Number");
      return;
    }

    if (customerData.userName == "") {
      alert("Please Enter User Name");
      return;
    }

    if (customerData.email == "") {
      alert("Please Enter Email");
      return;
    }

    if (customerData.uniqueId == "") {
      alert("please Enter Unique Id");
      return;
    }

    if (customerData.userState == "") {
      alert("Please Select State");
      return;
    }

    if (customerData.userCity == "") {
      alert("Please Select City");
      return;
    }

    let stateArr = statesList.filter(
      (item) => item.name == customerData.userState
    );
    let cityArr = citiesList.filter(
      (item) => item.name == customerData.userCity
    );

    let data = new FormData();
    data.append("mobileNumber", `${customerData.mobileNumber}`);
    data.append("emailId", `${customerData.email}`);
    data.append("uniqueId", `jashkasjkhkashjkashkhaks`);
    data.append("userName", `${customerData.userName}`);
    data.append("userCity", `${cityArr[0].id}`);
    data.append("userState", `${stateArr[0].id}`);

    let options = {
      url: "https://uat-api.augmontgold.com/api/merchant/v1/users",
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${merchantId_AccessToken.accessToken}`,
      },
      data: data,
    };
    try {
      let fetchResponse = await axios(options);
      console.log(fetchResponse);
      if (fetchResponse.status == 201) {
        if (fetchResponse.data.message == "User account created successfully") {
          alert("User account created successfully");
          return;
        }
      } else {
        alert("Something went wrong!");
        return;
      }
    } catch (err) {
      if (err.response.data.message) {
        alert(err.response.data.message);
        return;
      }
    }
  };

  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("sb-ziaxsvytbaahgjrompdd-auth-token")) !=
      null
    ) {
      setCustomerData({
        ...customerData,
        uniqueId: JSON.parse(
          localStorage.getItem("sb-ziaxsvytbaahgjrompdd-auth-token")
        ).user.id,
      });
    }
    fetchStates();
  }, []);

  return (
    <div className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
      {/* <!-- Background overlay, show/hide based on modal state. --> */}
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      {/* <!-- Modal panel, show/hide based on modal state. --> */}
      <div className="relative bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        {/* <!-- Header --> */}
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 sm:px-6">
          <div className="text-center text-sm font-medium leading-5">
            <h1>Sign In</h1>
            <h1>Enter Mobile Number to Sign In</h1>
          </div>
        </div>

        {/* <!-- Body --> */}
        <div className="p-4 w-full flex flex-col gap-y-5">
          <div className="flex border-2 border-slate-400 h-10 items-center w-3/4 rounded-lg p-2 self-center">
            <h1>+91</h1>
            <input
              type={"number"}
              placeholder="Enter Your Phone Number"
              className="pl-3 w-full"
              onChange={(e) =>
                setCustomerData({
                  ...customerData,
                  mobileNumber: Number(e.target.value),
                })
              }
              value={customerData.mobileNumber}
            />
          </div>
          <div className="flex justify-between w-full">
            <div className="flex flex-col gap-y-2">
              <h1>Email</h1>
              <input
                type={"text"}
                placeholder="Enter Your Email Id"
                className="pl-2"
                onChange={(e) =>
                  setCustomerData({ ...customerData, email: e.target.value })
                }
                value={customerData.email}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <h1>User Name</h1>
              <input
                type={"text"}
                placeholder="Enter User Name"
                className="pl-2"
                onChange={(e) =>
                  setCustomerData({ ...customerData, userName: e.target.value })
                }
                value={customerData.userName}
              />
            </div>
          </div>
          <div className="flex justify-between w-full ">
            <div className="w-1/2 flex flex-col gap-y-3">
              <h1>Select State</h1>
              <div className="relative inline-flex">
                <select
                  className="appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  onChange={stateChangeHandler}
                  value={customerData.userState}
                >
                  {statesList.map((item, index) => {
                    return <option key={index}>{item.name}</option>;
                  })}
                </select>
              </div>
            </div>
            {citiesList.length == 0 ? null : (
              <div className="w-1/2 flex flex-col gap-y-3">
                <h1>Select City</h1>
                <div className="relative inline-flex">
                  <select
                    className="appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    // onChange={stateChangeHandler}
                    onChange={(e) =>
                      setCustomerData({
                        ...customerData,
                        userCity: e.target.value,
                      })
                    }
                    value={customerData.userCity}
                  >
                    {citiesList.map((item, index) => {
                      return <option key={index}>{item.name}</option>;
                    })}
                  </select>
                </div>
              </div>
            )}
          </div>
          <button
            className="bg-green-400 text-white w-1/2 px-2 py-1 rounded-xl self-center"
            onClick={registerHandler}
          >
            Register
          </button>
        </div>

        {/* <!-- Footer --> */}
        <div className="bg-gray-50 px-4 py-3 sm:px-6">
          <div className="text-right">
            <button
              className="text-sm font-medium leading-5 bg-white border border-gray-300 rounded-md px-4 py-2 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition duration-150 ease-in-out"
              onClick={() => closeSignInModal()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AugmontSignInModal;

// {"statusCode":201,"message":"User account created successfully","result":{"data":{"userName":"kiran s","uniqueId":"17a8937e-ec5f-41bc-a1e2-f18e9dd7a664","customerMappedId":"TX17a8937e-ec5f-41bc-a1e2-f18e9dd7a664","mobileNumber":"7624829864","dateOfBirth":null,"gender":null,"userEmail":"kirans08298@gmail.com","userAddress":null,"userStateId":"eyqMQqYd","userCityId":"Pa7zeDqv","userPincode":null,"nomineeName":null,"nomineeRelation":null,"nomineeDateOfBirth":null,"kycStatus":"Pending","userState":"Karnataka","userCity":"Ramanagara","createdAt":"2023-03-09T10:16:46.000000Z"}}}
