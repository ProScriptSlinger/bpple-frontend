"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useShyft } from "@/context/shyftContext";

const MyNFT = (props) => {
  const item = props.item;
  return (
    <>
      <div
        className={`w-full flex-none relative hover:opacity-70 transition-all duration-100`}
      >
        <img
          src={item.image_uri}
          width={0}
          height={0}
          alt=""
          className="w-full aspect-[4/3] rounded-[18px]"
        />
        <div className="w-full h-[30%] bg-black absolute bottom-0 rounded-[18px] bg-opacity-25 backdrop-blur-[10px] flex items-center justify-center px-[20px]">
          <div className="w-full inline-flex justify-between items-center">
            <p>{item.name}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default MyNFT;
