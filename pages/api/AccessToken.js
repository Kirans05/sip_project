import crypto from "crypto";

export default async function handler(req, res) {
  let userId = req.body.userId;
  const SUMSUB_APP_TOKEN =
    "sbx:iutBbRZ7esaXQNoMdAIUDB3r.oBDg2ZcdB5CvNllj5OXrvGnQuHgcpDmH";
  const SUMSUB_SECRET_KEY = "wOdiiCoXeT0OZDOmZAhhokGK3UrDAci1";
  const SUMSUB_BASE_URL = "https://api.sumsub.com";

  var config = {};
  var method = "post";
  var url = `/resources/accessTokens?userId=${userId}&levelName=basic-kyc-level`;
  var ts = Math.floor(Date.now() / 1000);

  config.baseURL = SUMSUB_BASE_URL;
  config.method = method;
  config.url = url;

  const signature = crypto.createHmac("sha256", SUMSUB_SECRET_KEY);
  signature.update(ts + config.method.toUpperCase() + config.url);

  var headers = {
    "Content-Type": "application/json",
    "X-App-Token": SUMSUB_APP_TOKEN,
    "X-App-Access-Ts": ts,
    "X-App-Access-Sig": signature.digest("hex"),
  };

  config.headers = headers;
  try {
    let response = await getServerSideProps({ query: { userId, config } });
    res.status(200).json({ name: "success", response });
  } catch (err) {
    res.status(201).json({ name: "error" });
  }
}

export async function getServerSideProps(context) {
  let userId = context.query.userId;
  let headers = context.query.config.headers;
  let method = context.query.config.method;
  try {
    let response = await fetch(
      `https://api.sumsub.com/resources/accessTokens?userId=${userId}&levelName=basic-kyc-level`,
      {
        method,
        headers
      }
    );
    response = await response.json();
    return {
      props: {
        response,
        name:"success"
      },
    };
  } catch (err) {
    return {
      props: {
        err,
        name:"error"
      },
    };
  }
}
