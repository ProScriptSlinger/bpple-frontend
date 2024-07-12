"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useShyft } from "@/context/shyftContext";
import { useUser } from "@/context/appContext";
import dynamic from "next/dynamic";
import Link from "next/link";
const MyNFT = dynamic(() => import("../../components/marketplace/MyNFT"));

const Marketplace = () => {
  const router = useRouter();
  const { fetchAllMyNFTs } = useShyft();
  const [NFTs, setNFTs] = useState([]);
  const { address } = useUser();
  const fetchNFTs = async () => {
    const res = await fetchAllMyNFTs();
    setNFTs(res);
  };
  useEffect(() => {
    address && fetchNFTs();
  }, [address]);

  return (
    <>
      <div className="w-full h-full bg-[#121212]">
        <div className="w-full h-full bg-[#121212] flex flex-col px-[50px] overflow-auto">
          <p className="text-[20px] mt-[20px]">Transfer NFTs between Wallets</p>

          <div className="w-full h-full mt-[30px] mb-[30px] overflow-auto relative">
            <div className="w-full flex-none grid grid-cols-4 gap-[30px] overflow-auto absolute max-h-full">
              {NFTs.map((nft) => (
                <Link key={nft.mint} href={`/transfer/${nft.mint}`}>
                  <div key={nft.mint} className="relative">
                    <MyNFT item={nft} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Marketplace;
