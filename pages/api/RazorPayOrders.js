const Razorpay = require("razorpay");



const instance = new Razorpay({
  key_id: "rzp_test_Eiy9Xdf0I1J9up",
  key_secret: "kHuUJ2vAsL59alXSqOVcRMhh",
});



async function handler(req, res) {
  const amount = 1 * 100; 
  const currency = "INR";
  const options = {
    amount: amount.toString(),
    currency,
  };

  instance.orders.create(options, (err, data) => {
    if (err) {
      res.status(500).json({ name: "error", err });
    }
    res.status(200).json({ name: "success", data });
  });
}
export default handler;
