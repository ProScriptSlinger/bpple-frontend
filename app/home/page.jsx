"use client";
import React, { useEffect, useState } from "react";
import SliderLoader from "../../components/home/Slider/loader";
import dynamic from "next/dynamic";
import RecommandLoader from "../../components/home/Trending/loader";
import LastCommunityLoader from "../../components/home/NewLaunch/loader";
import { handleEndpoint } from "@/utils/api/handleEndpoint";

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
  const [newCommunities, setNewCommunities] = useState([]);
  const [isNewLoading, setNewLoading] = useState(false);
  const fetchCommunities = async () => {
    setNewLoading(true);
    const response = await handleEndpoint(
      null,
      `community/new-communities`,
      "get",
      null
    );
    console.log("Fetch new communities------>", response);
    setNewCommunities(response);
    setNewLoading(false);
  };

  useEffect(() => {
    fetchCommunities();
  }, []);
  return (
    <>
      <div className="w-full mobile:px-[50px] px-[20px] h-full overflow-auto prevent-select py-4">
        <Slider />
        <Trending newCommunities={newCommunities} isNewLoading={isNewLoading} />
      </div>
    </>
  );
};
export default Home;
