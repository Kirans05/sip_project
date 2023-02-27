import { useRouter } from "next/router";
import React from "react";
import { FaRupeeSign } from "react-icons/fa";

const AssestsComponent = ({ item }) => {
  const router = useRouter();
  const coinClicked = () => {
    router.push(`AssestsIndividual/${item.id}`);
  };
  return (
    <div
      className="border-2 border-slate-400 w-full md:w-3/4 rounded-2xl p-4 flex flex-col md:flex-row justify-between hover:cursor-pointer gap-y-2"
      onClick={coinClicked}
    >
      <div className="flex gap-x-4">
        <div className="">
          <img
            src={
              "https://assets.coingecko.com/coins/images/325/small/Tether.png?1668148663"
            }
            alt={"Assest Image"}
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <h1>{item.ticker}</h1>
          <h1>{item.name}</h1>
        </div>
      </div>
      <div className="flex flex-row md:flex-col gap-x-2 md:gap-y-1 justify-between md:items-end ">
        <h1>{item.type}</h1>
        <div className="flex items-center">
          <FaRupeeSign />
          <h1>{item.price}</h1>
        </div>
      </div>
    </div>
  );
};

export default AssestsComponent;
