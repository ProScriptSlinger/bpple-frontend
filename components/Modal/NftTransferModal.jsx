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
import { useUser } from "@/context/appContext";

const NftTransferModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { nftTransferModal, setNftTransferModal } = useSettingModal();
  const pathName = usePathname();
  const { address: walletID } = useUser();
  const { network, selectedNFT, transferNFT } = useShyft();
  const marketplaceAddress = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS;

  const [address, setAddress] = useState("");

  const handleTransfer = async () => {
    setIsLoading(true);
    if (address === "") {
      console.log("Wallet Address cannot be empty");
    } else {
      await transferNFT(address);
      setIsLoading(false);
      setNftTransferModal(false);
    }
  };

  return (
    <>
      <div
        className={`${
          nftTransferModal && pathName.includes("/transfer/")
            ? "w-[400px]"
            : "w-0"
        } flex flex-none h-full bg-[#171717] transition-all duration-500 overflow-auto modalWidth:static absolute right-0 z-20 prevent-select`}
      >
        <div className="w-[400px] h-full relative overflow-auto px-[30px] pb-[50px] flex-none flex">
          <div className="w-[340px] h-full overflow-auto flex-none">
            <button
              onClick={() => setNftTransferModal(false)}
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
                className="w-[20px] h-auto absolute left-[36px] top-[12px]"
              />
              <input
                className="py-[10px] w-[300px] outline-none bg-[#252525] px-[50px] text-[14px] rounded-[12px] placeholder:text-[#4C4C4C] placeholder:text-[12px]"
                placeholder="Wallet Address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <p className="w-full text-center text-[14px] mt-[100px]">
              Are you sure you want to Transfer <br /> to this address{" "}
              {address || ""} ?
            </p>
            <button
              className="w-full h-[40px] bg-[#3772FF] text-white font-bold rounded-full text-[13px] mt-[80px] flex justify-center items-center"
              onClick={handleTransfer}
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
                setNftTransferModal(false);
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
export default NftTransferModal;
