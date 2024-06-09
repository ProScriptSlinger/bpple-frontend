"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useShyft } from "@/context/shyftContext";
import dynamic from "next/dynamic";

const MyNFT = dynamic(() => import("@/components/marketplace/MyNFT"));

const CollectionNFTs = ({ params: { colId } }) => {
  const router = useRouter();
  const { getNFTsCollection, fetchListings } = useShyft();
  const [NFTs, setNFTs] = useState([]);
  const [listings, setListings] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const fetchNFTs = async () => {
    setLoading(true);
    const listingRes = await fetchListings();
    const mints = listingRes.map((one) => one.nft_address);
    setListings(mints);
    const res = await getNFTsCollection(colId);
    setNFTs(res);
    setLoading(false);
  };

  useEffect(() => {
    console.log("Collection ID------>", colId);
    colId && !isLoading && fetchNFTs();
  }, [colId]);

  return (
    <>
      <div className="w-full h-full bg-[#121212] flex flex-col gap-4">
        <div className="w-full bg-[#121212] flex flex-col px-[50px]">
          <p className="text-[20px] mt-[20px]">Collections's NFTs</p>
          <div className="w-full h-full mt-[30px] mb-[30px] overflow-auto p-[10px] relative">
            <div className="w-full flex-none grid grid-cols-4 gap-[30px]  max-h-full">
              {NFTs.map((nft) => (
                <button
                  onClick={() => router.push(`/nfts/${nft.mint}`)}
                  key={nft.mint}
                  className="relative"
                >
                  {listings.includes(nft.mint) && (
                    <Image
                      src="/home/sale_ribbon.png"
                      width={100}
                      height={0}
                      alt="sale_mark_ribbon"
                      className="absolute -right-2 -top-2 z-20"
                      priority={true}
                    />
                  )}
                  <MyNFT item={nft} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CollectionNFTs;
