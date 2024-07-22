"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useShyft } from "@/context/shyftContext";
import { useUser } from "@/context/appContext";
const NewNFTS = dynamic(() => import("@/components/marketplace/MarketNFT"));

const Page = () => {
  const { fetchListings, activeNFTs } = useShyft();
  const { address, currentCommunity } = useUser();
  const [list, setList] = useState([]);

  const fetchNFTs = async () => {
    await fetchListings();
  };

  console.log("communities ------>", currentCommunity);

  useEffect(() => {
    address && fetchNFTs();
  }, [address]);

  useEffect(() => {
    currentCommunity && setList(currentCommunity?.nfts);
  }, [currentCommunity]);

  return (
    <>
      <div className="w-full h-full  mobile:px-[50px] px-[20px] pt-[30px] pb-[50px] overflow-auto prevent-select">
        <div className="flex justify-between">
          <p className="text-[20px]">Community&apos;s NFTs</p>
        </div>
        <div className="w-full mt-[20px] relative h-[250px] overflow-auto">
          <div className="w-full overflow-auto inline-flex gap-[10px] absolute">
            {/* {activeNFTs.map((item, index) => (
              <div key={index} className="flex flex-col gap-2 items-center">
                {list.includes(item.nft.mint) && <NewNFTS item={item} />}
              </div>
            ))} */}
          </div>
        </div>

        <div className="w-full h-[60px]"></div>
      </div>
    </>
  );
};
export default Page;
