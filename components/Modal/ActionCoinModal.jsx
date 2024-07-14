import { ImCross } from "react-icons/im";
import Image from "next/image";
import { RangePicker } from "./NewCommunityModal";
import { useEffect } from "react";

const BuyCoinModal = ({ setModalOpen, modalType }) => {
  return (
    <div>
      <div className=" z-50 text-[14px] bg-[] w-full font-ttfirs fixed  top-0 right-0 h-screen flex items-center justify-center">
        <div className=" bg-[#22252D]/90  z-0 text-[14px] w-full font-ttfirs fixed  top-0 right-0 h-screen flex items-center justify-center " />
        <div className=" w-full z-2 max-w-[350px] p-4 mx-auto bg-[#171717] backdrop-blur-xl  rounded-3xl  border  border-[#393939]">
          <div className="w-full flex justify-end">
            <button
              onClick={() => {
                setModalOpen(false);
              }}
            >
              <Image
                width={0}
                height={0}
                className="w-[20px]"
                src={"/community/icons/close-modal.svg"}
              />
            </button>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <Image
              width={0}
              height={0}
              className="w-[100px] my-4 mt-8"
              src={"/community/icons/featured-pepe.svg"}
            />
            <p className="text-white font-bold text-[20px] my-6">
              {modalType == "buy"
                ? "You’re buying PEPECOIN"
                : "You own 167K $PEPE"}
            </p>
          </div>
          <div className="relative my-2">
            <input
              className="w-full h-[50px] px-4 pr-6 bg-black bg-opacity-30 rounded-xl border-2 border-[#2A2A2A] pt-2 pb-1.5 text-white outline outline-0 placeholder:font-ttfirs focus:border-[#3772FF] focus:outline-0 placeholder-[#9D9D9D] placeholder:text-[14px]"
              placeholder="Amount"
              // onChange={handleName}
            ></input>
            <p className="absolute text-[#FCFCF9] text-[15px] bold text-center right-2 top-4">
              PEPE
            </p>
          </div>
          <RangePicker label="485$ ( 13 SOL)" />
          <div className="relative mt-4">
            <input
              className="w-full h-[50px] px-4 pr-6 bg-black bg-opacity-30 rounded-xl border-2 border-[#2A2A2A] pt-2 pb-1.5 text-white outline outline-0 placeholder:font-ttfirs focus:border-[#3772FF] focus:outline-0 placeholder-[#9D9D9D] placeholder:text-[14px]"
              placeholder="Slippage"
              // onChange={handleName}
            ></input>
            <p className="absolute text-[#FCFCF9] text-[15px] bold text-center right-2 top-4">
              SOL
            </p>
          </div>
          <div className="relative mt-4">
            <input
              className="w-full h-[50px] px-4 pr-6 bg-black bg-opacity-30 rounded-xl border-2 border-[#2A2A2A] pt-2 pb-1.5 text-white outline outline-0 placeholder:font-ttfirs focus:border-[#3772FF] focus:outline-0 placeholder-[#9D9D9D] placeholder:text-[14px]"
              placeholder="Priority Fees"
              // onChange={handleName}
            ></input>
            <p className="absolute text-[#FCFCF9] text-[15px] bold text-center right-2 top-4">
              SOL
            </p>
          </div>
          <div className="border-b-2 border-[#2A2A2A] w-full mt-4" />
          <div className="flex justify-between w-full mt-4">
            <p className="text-[#777E90] text-[16px]">
              {modalType == "buy" ? "You will pay" : "You will receive"}
            </p>
            <p className="text-white text-[16px]">13.33 SOL</p>
          </div>
          <button
            className={`${
              modalType == "buy" ? "bg-[#3772FF]" : "bg-[#FF3331]"
            } flex justify-center items-center rounded-lg p-2 w-full mt-8`}
          >
            <div className="flex gap-2 font-semibold">
              <p className="text-white text-[15px]">
                {modalType == "buy" ? "Swap" : "Sell"}
              </p>
              <Image
                src={"/community/icons/arrow-right.svg"}
                alt="right-arrow"
                width={0}
                height={0}
                className="w-[20px]"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyCoinModal;
