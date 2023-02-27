import React, { useState } from "react";

const TransactionData = ({ item }) => {
  const [linkFetched, setLinkFetched] = useState({
    fetched: false,
    link: "",
  });


  const buyInvoiceApi = async (tx_id) => {
    const options = {
      url: `https://partners-staging.safegold.com/v1/transactions/${tx_id}/fetch-invoice`,
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer 38778d59d5e17cfadc750e87703eb5e2",
      },
    };
    try {
      let fetchResponse = await axios(options);
      console.log(fetchResponse);
      if (fetchResponse.status == 200) {
        setLinkFetched({ ...linkFetched, fetched: true, link: fetchResponse.data.link });
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  // const getInvoice = async () => {
  //   let response = await buyInvoiceApi(item.tx_id);
  //   if (response.name == "success") {
  //     setLinkFetched({ ...linkFetched, fetched: true, link: response.data });
  //   }
  // };

  if (item.type == "buy") {
    return (
      <div className="border-2 border-slate-400 rounded-xl flex flex-col gap-y-4 p-2">
        <div className="flex justify-between">
          <div className="flex flex-col gap-y-1">
            <h1 className="capitalize font-medium">{item.type} Gold</h1>
            <h1>Tx_Id - {item.tx_id}</h1>
            <h1>{item.tx_date}</h1>
          </div>
          <div className="flex flex-col gap-y-1 items-end">
            <h1>Gold - {item.gold_amount} gm</h1>
            <h1>Price (Pre Gst) - {item.pre_gst_buy_price}</h1>
            <h1>Total GST - {item.gst_amount}</h1>
            <h1>Total Amount - {item.buy_price}</h1>
          </div>
        </div>
        {linkFetched.fetched == false ? (
          <button
            className="border-2 bg-green-500 text-white rounded-xl"
            onClick={() => buyInvoiceApi(item.tx_id)}
          >
            Check Invoice
          </button>
        ) : (
          <a
            href={linkFetched.link}
            className="text-blue-600 self-center hover:underline"
            target={"_blank"}
          >
            Click Here
          </a>
        )}
      </div>
    );
  } else {
    return (
      <div className="border-2 border-slate-400 rounded-xl flex flex-col gap-y-4 p-2">
        <div className="flex justify-between">
          <div className="flex flex-col gap-y-1">
            <h1 className="capitalize font-medium">{item.type} Gold</h1>
            <h1>Tx_Id - {item.tx_id}</h1>
            <h1>{item.tx_date}</h1>
          </div>
          <div className="flex flex-col gap-y-1 items-end">
            <h1>Gold - {item.gold_amount} gm</h1>
            <h1>Total Amount - {item.sell_price}</h1>
          </div>
        </div>
        {linkFetched.fetched == false ? (
          <button
            className="border-2 bg-green-500 text-white rounded-xl"
            onClick={() => buyInvoiceApi(item.tx_id)}
          >
            Check Invoice
          </button>
        ) : (
          <a
            href={linkFetched.link}
            className="text-blue-600 self-center hover:underline"
            target={"_blank"}
          >
            Click Here
          </a>
        )}
      </div>
    );
  }
};

export default TransactionData;
