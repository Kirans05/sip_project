import crypto from "crypto";

export default async function handler(req, res) {
  try {
    const SUMSUB_APP_TOKEN =
      "sbx:iutBbRZ7esaXQNoMdAIUDB3r.oBDg2ZcdB5CvNllj5OXrvGnQuHgcpDmH";
    const SUMSUB_SECRET_KEY = "wOdiiCoXeT0OZDOmZAhhokGK3UrDAci1";
    const SUMSUB_BASE_URL = "https://api.sumsub.com";

    const externalUserId =
      "random-JSToken-" + Math.random().toString(36).substr(2, 9);
    const levelName = "basic-kyc-level";
    var method = "post";
    var url = "/resources/applicants?levelName=" + levelName;
    var ts = Math.floor(Date.now() / 1000);

    var body = {
      externalUserId: externalUserId,
      ...req.body
    };

    let config = {};
    config.baseURL = SUMSUB_BASE_URL;
    config.method = method;
    config.url = url;
    config.body = JSON.stringify(body);

    const signature = crypto.createHmac("sha256", SUMSUB_SECRET_KEY);
    signature.update(ts + config.method.toUpperCase() + config.url);
    signature.update(config.body);
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-App-Token": SUMSUB_APP_TOKEN,
      "X-App-Access-Ts": ts,
      "X-App-Access-Sig": signature.digest("hex"),
    };

    config.headers = headers;

    let dataValue = await getServerSideProps({ query: config });
    res
      .status(200)
      .json({ message: "Form submitted successfully", config, dataValue});
  } catch (err) {
    res.status(201).json({ message: "error", err });
  }
}

export async function getServerSideProps(context) {
  const fullUrl = context.query.baseURL + context.query.url;
  const method = context.query.method;
  const body = context.query.body;
  const headers = context.query.headers;
  try {
    let response = await fetch(fullUrl, {
      method,
      headers,
      body,
    });
    response = await response.json();
    return {
      props: {
        response,
        msg: "success",
      },
    };
  } catch (err) {
    return {
      props: {
        err,
        msg: "error",
      },
    };
  }
}
