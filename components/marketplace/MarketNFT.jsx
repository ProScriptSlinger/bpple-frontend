"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useShyft } from "@/context/shyftContext";
import Link from "next/link";

const MarketNFT = (props) => {
  const router = useRouter();
  const { setSelectedNFT } = useShyft();
  const item = props.item;
  // useEffect(() => {
  //   if (!loading1 && !loading2 && !loading3 && !loading4) {
  //     setLoading(false);
  //   }
  // }, [loading1, loading2, loading3, loading4]);
  return (
    <>
      {/* {loading && (
        <div className="w-[200px] rounded-[12px] bg-[#191919] animate-pulse h-[210px]"></div>
      )} */}
      <Link href={`/marketplace/${item.nft_address}`}>
        <div
          className={`w-full flex-none relative hover:opacity-70 transition-all duration-100`}
          onClick={() => {
            setSelectedNFT(item);
          }}
        >
          <img
            src={item.nft.image_uri}
            width={0}
            height={0}
            alt=""
            className="w-[200px] h-[150px] aspect-[4/3] rounded-[18px] "
          />
          <div className="w-full h-[30%] bg-black absolute bottom-0 rounded-[18px] bg-opacity-25 backdrop-blur-[10px] flex items-center justify-center px-[20px]">
            <div className="w-full inline-flex justify-between items-center">
              <p>{item.nft.name}</p>
              <div className="inline-flex items-center">
                <div className="text-right mr-[5px]">
                  <p className="text-[9px]">{item.price} SOL</p>
                </div>
                <Image
                  src="/icon/sol.svg"
                  width={0}
                  height={0}
                  alt=""
                  className="w-[18px] h-auto"
                  priority={true}
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
export default MarketNFT;
