// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}




// import axios from "axios";
// import CryptoJS from "crypto-js";

// export default async function handler(req, res) {
//   // const { name, email } = req.body

//   // Pass form data to getServerSideProps
//   // const data = await getServerSideProps({ query: { name, email } })

//   var secretKey = "wOdiiCoXeT0OZDOmZAhhokGK3UrDAci1";
//   var stamp = Math.floor(Date.now() / 1000).toString();

//   var externalUserId =
//     "random-userId-" + Math.random().toString(36).substr(2, 9);

//   var valueToSign =
//     stamp +
//     "POST" +
//     "/resources/applicants?levelName=basic-kyc-level" +
//     JSON.stringify({
//       externalUserId: externalUserId,
//       email: "kiran@gmail.com",
//       phone: "+1234567890",
//       fixedInfo: {
//         country: "INR",
//         placeOfBirth: "India",
//       },
//     });

//   var signature = CryptoJS.enc.Hex.stringify(
//     CryptoJS.HmacSHA256(valueToSign, secretKey)
//   );
//   const options = {
//     // url: ``,
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//       "X-App-Token":
//         "sbx:iutBbRZ7esaXQNoMdAIUDB3r.oBDg2ZcdB5CvNllj5OXrvGnQuHgcpDmH",
//       "X-App-Access-Ts": stamp,
//       "X-App-Access-Sig": signature,
//     },
//     body: JSON.stringify({
//       externalUserId: externalUserId,
//       email: "kiran@gmail.com",
//       phone: "+1234567890",
//       fixedInfo: {
//         country: "INR",
//         placeOfBirth: "India",
//       },
//     }),
//   };
// //   const options = {
// //     url: `https://api.sumsub.com/resources/applicants?levelName=basic-kyc-level`,
// //     method: "POST",
// //     headers: {
// //       "content-type": "application/json",
// //       "X-App-Token":
// //         "sbx:iutBbRZ7esaXQNoMdAIUDB3r.oBDg2ZcdB5CvNllj5OXrvGnQuHgcpDmH",
// //       "X-App-Access-Ts": stamp,
// //       "X-App-Access-Sig": signature,
// //     },
// //     data: JSON.stringify({
// //       externalUserId: externalUserId,
// //       email: "kiran@gmail.com",
// //       phone: "+1234567890",
// //       fixedInfo: {
// //         country: "INR",
// //         placeOfBirth: "India",
// //       },
// //     }),
// //   };
//   const data = await getServerSideProps({ query: options });

//   res.status(200).json({ message: "Form submitted successfully", data });
// }

// export async function getServerSideProps(context) {
//   const opt = context.query.context;
//   try{
//     //   let response = await axios(opt);
//       let response = await fetch('https://api.sumsub.com/resources/applicants?levelName=basic-kyc-level',opt);
//       response = await response.json()
//       return {
//         props: {
//           response,
//         //   response:JSON.stringify(response),
//           opt
//         },
//       };
//   }catch(err){
//     return {
//         props: {
//           err,
//           opt
//         },
//       };
//   }
// }








export default async function handler(req, res) {
  // These parameters should be used for all requests
  const SUMSUB_APP_TOKEN = "YOUR_SUMSUB_APP_TOKEN"; // Example: sbx:uY0CgwELmgUAEyl4hNWxLngb.0WSeQeiYny4WEqmAALEAiK2qTC96fBad - Please don't forget to change when switching to production
  const SUMSUB_SECRET_KEY = "YOUR_SUMSUB_SECRET_KEY"; // Example: Hej2ch71kG2kTd1iIUDZFNsO5C1lh5Gq - Please don't forget to change when switching to production
  const SUMSUB_BASE_URL = "https://api.sumsub.com";

  var config = {};
  config.baseURL = SUMSUB_BASE_URL;

  axios.interceptors.request.use(createSignature, function (error) {
    return Promise.reject(error);
  });

  // This function creates signature for the request as described here: https://developers.sumsub.com/api-reference/#app-tokens

  function createSignature(config) {
    console.log("Creating a signature for the request...");

    var ts = Math.floor(Date.now() / 1000);
    const signature = crypto.createHmac("sha256", SUMSUB_SECRET_KEY);
    signature.update(ts + config.method.toUpperCase() + config.url);
    signature.update(config.data);

    config.headers["X-App-Access-Ts"] = ts;
    config.headers["X-App-Access-Sig"] = signature.digest("hex");

    return config;
  }

  function createApplicant(externalUserId, levelName) {
    console.log("Creating an applicant...");

    var method = "post";
    var url = "/resources/applicants?levelName=" + levelName;
    var ts = Math.floor(Date.now() / 1000);

    var body = {
      externalUserId: externalUserId,
    };

    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-App-Token": SUMSUB_APP_TOKEN,
    };

    config.method = method;
    config.url = url;
    config.headers = headers;
    config.data = JSON.stringify(body);

    return config;
  }

//   async function main() {
    externalUserId =
      "random-JSToken-" + Math.random().toString(36).substr(2, 9);
    levelName = "basic-kyc-level";
    console.log("External UserID: ", externalUserId);

    let obj = createApplicant(externalUserId, levelName);

    // response = await axios();
    const data = await getServerSideProps({ query: obj });
    res.status(200).json({ message: "Form submitted successfully", data });
//   }

//   main();
}

export async function getServerSideProps(context) {
    return{
        props:{
            context
        }
    }
}
