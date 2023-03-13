import React, { useEffect, useState } from "react";
import axios from "axios";

const AugmontProfileModal = () => {
  

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
          
        </div>

        {/* <!-- Footer --> */}
        <div className="bg-gray-50 px-4 py-3 sm:px-6">
          <div className="text-right">
            <button
              className="text-sm font-medium leading-5 bg-white border border-gray-300 rounded-md px-4 py-2 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition duration-150 ease-in-out"
            //   onClick={() => closeSignInModal()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AugmontProfileModal;

// {"statusCode":201,"message":"User account created successfully","result":{"data":{"userName":"kiran s","uniqueId":"17a8937e-ec5f-41bc-a1e2-f18e9dd7a664","customerMappedId":"TX17a8937e-ec5f-41bc-a1e2-f18e9dd7a664","mobileNumber":"7624829864","dateOfBirth":null,"gender":null,"userEmail":"kirans08298@gmail.com","userAddress":null,"userStateId":"eyqMQqYd","userCityId":"Pa7zeDqv","userPincode":null,"nomineeName":null,"nomineeRelation":null,"nomineeDateOfBirth":null,"kycStatus":"Pending","userState":"Karnataka","userCity":"Ramanagara","createdAt":"2023-03-09T10:16:46.000000Z"}}}
