import React from "react";
import Header from "../src/components/Header/Header";
import Sidebar from "../src/components/Sidebar/Sidebar";
import axios from "axios";
import Script from "next/script";
import Head from "next/head";
// import Razorpay from "razorpay";

const RazorPay = () => {
  const paymentHandler = async () => {
    try {
      let fetchResponse = await axios("/api/RazorPayOrders", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });

      let { data } = fetchResponse.data;
      const options = {
        key: "rzp_test_Eiy9Xdf0I1J9up",
        name: "xyz",
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        description: "description",
        handler: function (response) {
        },
        prefill: {
          name: "John Doe",
          email: "jdoe@example.com",
          contact: "9876543210",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="w-full flex flex-row">
        <Sidebar />
        <div className="w-full">
          <Header />
          <div className="p-2 pt-6 md:p-6 flex flex-col items-center ">
            <h1>RazorPay</h1>
            <button onClick={paymentHandler} className="border-2 bg-green-500 text-white p-2 rounded-2xl">submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RazorPay;
