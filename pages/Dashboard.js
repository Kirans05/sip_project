import React, { useContext, useEffect, useRef, useState } from "react";
import BottomMenu from "../src/components/BottomMenu/BottomMenu";
import Header from "../src/components/Header/Header";
import Sidebar from "../src/components/Sidebar/Sidebar";
import { BiRupee } from "react-icons/bi";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { useRouter } from "next/router";
import { MainUseContext } from "../src/context/MainUseContext";
import supabase from "../src/Config/supabaseClient";

const Dashboard = () => {
  const router = useRouter();
  const storeState = useContext(MainUseContext);
  let { userDetailsContext, dashboardContext } = storeState;
  let { updateUserId } = userDetailsContext;
  let { updateDashboardImage, dashboardData } = dashboardContext;
  const chartRef = useRef();
  const [chartOptions, setChartOptions] = useState({
    chart: {
      zoomType: "y",
      backgroundColor: "orange",
    },
    title: {
      text: "OwnerShip Growth",
      style: {
        color: "white",
      },
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
        // crosshair: true,
        tickLength: 0,
        visible: false,
      },
    ],
    yAxis: {
      type: "logarithmic",
      labels: {
        format: "{value} ",
        style: {
          color: "red",
        },
      },
      title: {
        text: "Ownership Growth",
        style: {
          color: "red",
        },
      },
      visible: false,
      // crosshair: true
    },
    tooltip: {
      headerFormat: "<b>{series.name}</b><br />",
      pointFormat: "x = {point.x}, y = {point.y}",
      formatter: function () {
        return "Assests Purchased on <b>" + this.x + "</b> for <b>" + this.y;
      },
    },
    series: [
      {
        data: [
          27.6, 28.8, 21.7, 34.1, 29.0, 28.4, 45.6, 51.7, 39.0, 60.0, 28.6,
          32.1,
        ],
        pointStart: 1,
        type: "spline",
        name: "OwnerShip Growth",
        allowPointSelect: true,
        color: "black",
      },
    ],
  });

  const fetchImages = async () => {
    try {
      let fetchResponse = await supabase.from("images_table").select("*");
      if (fetchResponse.error) {
      }

      if (fetchResponse.data) {
        updateDashboardImage(fetchResponse.data);
      }
    } catch (err) {}
  };

  const fetchChartData = async (userId) => {
    try {
      let fetchResponse = await supabase
        .from("coins_table")
        .select("*")
        .eq("id", userId);
      console.log(fetchResponse);
      if (fetchResponse.error) {
      }

      if (fetchResponse.data) {
        let filterXAxisValues = fetchResponse.data.map((item) => {
          return item.created_at.substring(0, 10);
        });

        let filteryAxisValues = fetchResponse.data.map((item) => {
          return item.price_purchased;
        });

        setChartOptions({
          ...chartOptions,
          xAxis: [{ ...chartOptions.xAxis[0], categories: filterXAxisValues }],
          series: [{ ...chartOptions.series[0], data: filteryAxisValues }],
        });
      }
    } catch (err) {}
  };

  const checkUserKycStatus = async (userId) => {
    try {
      let fetchResponse = await supabase
        .from("profiles")
        .select("sumsub_kyc_id, sumsub_kyc_status")
        .eq("id", userId);

      if (fetchResponse.error) {
      }

      if (fetchResponse.data[0].sumsub_kyc_status != "completed") {
        router.push("/WebSdk");
      }
    } catch (err) {}
  };

  useEffect(() => {
    checkUserKycStatus(
      JSON.parse(localStorage.getItem("sb-ziaxsvytbaahgjrompdd-auth-token"))
        .user.id
    );
  }, []);

  useEffect(() => {
    updateUserId(
      JSON.parse(localStorage.getItem("sb-ziaxsvytbaahgjrompdd-auth-token"))
        .user.id
    );
    fetchImages();
    fetchChartData(
      JSON.parse(localStorage.getItem("sb-ziaxsvytbaahgjrompdd-auth-token"))
        .user.id
    );
  }, []);

  return (
    <div className="w-full flex flex-row">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="p-2 pt-6 md:p-6 flex flex-col w-full gap-y-10 mb-20">
          {/* ownership graph */}
          <div className="w-full">
            <HighchartsReact
              highcharts={Highcharts}
              options={chartOptions}
              constructorType="chart"
              ref={chartRef}
            />
          </div>

          {/* banner images */}
          <div className="w-full flex justify-between overflow-x-scroll md:overflow-hidden gap-x-5">
            {dashboardData.images.map((item, index) => {
              if (item.type == "Banners") {
                return (
                  <img
                    key={index}
                    src={item.url}
                    alt={"Banner Images"}
                    className="w-1/2 md:w-1/4 "
                  />
                );
              }
            })}
          </div>

          {/* explore assests, sip box and refer and earn box in one single div */}
          <div className="flex flex-col gap-y-10 md:flex-row md:gap-x-10">
            {/* explore assests */}
            <div className="border-2 border-slate-400 w-full md:w-1/3 rounded-2xl p-5 h-48 flex flex-col justify-between">
              <h1 className="text-lg md:text-xl">Explore Our Assests</h1>
              <button
                className="text-lg md:text-xl border-2 w-full rounded-xl bg-pink-700 text-white p-1"
                onClick={() => router.push("/Assests")}
              >
                Explore
              </button>
            </div>

            {/* sip box */}
            <div className="border-2 border-slate-400 w-full md:w-1/3 rounded-2xl p-5 h-48 flex flex-col justify-between">
              <div className="flex flex-col gap-y-1">
                <h1 className="text-lg md:text-xl">Start SIP for Assests</h1>
                <h1 className="text-sm md:text-md">
                  Invest in Assests or Coins on Weekly or Monthly basics
                </h1>
              </div>
              <div className="flex justify-between items-end">
                <button className="border-2 px-2 py-1 rounded-lg bg-violet-500 text-white">
                  START SIP
                </button>
                {dashboardData.images == 0 ? null : (
                  <>
                    {dashboardData.images.map((item, index) => {
                      if (item.type == "sip_image") {
                        return (
                          <img
                            key={index}
                            src={item.url}
                            alt={"sip image"}
                            className="w-1/5"
                          />
                        );
                      }
                    })}
                  </>
                )}
              </div>
            </div>

            {/* refer and earn box */}
            <div className="border-2 border-slate-400 w-full md:w-1/3 rounded-2xl p-5 h-48 flex flex-col justify-between">
              <div className="flex flex-col items-center gap-y-1">
                <h1 className="text-lg md:text-xl ">Refer And Earn</h1>
                <h1 className="flex items-center flex-wrap text-sm">
                  Invite Your Friends to Sipto and earn free Gold <BiRupee />{" "}
                  500
                </h1>
              </div>
              <button className="border-2 bg-fuchsia-600 text-white p-1 rounded-xl">
                INVITE NOW
              </button>
            </div>
          </div>

          {/* offers images */}
          <div className="w-full flex justify-between overflow-x-scroll md:overflow-hidden gap-x-5">
            {dashboardData.images.map((item, index) => {
              if (item.type == "explore_offers") {
                return (
                  <img
                    key={index}
                    src={item.url}
                    alt={"Explore offers Images"}
                    className="w-1/2 md:w-1/4 "
                  />
                );
              }
            })}
          </div>
        </div>

        {/* bottome menu */}
        <BottomMenu />
      </div>
    </div>
  );
};

export default Dashboard;
