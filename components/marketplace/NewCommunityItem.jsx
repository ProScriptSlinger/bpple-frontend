import React, { useEffect } from "react";
import Image from "next/image";
import { BlueBtn } from "../home/Trending/Item";
import { getNameInitials } from "@/utils/functions/getNameInitials";
const NewCommunityItem = (props) => {
  const { item, isLoading } = props;
  useEffect(() => console.log(props.item));
  return (
    <>
      <button className="w-full h-[60px] bg-[#181818] inline-flex justify-between px-[40px] mb-[20px] rounded-[12px] min-w-[600px] items-center hover:bg-opacity-70">
        <div className="inline-flex items-center">
          <p className="w-8">{props.index + 1}</p>
          {item?.avatar ? (
            <Image
              src={item?.avatar}
              width={0}
              height={0}
              alt=""
              className="w-[40px] ml-[30px] rounded-md"
            />
          ) : (
            <div
              className="w-[40px] h-[40px] ml-[30px] rounded-md aspect-square
             bg-[#222222] flex items-center justify-center
              text-[#4C4C4C] text-[30px]"
            >
              {getNameInitials(item?.name ?? "B")}
            </div>
          )}
          <p className="text-[12px] ml-[10px]">{item?.name}</p>
        </div>
        <div className="inline-flex items-center gap-[15px]">
          <div>
            <div className="inline-flex items-center">
              <div>
                <Image
                  src="/icon/sol.svg"
                  width={0}
                  height={0}
                  alt=""
                  className="w-[7px] h-auto"
                />
              </div>
              <p className="text-[10px] ml-[5px]">200k</p>
            </div>
            <p className="text-[7px] text-[#6D6D6D]">Total volume</p>
          </div>
          <div>
            <div className="inline-flex items-center">
              <Image
                src="/icon/sol.svg"
                width={0}
                height={0}
                alt=""
                className="w-[7px] h-auto"
              />
              <p className="text-[10px] ml-[5px]">334.1k</p>
            </div>
            <p className="text-[7px] text-[#6D6D6D]">Floor price</p>
          </div>
          <div>
            <div className="inline-flex items-center">
              <Image
                src="/icon/sol.svg"
                width={0}
                height={0}
                alt=""
                className="w-[7px] h-auto"
              />
              <p className="text-[10px] ml-[5px]">200k</p>
            </div>
            <p className="text-[7px] text-[#6D6D6D]">Total volume</p>
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
      </button>
    </>
  );
};
export default NewCommunityItem;
