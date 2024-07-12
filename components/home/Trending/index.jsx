"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";

const TrendingItem = dynamic(() => import("@/components/home/Trending/Item"));

export const FontBtn = (props) => {
  const { content } = props;
  return (
    <div className="text-[#898989] text-[15px] cursor-pointer hover:text-[#e2e2e2]">
      {content}
    </div>
  );
};

const recommendList = [
  { image: "/home/trending/tr_1.svg" },
  { image: "/home/trending/tr_2.svg" },
  { image: "/home/trending/tr_3.svg" },
  { image: "/home/trending/tr_4.svg" },
];

const Trending = () => {
  const [closeShow, setCloseShow] = useState(true);
  const handleClose = () => {
    setCloseShow(false);
  };

  return (
    <div className="w-full mt-[20px] relative">
      <div className="w-full flex justify-between items-end">
        <div className="text-[40px]">Trending</div>
        <FontBtn content={"View All"} />
      </div>
      <div className="overflow-auto w-full inline-flex mt-[20px] relative">
        <div className="w-full overflow-auto flex flex-wrap gap-8">
          {recommendList.map((item, index) => (
            <TrendingItem bg_uri={item.image} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Trending;
