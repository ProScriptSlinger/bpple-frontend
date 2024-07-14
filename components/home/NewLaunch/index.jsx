"use client";
import React, { useState } from "react";
import Image from "next/image";
import { BlueBtn } from "../Trending/Item";
import { FontBtn } from "../Trending";

export const SpinBox = (props) => {
  const { checked } = props;
  const [isChecked, setChecked] = useState(checked);
  return (
    <div
      onClick={() => setChecked(!isChecked)}
      className={`w-[40px] h-[22px] rounded-full bg-[#3772FF] flex ${
        isChecked ? "justify-start" : "justify-end"
      } items-center p-[2px] cursor-pointer`}
    >
      <div className="w-[18px] h-[18px] rounded-full bg-white" />
    </div>
  );
};

export const LaunchItem = (props) => {
  const SolUnit = (props) => {
    const { unit, price } = props;
    return (
      <div className="flex items-start gap-2">
        <Image
          src={"/home/icons/sol_unit.svg"}
          width={0}
          height={0}
          alt=""
          className="w-[10px] mt-2 h-auto rounded-full"
          priority={true}
        />
        <div className="flex flex-col gap-1">
          <p className="lg:text-[16px] text-[12px]">{unit}</p>
          <p className="lg:text-[12px] text-[10px] text-[#6D6D6D]">{price}</p>
        </div>
      </div>
    );
  };
  return (
    <div className="rounded-2xl p-4 py-2 flex justify-between items-center  min-w-[680px] bg-[#252525]">
      <div className="flex items-center gap-2">
        <Image
          src={"/home/icons/fire 1.svg"}
          width={0}
          height={0}
          alt=""
          className="max-w-[34px] w-[100%] h-auto rounded-full"
          priority={true}
        />
        <div className="flex items-center gap-2 mx-4">
          <Image
            src={"/home/icons/ellipse.svg"}
            width={0}
            height={0}
            alt=""
            className="max-w-[50px] w-[100%] h-auto rounded-full"
            priority={true}
          />
          <p className="lg:text-[20px] text-[16px]">SLERF</p>
        </div>
        <Image
          src={"/home/icons/solscan.svg"}
          width={0}
          height={0}
          alt=""
          className="w-[16px] h-auto rounded-full"
          priority={true}
        />
        <Image
          src={"/home/icons/twitter.svg"}
          width={0}
          height={0}
          alt=""
          className="w-[16px] h-auto rounded-full"
          priority={true}
        />
      </div>
      <div className="flex items-center gap-4">
        <SolUnit price="500/5K$" unit="Volume" />
        <SolUnit price="750" unit="Txns " />
        <SolUnit price="1H" unit="Duration  " />
      </div>
      <div className="flex items-center gap-2">
        <BlueBtn width="140px" content="Quick Buy" />
        <BlueBtn
          content={
            <Image
              src="/home/icons/arrows-join2.svg"
              width={0}
              height={0}
              alt=""
              className="max-w-[20px] w-[70%] lg:w-[100%] h-auto rounded-full"
              priority={true}
            />
          }
        />
      </div>
    </div>
  );
};

const NewLaunch = () => {
  const [closeShow, setCloseShow] = useState(true);
  const handleClose = () => {
    setCloseShow(false);
  };
  return (
    <div className="w-full mt-[30px] lg:mt-[60px] relative">
      <div className="w-full flex justify-between items-center">
        <div className="text-[35px]">New Launch</div>
        <div className="flex gap-4  transition-all">
          <SpinBox />
          <FontBtn content="Refresh" />
        </div>
      </div>
      <div className="overflow-auto w-full flex flex-col gap-4 mt-[20px] relative">
        {/* <div className="w-full h-full absolute flex flex-col gap-2"> */}
        <LaunchItem />
        <LaunchItem />
        <LaunchItem />
        {/* </div> */}
      </div>
    </div>
  );
};
export default NewLaunch;
