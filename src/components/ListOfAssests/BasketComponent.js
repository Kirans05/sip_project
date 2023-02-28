import React from "react";

const BasketComponent = ({ item }) => {
  return (
    <div className="w-full md:w-2/5 border-2 border-slate-400 rounded-2xl flex gap-x-5 p-4 items-center hover:cursor-pointer">
      <div className="w-1/4">
        <img src={item.image.small} alt={"basket Image"} />
      </div>
      <div className="flex flex-col gap-y-2">
        <h1 className="font-semibold text-lg">{item.name}</h1>
        <h1>{item.description.short}</h1>
        <div className="flex gap-x-2">
          <div className="flex">
            {item.constituents.map((con, index) => {
              if (index <= 3) {
                return (
                  <img
                    src={con.crypto.image.thumb}
                    alt={"constituents images"}
                  />
                );
              }
            })}
          </div>
          <h1>& {item.constituents.length - 4} more</h1>
        </div>
        <div className="flex justify-between">
            <div>
                <h1>Minimum Investment</h1>
                <h1>Rs {item.min_investment.amount}</h1>
            </div>
            <div>
                <h1>3Y CAGR</h1>
                <h1>{item.returns.annualized['3Y']}%</h1>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BasketComponent;
