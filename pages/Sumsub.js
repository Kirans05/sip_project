import React from "react";
import crypto from "crypto";
import axios from "axios";

const Sumsub = () => {
  function generateSignature(httpMethod, path, queryParams, body, secretKey) {
    const stringToSign = `${httpMethod}\n${path}\n${queryParams}\n${body}`;
    const hmac = crypto.createHmac("sha256", secretKey);
    hmac.update(stringToSign);
    return hmac.digest("hex");
  }

  const handleSubmit = async () => {
    const queryParams = "";
    const path = "https://api.sumsub.com/resources/applicants";
    const httpMethod = "POST";

    const requestBody = {
      externalUserId: "random-JSToken-kkkkkk1111222333",
      email: "john.smith@sumsub.com",
      phone: "+449112081223",
      fixedInfo: {
        country: "GBR",
        placeOfBirth: "London",
      },
    };

    const stringToSign = `${httpMethod}\n${path}\n${queryParams}\n${JSON.stringify(
      requestBody
    )}`;
    const secretKey = "wOdiiCoXeT0OZDOmZAhhokGK3UrDAci1";
    const hmac = crypto.createHmac("sha256", secretKey);
    hmac.update(stringToSign);
    const signature = hmac.digest("hex");
    console.log(signature);

    const timestamp = Math.floor(Date.now() / 1000);

    const corsOptions = {
      origin: "https://api.sumsub.com", // the allowed origin for the request
      methods: ["GET", "POST"], // the allowed HTTP methods for the request
      allowedHeaders: ["Content-Type", "Authorization"], // the allowed headers for the request
    };

    let options = {
      url: `https://api.sumsub.com/resources/applicants?levelName=basic-kyc-level`,
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        "X-App-Token":
          "sbx:iutBbRZ7esaXQNoMdAIUDB3r.oBDg2ZcdB5CvNllj5OXrvGnQuHgcpDmH",
        "X-App-Access-Sig": signature,
        "X-App-Access-Ts": timestamp,
      },
      data: JSON.stringify(requestBody),
      mode: "cors",
      credentials: "include",
      headers: corsOptions.allowedHeaders,
      origin: corsOptions.origin,
    };




    try {
      let response = await axios(options);
      console.log(response);
    } catch (err) {
      // sbx:iutBbRZ7esaXQNoMdAIUDB3r.oBDg2ZcdB5CvNllj5OXrvGnQuHgcpDmH app token
      // wOdiiCoXeT0OZDOmZAhhokGK3UrDAci1   secret key
      console.log(err);
    }
  };





  function createSignature(config) {
    console.log('Creating a signature for the request...');
  
    var ts = Math.floor(Date.now() / 1000);
    console.log(ts)
    const signature = crypto.createHmac('sha256',  'wOdiiCoXeT0OZDOmZAhhokGK3UrDAci1');
    signature.update(`${ts}` + 'POST' + 'resources/applicants?levelName=basic-kyc-level'+`${JSON.stringify({
        externalUserId: "random-JSToken-kkkkkk1111222333",
        email: "john.smith@sumsub.com",
        phone: "+449112081223",
        fixedInfo: {
          country: "GBR",
          placeOfBirth: "London",
        },
      })}`);

      console.log(signature.digest('hex'))
  
    // if (config.data instanceof FormData) {
    //   signature.update(config.data.getBuffer());
    // } else if (config.data) {
    //   signature.update(config.data);
    // }
  
    // config.headers['X-App-Access-Ts'] = ts;
    // config.headers['X-App-Access-Sig'] = signature.digest('hex');
  
    // return config;
  }

  return (
    <div>
      <h1>Sumsub</h1>
      <button onClick={handleSubmit}>click me</button>
      <br />
      <button onClick={createSignature} className="border-2 bg-red-400">createSignature me</button>
    </div>
  );
};

export default Sumsub;
