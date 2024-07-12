"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useShyft } from "@/context/shyftContext";
import Link from "next/link";

export const BlueBtn = (props) => {
  const width = `w-[${props.width}]`;
  return (
    <div
      className={`bg-[#3772FF] ${
        props.width ? width : "w-fit"
      } flex justify-center p-1 rounded-full hover:bg-[#3771fad8]`}
    >
      {props.content}
    </div>
  );
};

const Item = (props) => {
  const router = useRouter();
  const { setSelectedNFT } = useShyft();
  const item = props;
  return (
    <>
      <Link href={`#`} className="">
        <div
          className={`w-full flex-none relative transition-all duration-100 min-w-[270px] `}
          onClick={() => {
            setSelectedNFT(item);
          }}
        >
          <img
            src={item.bg_uri}
            width={0}
            height={0}
            alt=""
            className="w-[270px] h-[300] rounded-[18px] "
          />
          <div className="w-[270px] h-[55%] bg-black absolute bottom-0 rounded-[18px] bg-opacity-50 backdrop-blur-[10px] flex p-2">
            <div className="flex flex-col w-full gap-1">
              <div className="w-full inline-flex items-center gap-1">
                <Image
                  src="/home/icons/bonk.jpg"
                  width={0}
                  height={0}
                  alt=""
                  className="w-[30px] h-auto rounded-full"
                  priority={true}
                />
                <div className="text-right mr-[5px]">
                  {/* <p className="text-[9px]">{item.price} SOL</p> */}
                  <p className="text-[20px]">BONK</p>
                </div>
              </div>

              <div className="w-full inline-flex justify-end items-center gap-1">
                <Image
                  src="/home/icons/chart.svg"
                  width={0}
                  height={0}
                  alt=""
                  className="w-[70px] h-auto rounded-full"
                  priority={true}
                />
              </div>
              <div className="w-full inline-flex justify-between items-center gap-1">
                <div className="w-fit px-2 py-1 rounded-full inline-flex items-center justify-center gap-1 bg-[#ffffff11]">
                  <Image
                    src="/home/icons/fire 1.svg"
                    width={0}
                    height={0}
                    alt=""
                    className="w-[15px] h-auto rounded-full"
                    priority={true}
                  />
                  <div className="text-right mr-[5px]">
                    {/* <p className="text-[9px]">{item.price} SOL</p> */}
                    <p className="text-[15px] font-sans">15/100K$</p>
                  </div>
                </div>
                <div className="w-fit p-1 flex gap-1">
                  <Image
                    src="/home/icons/trending-up.svg"
                    width={0}
                    height={0}
                    alt=""
                    className="w-[24px] h-auto rounded-full"
                    priority={true}
                  />
                  <p className="text-[12px] text-[#30E0A1] font-sans">55.90%</p>
                </div>
              </div>
              <div className="w-full inline-flex justify-between gap-2 items-center">
                <BlueBtn width="100%" content="Quick Buy" />
                <BlueBtn
                  content={
                    <Image
                      src="/home/icons/arrows-join2.svg"
                      width={0}
                      height={0}
                      alt=""
                      className="w-[24px] h-auto rounded-full"
                      priority={true}
                    />
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
export default Item;
