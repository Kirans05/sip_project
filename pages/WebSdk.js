import React, { useEffect, useState } from "react";
import Header from "../src/components/Header/Header";
import Sidebar from "../src/components/Sidebar/Sidebar";
import SumsubWebSdk from "@sumsub/websdk-react";
import axios from "axios"

const WebSdk = () => {
  const [accessToken, setAccessToken] = useState("");
  const [tokenFetched, setTokenFetched] = useState(false)

  const [config, setConfig] = useState({})

  const options = {};

  const accessTokenExpirationHandler = (d) => {
    console.log("16",d)
  };

  const messageHandler = (type, pay) => {
    console.log("20",type, pay)
  };

  const errorHandler = (e) => {
    console.log("24",e)
  };

  const generateAccessToken = async (userId) => {
    try {
        let fetchResponse = await axios('/api/AccessToken',{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            data:{
                userId:"jakshjkahsjkasmnjklj"
            }
        })

        if(fetchResponse.status == 200){
            if(fetchResponse.data.name == "success"){
                if(fetchResponse.data.response.props.name == "success"){
                    setAccessToken(fetchResponse.data.response.props.response.token)
                    setTokenFetched(true)
                }
            }
        }
    } catch (err) {}
  };


  const completed = (response, data) => {
    console.log("52",response, data)
  }

  useEffect(() => {
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
        <div className="p-2 pt-6 md:p-6 flex flex-col items-center ">
          <h1>WebSdk</h1>
          {
            tokenFetched ? <SumsubWebSdk
            accessToken={accessToken}
            expirationHandler={accessTokenExpirationHandler}
            config={config}
            options={options}
            onMessage={messageHandler}
            onError={errorHandler}
            stepCompleted={completed}
            onResize={(e,d) => console.log("78",e, d)}
            onStepInitiated={(e) => console.log("79",e)}
            applicantStatus={(e) => console.log("80",e)}
          />
          : null
          }
          {/* <button onClick={() => setConfig({backToInitial: true})}>Back to Initail</button> */}
        </div>
      </div>
    </div>
  );
};

export default WebSdk;
