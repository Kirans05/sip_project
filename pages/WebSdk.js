import React, { useEffect, useState } from "react";
import Header from "../src/components/Header/Header";
import Sidebar from "../src/components/Sidebar/Sidebar";
import SumsubWebSdk from "@sumsub/websdk-react";
import axios from "axios";
import supabase from "../src/Config/supabaseClient";

const WebSdk = () => {
  const [userId, setUserId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [tokenFetched, setTokenFetched] = useState(false);
  // const [sumsubKycId, setSumsubKycId] = useState("")
  const [config, setConfig] = useState({});

  const options = {};

  const accessTokenExpirationHandler = (d) => {
    console.log("16", d);
  };

  const messageHandler = (type, pay) => {
    console.log("20", type, pay);
    if (type == "idCheck.onApplicantLoaded") {
      updateUserProfileKycId(userId, pay.applicantId);
    }

    if (type == "idCheck.applicantStatus") {
      if (
        pay.reviewResult.reviewAnswer == "GREEN" &&
        pay.reviewStatus == "completed"
      ) {
        // updateUserProfileData(userId, sumsubKycId)
        updateUserProfileKycStatus(userId);
      }
    }
  };

  const errorHandler = (e) => {
    console.log(e);
  };

  const generateAccessToken = async (userId) => {
    try {
      let fetchResponse = await axios("/api/AccessToken", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        data: {
          userId,
        },
      });

      if (fetchResponse.status == 200) {
        if (fetchResponse.data.name == "success") {
          if (fetchResponse.data.response.props.name == "success") {
            setAccessToken(fetchResponse.data.response.props.response.token);
            setTokenFetched(true);
          }
        }
      }
    } catch (err) {}
  };

  const updateUserProfileKycId = async (userId, sumsubKycId) => {
    try {
      let fetchResponse = await supabase
        .from("profiles")
        .update({ sumsub_kyc_id: sumsubKycId })
        .eq("id", userId);
    } catch (err) {}
  };

  const updateUserProfileKycStatus = async (userId) => {
    try {
      let fetchResponse = await supabase
        .from("profiles")
        .update({ sumsub_kyc_status: "completed" })
        .eq("id", userId);
    } catch (err) {}
  };

  useEffect(() => {
    setUserId(
      JSON.parse(localStorage.getItem("sb-ziaxsvytbaahgjrompdd-auth-token"))
        .user.id
    );
    generateAccessToken(
      JSON.parse(localStorage.getItem("sb-ziaxsvytbaahgjrompdd-auth-token"))
        .user.id
    );
  }, []);

  return (
    <div className="w-full flex flex-row">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="p-2 pt-6 md:p-6 flex flex-col items-center w-full">
          {tokenFetched ? (
            <div className="w-full">
              <SumsubWebSdk
                accessToken={accessToken}
                expirationHandler={accessTokenExpirationHandler}
                config={config}
                options={options}
                onMessage={messageHandler}
                onError={errorHandler}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default WebSdk;
