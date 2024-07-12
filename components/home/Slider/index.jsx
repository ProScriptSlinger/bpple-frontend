"use client";
import React from "react";
import Image from "next/image";
const Slider = () => {
  return (
    <>
      <div className={`overflow-auto h-[250px] relative mt-[20px]`}>
        <div className="h-full bg-cover bg-center bg-[url('/home/slider_bg.svg')] rounded-[12px]">
          <p className="w-full inline-flex justify-center mt-[50px] mobile:text-[25px] text-[15px]">
            Search on Communities on Biples
          </p>
          <div className="w-full flex justify-center mt-[20px]">
            <div className="w-[50%] h-[45px] rounded-[10px] bg-[white] border border-[#4C4C4C] inline-flex items-center justify-center px-[20px]">
              <input
                className="ml-[12px] bg-transparent outline-none placeholder:text-[#4C4C4C] text-[#4C4C4C] text-[14px] flex items-center w-[100%]"
                placeholder="Explore Communities and members"
              />
              <Image
                src="/icon/search_grey.svg"
                width={0}
                height={0}
                alt=""
                className="w-[15px] mt-[-2px] h-auto"
              />
            </div>
          </div>
          {/* <div className="w-full flex justify-center mt-[15px]">
            <p className="mobile:w-[400px] w-[300px] text-center mobile:text-[12px] text-[8px] text-[#4C4C4C]">
              Explore all categories of communities, chat with friends
            </p>
          </div> */}
        </div>
      </div>
    </>
  );
};
export default Slider;
