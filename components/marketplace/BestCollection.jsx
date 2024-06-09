"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const BestCollection = (props) => {
  const router = useRouter();

  const { nft, isMine } = props;
  console.log("nft ------>", nft);
  return (
    <>
      <button
        className={`w-[200px] relative flex-none mb-[20px] min-h-[150px] hover:opacity-70`}
        onClick={() => {
          router.push(`/nfts/${nft.mint}`);
        }}
      >
        <img
          src={nft.image_uri}
          width={0}
          height={0}
          alt={nft.name}
          className="w-[200px] min-h-[150px]"
        />
        <div className="w-full h-[50%] bg-black absolute bottom-0 rounded-[25px] bg-opacity-25 backdrop-blur-[10px] flex-row">
          <div className="w-full flex justify-center mt-[-45px]">
            {isMine !== true && (
              <Image
                src={"/avatar/18.svg"}
                width={0}
                height={0}
                alt=""
                className="w-[70px] h-auto"
                priority={true}
                onLoad={() => setLoading2(false)}
              />
            )}
          </div>
          <p className={`text-center ${isMine && "mt-[70px]"}`}>{nft.name}</p>
          <p className="text-center text-[10px]">{`${nft.count} NFTs`}</p>
        </div>
      </button>
    </>
  );
};
export default BestCollection;
