"use client";
import React from "react";
import SliderLoader from "../../../components/home/Slider/loader";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../../../components/home/Slider"), {
  ssr: false,
  loading: () => <SliderLoader />,
});
const Trending = dynamic(
  () => import("@/components/home/Trending")
  // , {
  //   ssr: false,
  //   loading: () => <TrendingLoader />,
  // }
);
const NewLaunch = dynamic(
  () => import("../../../components/home/NewLaunch")
  // {
  //   ssr: false,
  //   loading: () => <NewLaunchLoader />,
  // }
);
const Home = () => {
  return (
    <>
      <div
        className="w-full mobile:px-[50px] px-[20px] h-full overflow-auto prevent-select"
        style={{ height: "var(--homemain-height)" }}
      >
        <Slider />
        <Trending />
        <NewLaunch />
      </div>
    </>
  );
};
export default Home;
