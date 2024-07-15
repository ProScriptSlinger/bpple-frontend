"use client";
import React from "react";
import SliderLoader from "../../components/home/Slider/loader";
import dynamic from "next/dynamic";
import RecommandLoader from "../../components/home/Trending/loader";
import LastCommunityLoader from "../../components/home/NewLaunch/loader";

const Slider = dynamic(() => import("../../components/home/Slider"), {
  ssr: false,
  loading: () => <SliderLoader />,
});

const Trending = dynamic(
  () => import("../../components/home/Trending")
  // {
  //   ssr: false,
  //   loading: () => <TrendingLoader />,
  // }
);

const Home = () => {
  return (
    <>
      <div className="w-full mobile:px-[50px] px-[20px] h-full overflow-auto prevent-select py-4">
        <Slider />
        <Trending />
      </div>
    </>
  );
};
export default Home;
