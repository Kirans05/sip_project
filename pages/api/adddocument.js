import crypto from "crypto"



export default async function handler(req, res) {
  try {
    const SUMSUB_APP_TOKEN =
      "sbx:iutBbRZ7esaXQNoMdAIUDB3r.oBDg2ZcdB5CvNllj5OXrvGnQuHgcpDmH";
    const SUMSUB_SECRET_KEY = "wOdiiCoXeT0OZDOmZAhhokGK3UrDAci1";
    const SUMSUB_BASE_URL = "https://api.sumsub.com";

    let config = {};
    config.baseURL = SUMSUB_BASE_URL;
    let applicantId = req.body.applicantId
    var method = "post";
    var url = `/resources/applicants/${applicantId}/info/idDoc`;
    var ts = Math.floor(Date.now() / 1000);

    

    config.method = method;
    config.url = url;
    config.headers = headers
    config.body = req.body.form;
    const signature = crypto.createHmac("sha256", SUMSUB_SECRET_KEY);
    signature.update(ts + config.method.toUpperCase() + config.url);
    // signature.update(config.body);
    var headers = {
      // 'Accept': 'application/json',
      'content-type':'multipart/form-data',
      'X-Return-Doc-Warnings':true,
      "X-App-Token": SUMSUB_APP_TOKEN,
      // "X-App-Access-Ts": ts,
      // "X-App-Access-Sig": signature.digest("hex"),
    };


    let dataValue = await getServerSideProps({ query: config });
    res
      .status(200)
      // .json({ message: "Form submitted successfully", req:req.body, config});
      // .json({ message: "Form submitted successfully", req:req.body, config, form:form.getAll("content") });
      .json({ message: "Form submitted successfully", config, dataValue });
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
        context,
        msg: "success",
        response
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
