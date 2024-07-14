"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import NFTListLoader from "../../components/marketplace/NFTListLoader";
import { useShyft } from "@/context/shyftContext";
import { useUser } from "@/context/appContext";
const BestCollection = dynamic(() =>
  import("../../components/marketplace/BestCollection")
);
const NewNFTS = dynamic(() => import("../../components/marketplace/MarketNFT"));
const NFTList = dynamic(() => import("../../components/marketplace/NFTList"), {
  ssr: false,
  loading: () => <NFTListLoader />,
});
const Page = () => {
  const { fetchListings, activeNFTs } = useShyft();
  const { address } = useUser();

  const fetchNFTs = async () => {
    await fetchListings();
  };
  useEffect(() => {
    address && fetchNFTs();
  }, [address]);
  return (
    <>
      <div className="w-full h-full  mobile:px-[50px] px-[20px] pt-[30px] pb-[50px] overflow-auto prevent-select">
        <div className="w-full h-full relative overflow-auto">
          <p className="text-[20px]">Best & Trends Collections</p>
          <div className="w-full h-[200px] overflow-auto">
            <div className="mt-[20px] w-full overflow-auto inline-flex gap-[15px] absolute">
              {/* {bestCollections.map((item, index) => (
                <div key={index}>
                  <BestCollection item={item} />
                </div>
              ))} */}
            </div>
          </div>
          <p className="text-[20px]">Explore New NFTs</p>
          <div className="w-full mt-[20px] relative h-[250px] overflow-auto">
            <div className="w-full overflow-auto inline-flex gap-[10px] absolute">
              {activeNFTs.map((item, index) => (
                <div key={index}>
                  <NewNFTS item={item} />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full inline-flex justify-between items-center">
            <p className="text-[20px]">Explore New NFTs</p>
            <div className="w-[150px] h-[40px] bg-[#2B2B2B] bg-opacity-65 rounded-[10px] flex items-center justify-center">
              <div>
                <Image
                  src="/icon/calendar.svg"
                  width={0}
                  height={0}
                  alt=""
                  className="w-[18px] mr-[10px]"
                />
              </div>
              <p className="text-[12px] mr-[7px]">Last 30 days</p>
              <div>
                <Image
                  src="/icon/dropdown_white.svg"
                  width={0}
                  height={0}
                  alt=""
                  className="w-[10px]"
                />
              </div>
            </div>
          </div>
          <div className="w-full mt-[20px] overflow-auto">
            {activeNFTs.map((item, index) => (
              <div key={index}>
                <NFTList item={item} index={index} />
              </div>
            ))}
          </div>
          <div className="w-full h-[60px]"></div>
        </div>
      </div>
    </>
  );
};
export default Page;
