import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "../../src/components/Header/Header";
import Sidebar from "../../src/components/Sidebar/Sidebar";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
// import { FaRupeeSign } from "react-icons/fa";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar, Bubble, Scatter, Doughnut } from "react-chartjs-2";
import supabase from "../../src/Config/supabaseClient";
import { MainUseContext } from "../../src/context/MainUseContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AssestsIndividual = () => {
  const coinId = useRouter().query.AssestsIndividual;
  const storeState = useContext(MainUseContext);
  let { individualAssestsContext } = storeState;
  let {updateindividualAssestData, individualAssestData} = individualAssestsContext
  const [optionSelected, setOptionSelected] = useState("overview");
  const chartRef = useRef();

  const [chartOptions, setChartOptions] = useState({
    chart: {
      zoomType: "xy",
      backgroundColor: "black",
    },
    xAxis: [
      {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        crosshair: true,
        tickLength: 0,
      },
    ],
    yAxis: [
      {
        // Primary yAxis
        labels: {
          format: "{value} ",
          style: {
            color: "green",
          },
        },
        title: {
          text: "Vest",
          style: {
            color: "green",
          },
        },
      },
      {
        // Secondary yAxis
        title: {
          text: "S&P500",
          style: {
            color: "red",
          },
        },
        labels: {
          format: "{value} ",
          style: {
            color: "red",
          },
        },
        opposite: true,
      },
    ],
    tooltip: {
      shared: true,
    },
    legend: {
      align: "left",
      x: 80,
      verticalAlign: "top",
      y: 80,
      floating: true,
      backgroundColor: "rgba(255,255,255,0.25)",
    },
    series: [
      {
        type: "spline",
        yAxis: 1,
        data: [
          27.6, 28.8, 21.7, 34.1, 29.0, 28.4, 45.6, 51.7, 39.0, 60.0, 28.6,
          32.1,
        ],
        tooltip: {
          valueSuffix: "",
        },
        color: "red",
      },
      {
        type: "spline",
        data: [
          -13.6, -14.9, -5.8, -0.7, 3.1, 13.0, 14.5, 10.8, 5.8, -0.7, -11.0,
          -16.4,
        ],
        tooltip: {
          valueSuffix: "",
        },
        color: "green",
      },
    ],
  });

  const [DognutData, setDognutData] = useState({
    labels: [],
    datasets: [
      {
        label: "All Others: 100.00%",
        data: ["100"],
        hoverOffset: 4,
        backgroundColor: "rgb(107,133,189)",
      },
    ],
  });

  const DognutOptions = {
    elements: {
      arc: {
        weight: 0.5,
        borderWidth: 3,
      },
    },
    cutout: 10,
    radius: 90,
    circumference: 360,
  };

  const fetchIndividualAssest = async () => {
    try {
      let fetchResponse = await supabase
        .from("new_assests_table")
        .select("*")
        .eq("id", coinId);
        console.log(fetchResponse)
  
      if (fetchResponse.status == 200) {
        updateindividualAssestData(fetchResponse.data[0])
            let filterXAxisValues = fetchResponse.data[0].graph_1W.returns.map((item) => {
              return item.date.substring(0, 10);
            });
      
            let filterYaxisStockValue = fetchResponse.data[0].graph_1W.returns.map(
              (item) => {
                return parseFloat(item.vest);
              }
            );
      
            let filterYaxisS_P_500Value = fetchResponse.data[0].graph_1W.returns.map(
              (item) => {
                return parseFloat(item["sp500"]);
              }
            );
      
            setChartOptions({
              ...chartOptions,
              xAxis: [{ ...chartOptions.xAxis[0], categories: filterXAxisValues }],
              series: [
                { ...chartOptions.series[0], data: filterYaxisStockValue },
                { ...chartOptions.series[1], data: filterYaxisS_P_500Value },
              ],
            });
      }
  
  
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    fetchIndividualAssest();
  }, []);

  return (
    <div className="w-full flex flex-row">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="p-2 pt-6 md:p-6 flex flex-col md:flex-row w-full flex-wrap gap-x-10 gap-y-10 mb-12">
        {individualAssestData.individualAssest == "" ? null : (
            <div className="flex flex-col gap-y-5 w-full">
              <div className="flex flex-col md:flex-row justify-between gap-y-4">
                <div className="flex gap-x-3">
                  <img
                    src={
                      "https://assets.coingecko.com/coins/images/325/small/Tether.png?1668148663"
                    }
                    alt={"assest Image"}
                  />
                  <div>
                    <h1 className="font-semibold">{individualAssestData.individualAssest.ticker}</h1>
                    <h1>{individualAssestData.individualAssest.name}</h1>
                  </div>
                </div>
                <div className="flex flex-row justify-between md:flex-col items-start md:items-end">
                  <div className="flex items-center">
                    {/* <FaRupeeSign /> */}
                    <h1>{individualAssestData.individualAssest.price}</h1>
                  </div>
                  <h1
                    className={
                      individualAssestData.individualAssest.change.toString().startsWith("-")
                        ? `text-red-500`
                        : `text-green-500`
                    }
                  >
                    {individualAssestData.individualAssest.change} ({individualAssestData.individualAssest.changePercent}
                    %)
                  </h1>
                </div>
              </div>
              <div className="flex gap-x-5">
                {individualAssestData.individualAssest.tabs.map((item, index) => {
                  return (
                    <h1
                      key={index}
                      onClick={() => setOptionSelected(item)}
                      className={
                        optionSelected == item
                          ? `border-b-2 border-slate-500 hover:cursor-pointer font-semibold`
                          : `border-b-2 border-white hover:cursor-pointer font-semibold`
                      }
                    >
                      {item.toUpperCase()}
                    </h1>
                  );
                })}
              </div>
              {optionSelected == "overview" ? (
                <div className="flex flex-col gap-y-4">
                  <h1 className="font-semibold">Performance</h1>
                  <div>
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={chartOptions}
                      constructorType="chart"
                      ref={chartRef}
                    />
                  </div>
                  <div className="flex flex-col gap-y-4">
                    <h1 className="font-semibold">
                      ABOUT {individualAssestData.individualAssest.name.toUpperCase()}
                    </h1>
                    <h1>{individualAssestData.individualAssest.description}</h1>
                    <div className="flex flex-col">
                      <h1 className="font-semibold">52-WEEK RANGE</h1>
                      <div className="flex gap-x-5">
                        <h1>${individualAssestData.individualAssest.summary[0].raw.low}</h1>
                        {/* <Slider
                          defaultValue={99.11}
                          step={10}
                          marks
                          min={91.18}
                          max={99.11}
                          disabled
                        /> */}
                         <h1>${individualAssestData.individualAssest.summary[0].raw.high}</h1>
                      </div>
                    </div>
                    <div className="flex w-full md:w-1/2 justify-between">
                      {individualAssestData.individualAssest.summary.map((item, index) => {
                        if (index > 0) {
                          return (
                            <div key={index}>
                              <h1 className="font-semibold">{item.label}</h1>
                              <h1>{item.value}</h1>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div> 

                   sector 
                   <div className=" flex flex-col">
                    <h1 className="font-semibold">SECTOR BREAKDOWN</h1>
                    <div className="w-full md:w-1/3 self-center h-80">
                      <Doughnut data={DognutData} options={DognutOptions} />
                    </div>
                  </div> 

                   largest holding 
                   <div className="flex flex-col gap-y-3 w-full">
                    <h1 className="font-semibold">LARGEST HOLDINGS</h1>
                    <div className="flex flex-col gap-y-2">
                      {individualAssestData.individualAssest.holdings.map((item, index) => {
                        return (
                          <div key={index} className="flex justify-between">
                            <h1>{item.name}</h1>
                            <h1>{item.assetsPercent}%</h1>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full flex flex-col gap-y-2">
                  <h1 className="font-semibold">Returns</h1>
                  <table className="w-full border-2">
                    <thead>
                      <tr>
                        <th align="center" className="border-2">
                          TimeFrame
                        </th>
                        <th align="center" className="border-2">
                          {individualAssestData.individualAssest.ticker}
                        </th>
                        <th align="center" className="border-2">
                          S&P500
                        </th>
                      </tr>
                    </thead>
                    <tbody className="border-2">
                      {individualAssestData.individualAssest.returns.timeFrames.value.map(
                        (item, index) => {
                          return (
                            <tr
                              key={index}
                              className="border-2 hover:cursor-pointer"
                            >
                              <td align="center" className="border-2">
                                {item.label}
                              </td>
                              <td align="center" className="border-2">
                                {
                                  individualAssestData.individualAssest.returns.current.value[
                                    item.key
                                  ].value
                                }
                              </td>
                              <td align="center" className="border-2">
                                {
                                  individualAssestData.individualAssest.returns.sp500.value[item.key]
                                    .value
                                }
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </div>
              )}
              <button className="bg-green-500 text-white w-full md:w-1/2 self-center fixed bottom-3 mt-4 h-8 rounded-2xl">
                Invest Now
              </button>
            </div> 
           )}
        </div>
      </div> 
    </div>
  );
};

export default AssestsIndividual;
