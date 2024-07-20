"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSettingModal } from "@/context/communitysetting";
import { useShyft } from "@/context/shyftContext";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const NFT = ({ params: { id } }) => {
  const router = useRouter();
  const { nftBuyModal, setNftBuyModal } = useSettingModal();
  const { network, readNFT, fetchListings, setSelectedNFT } = useShyft();
  const xKey = process.env.NEXT_PUBLIC_API_KEY.toString();
  const endPoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const [NFT, setNFT] = useState();
  const nftUrl = `${endPoint}nft/read`;
  const fetchNFT = async () => {
    const nftRes = await fetchListings(id);
    console.log("Listing NFT ------->", nftRes[0]);
    setNFT(nftRes[0]);
    setSelectedNFT(nftRes[0]);
  };
  useEffect(() => {
    fetchNFT();
  }, [nftUrl]);

  return (
    <>
      <div className="w-full h-full relative overflow-auto">
        <div className="w-full flex flex-col px-[50px] bg-[#121212] overflow-auto absolute h-full">
          <div className="w-full flex justify-center">
            <div className="mt-[30px] w-full inline-flex justify-between items-center mb-[30px]">
              <button
                className="inline-flex items-center"
                onClick={() => {
                  router.back();
                }}
              >
                <Image
                  src="/icon/back_bgwhite.svg"
                  width={0}
                  height={0}
                  alt=""
                  className="w-[40px] h-auto"
                />
                <p className="text-[25px] ml-[20px]">{NFT?.nft?.name}</p>
              </button>
            </div>
          </div>
          <div className="w-full pb-[30px] overflow-auto h-full">
            <div className="w-full flex flex-col justify-center items-center overflow-auto gridWidth:h-full gap-[100px]">
              <div className="gridWidth:flex gridWidth:flex-row gridWidth:gap-[40px] overflow-auto">
                <div className="flex flex-col gap-[30px] w-[380px] flex-none justify-between mb-[50px] gridWidth:mb-0">
                  <div className="w-full flex-1">
                    <img
                      src={NFT?.nft?.cached_image_uri}
                      className="rounded-[32px]"
                    />
                  </div>
                  <div className="w-full inline-flex items-center justify-center">
                    <button className="inline-flex items-center">
                      {/* <img
                        width={0}
                        height={0}
                        alt=""
                        src={"/avatar/21.png"}
                        className="w-[45px] h-auto rounded-[8px]"
                      /> */}
                      <div className="ml-[20px] text-left">
                        <p className="py-auto">NFT Image</p>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 h-full gridWidth:w-[500px] w-[380px] overflow-auto px-[20px]">
                  <h6 className="font-bold text-[16px]">Description</h6>
                  <p className="col-span-2">{NFT?.nft?.description}</p>

                  <h6 className="font-bold text-[16px]">Symbol</h6>
                  <p className="col-span-2">{NFT?.nft?.symbol}</p>

                  <h6 className="font-bold text-[16px]">Details</h6>
                  <div className="col-span-2 grid grid-cols-3 gap-[10px]">
                    <div>Price</div>
                    <div className="col-span-2">{NFT?.price}</div>
                    <div>Royalty</div>
                    <div className="col-span-2">{NFT?.nft?.royalty}</div>

                    <div>Mint Address</div>
                    <div
                      className="col-span-2"
                      style={{ wordWrap: "break-word" }}
                    >
                      <a
                        href={`https://explorer.solana.com/address/${NFT?.nft?.mint}?cluster=${network}`}
                        target="_blank"
                        className="no-decor"
                        rel="noreferrer"
                      >
                        {NFT?.nft?.mint}
                      </a>
                    </div>

                    <div>Owner Address</div>
                    <div
                      className="col-span-2"
                      style={{ wordWrap: "break-word" }}
                    >
                      <a
                        href={`https://explorer.solana.com/address/${NFT?.nft?.owner}?cluster=${network}`}
                        target="_blank"
                        className="no-decor"
                        rel="noreferrer"
                      >
                        {NFT?.nft?.owner}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className={`w-[130px] h-[45px] rounded-full border border-[#3772FF] text-[#3772FF] mr-[10px] flex justify-center items-center ${
                  !nftBuyModal && "hover:bg-[#3772FF] hover:text-white"
                } `}
                onClick={() => {
                  setNftBuyModal(!nftBuyModal);
                }}
                disabled={nftBuyModal}
              >
                {nftBuyModal ? (
                  <AiOutlineLoading3Quarters
                    size={24}
                    className=" animate-spin"
                  />
                ) : (
                  "Buy"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default NFT;
