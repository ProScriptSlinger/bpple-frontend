"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSettingModal } from "@/context/communitysetting";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useShyft } from "@/context/shyftContext";
import Link from "next/link";

const NFT = ({ params: { id } }) => {
  const router = useRouter();
  const { nftListModal, nftUnListModal, setNftListModal, setNftUnListModal } =
    useSettingModal();
  const { network, activeNFTs, readNFT, setColId, burnNFT } = useShyft();
  const [NFT, setNFT] = useState({
    name: "",
    cached_image_uri: "",
    description: "",
    symbol: "",
    owner: "",
    mint: "",
    royalty: 0,
  });
  const [active, setActive] = useState(false);
  const [isBurning, setBurning] = useState(false);

  const getNFT = async (id) => {
    const res = await readNFT(id);
    activeNFTs.map((one) => {
      if (one.nft_address === res.mint) {
        setActive(true);
        return;
      }
    });
    console.log("Read NFT Res ------->", res);
    setNFT(res);
  };

  useEffect(() => {
    if (id) getNFT(id);
  }, [id]);

  const handleBurnNFT = async () => {
    setBurning(true);
    await burnNFT();
    setBurning(false);
    router.back();
  };

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
                <p className="text-[25px] ml-[20px]">{NFT.name}</p>
              </button>
            </div>
          </div>
          <div className="w-full pb-[30px] overflow-auto h-full">
            <div className="w-full flex flex-col justify-center items-center overflow-auto gridWidth:h-full gap-[30px]">
              <div className="gridWidth:flex gridWidth:flex-row gridWidth:gap-[40px] overflow-auto">
                <div className="flex flex-col gap-[30px] w-[380px] flex-none justify-between mb-[50px] gridWidth:mb-0">
                  <div className="w-full flex-1">
                    <img
                      src={NFT.cached_image_uri}
                      className="rounded-[32px]"
                    />
                  </div>
                  <div className="w-full inline-flex items-center justify-center">
                    <button className="inline-flex items-center">
                      <img
                        width={0}
                        height={0}
                        alt=""
                        src={"/avatar/21.png"}
                        className="w-[45px] h-auto rounded-[8px]"
                      />
                      {/* <div className="ml-[20px] text-left">
                        <p>SOFT COQ INU</p>
                      </div> */}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 h-full gridWidth:w-[500px] w-[380px] overflow-auto px-[20px]">
                  <h6 className="font-bold text-[16px]">Description</h6>
                  <p className="col-span-2">{NFT.description}</p>

                  <h6 className="font-bold text-[16px]">Symbol</h6>
                  <p className="col-span-2">{NFT.symbol}</p>

                  <h6 className="font-bold text-[16px]">Details</h6>
                  <div className="col-span-2 grid grid-cols-3 gap-[10px]">
                    <div>Royalty</div>
                    <div className="col-span-2">{NFT.royalty}</div>

                    <div>Mint Address</div>
                    <div
                      className="col-span-2"
                      style={{ wordWrap: "break-word" }}
                    >
                      <a
                        href={`https://explorer.solana.com/address/${NFT.mint}?cluster=${network}`}
                        target="_blank"
                        className="no-decor"
                        rel="noreferrer"
                      >
                        {NFT.mint}
                      </a>
                    </div>

                    <div>Owner Address</div>
                    <div
                      className="col-span-2"
                      style={{ wordWrap: "break-word" }}
                    >
                      <a
                        href={`https://explorer.solana.com/address/${NFT.owner}?cluster=${network}`}
                        target="_blank"
                        className="no-decor"
                        rel="noreferrer"
                      >
                        {NFT.owner}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <button
                  className={`w-[130px] h-[45px] flex justify-center items-center rounded-full border border-[#3772FF] text-[#3772FF] mr-[10px] ${
                    !nftListModal && "hover:bg-[#3772FF] hover:text-white"
                  } `}
                  onClick={() => {
                    active
                      ? setNftUnListModal(!nftUnListModal)
                      : setNftListModal(!nftListModal);
                  }}
                  disabled={nftListModal || nftUnListModal}
                >
                  {nftListModal || nftUnListModal ? (
                    <AiOutlineLoading3Quarters
                      size={24}
                      className=" animate-spin"
                    />
                  ) : active ? (
                    "Unlist"
                  ) : (
                    "List"
                  )}
                </button>
                <button
                  className={`w-[130px] h-[45px] flex justify-center items-center rounded-full border border-[#3772FF] text-white mr-[10px] ${
                    !isBurning && "hover:bg-[#3772FF] hover:text-white"
                  } `}
                  onClick={() => handleBurnNFT()}
                  disabled={isBurning}
                >
                  {isBurning ? (
                    <AiOutlineLoading3Quarters
                      size={24}
                      className=" animate-spin"
                    />
                  ) : (
                    "Burn"
                  )}
                </button>
                {!NFT?.collection?.address && (
                  <Link href="/create-nft?nftType=add-nft">
                    <div
                      className={`w-[130px] h-[45px] flex justify-center items-center rounded-full border border-[#3772FF] text-[#3772FF] mr-[10px] ${"hover:bg-[#3772FF] hover:text-white"} `}
                      onClick={() => setColId(id)}
                      // disabled={nftListModal || nftUnListModal}
                    >
                      Add NFT
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default NFT;
