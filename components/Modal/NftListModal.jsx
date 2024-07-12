"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useSettingModal } from "@/context/communitysetting";
import signAndConfirmTransaction from "@/lib/signAndConfirmTransaction";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useShyft } from "@/context/shyftContext";

const NftListModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { nftListModal, setNftListModal } = useSettingModal();
  const pathName = usePathname();
  const { listNFT } = useShyft();
  const [price, setPrice] = useState(0);

  const handleList = async () => {
    setIsLoading(true);
    const res = await listNFT(price);
    setPrice(0);
    setIsLoading(false);
    setNftListModal(false);
  };

  return (
    <>
      <div
        className={`${
          nftListModal && pathName.includes("/nfts/") ? "w-[400px]" : "w-0"
        } flex flex-none h-full bg-[#171717] transition-all duration-500 overflow-auto modalWidth:static absolute right-0 z-20 prevent-select`}
      >
        <div className="w-[400px] h-full relative overflow-auto px-[30px] pb-[50px] flex-none flex">
          <div className="w-[340px] h-full overflow-auto flex-none">
            <button
              onClick={() => setNftListModal(false)}
              className="mt-[60px]"
            >
              <Image
                src="/icon/back_bgwhite.svg"
                width={0}
                height={0}
                alt=""
                className="w-[30px] h-auto"
              />
            </button>
            <div className="w-full flex justify-center mt-[180px] relative">
              <Image
                src="/icon/sol.svg"
                width={0}
                height={0}
                alt=""
                className="w-[20px] h-auto absolute left-[96px] top-[12px]"
              />
              <input
                className="py-[10px] w-[180px] outline-none bg-[#252525] px-[50px] text-[14px] rounded-[12px] placeholder:text-[#4C4C4C] placeholder:text-[12px]"
                placeholder="Price"
                onChange={(e) => setPrice(Number(e.target.value))}
              />
              <p className="absolute top-[8px] right-[90px] text-[#3772FF]">
                SOL
              </p>
            </div>
            <p className="w-full text-center text-[14px] mt-[100px]">
              Are you sure you want to List <br /> for {price || 0} SOL?
            </p>
            <button
              className="w-full h-[40px] bg-[#3772FF] text-black font-bold rounded-full text-[13px] mt-[80px] flex justify-center items-center"
              onClick={handleList}
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters
                  size={24}
                  className=" animate-spin"
                />
              ) : (
                "Confirm"
              )}
            </button>
            <button
              className="w-full h-[40px] border-[1px] border-[#3772FF] text-[#3772FF] font-bold rounded-full text-[13px] mt-[20px]"
              onClick={() => {
                setNftListModal(false);
                setIsLoading(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default NftListModal;
