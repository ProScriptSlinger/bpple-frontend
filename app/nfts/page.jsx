"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ImageComponent from "../../components/shared/ImageComponent/demo";
import { useRouter, usePathname } from "next/navigation";
import { useShyft } from "@/context/shyftContext";
import { useUser } from "@/context/appContext";

const Marketplace = () => {
  const router = useRouter();
  const { address } = useUser();
  const pathName = usePathname();
  const [listings, setListings] = useState([]);
  const [colAddList, setColAddList] = useState([]);
  const [allMyNFTs, setAllMyNFTs] = useState([]);
  const {
    fetchAllMyNFTs,
    fetchListings,
    getCollectionsWallet,
    collections,
    activeNFTs,
  } = useShyft();

  const fetchNFTs = async () => {
    const res = await fetchAllMyNFTs();
    setAllMyNFTs(res);
    const listingRes = await fetchListings();
    const mints = listingRes.map((one) => one.nft_address);
    setListings(mints);
    const colRes = await getCollectionsWallet();
    const colAddBuffer = colRes.map((one) => one.address);
    setColAddList(colAddBuffer);
  };
  useEffect(() => {
    address && fetchNFTs();
  }, [address]);
  return (
    <>
      <div className="w-full h-full bg-[#121212] flex flex-col gap-4">
        <div className="w-full bg-[#121212] flex flex-col px-[50px]">
          <p className="text-[20px] mt-[20px]">My Collections</p>
          {/* <div className="inline-flex items-center">
            <button>
              <Image
                src="/icon/view_flex.svg"
                width={0}
                height={0}
                alt=""
                className="w-[15px] mr-[20px]"
              />
            </button>
            <button>
              <Image
                src="/icon/view_inline.svg"
                width={0}
                height={0}
                alt=""
                className="w-[15px]"
              />
            </button>
          </div> */}
          {/* <div className="w-full h-full mt-[30px] mb-[30px] overflow-auto p-[10px] relative">
            <div className="w-full flex-none grid grid-cols-4 gap-[30px] max-h-full">
              {allMyNFTs.map((nft) => (
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
                      alt=""
                      className="absolute -right-2 -top-2"
                      priority={true}
                    />
                  )}
                  <img
                    src={nft.cached_image_uri}
                    alt="nft_image"
                    className="rounded-[18px] w-full aspect-[4/3]"
                  />
                </button>
              ))}
            </div>
          </div> */}
        </div>
        <div className="w-full bg-[#121212] flex flex-col px-[50px]">
          <p className="text-[20px] mt-[20px]">My NFTs</p>
          <div className="w-full h-full mt-[30px] mb-[30px] overflow-auto p-[10px] relative">
            <div className="w-full flex-none grid grid-cols-4 gap-[30px]  max-h-full">
              {allMyNFTs.map((nft) => (
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
                      alt=""
                      className="absolute -right-2 -top-2"
                      priority={true}
                    />
                  )}
                  <img
                    src={nft.image_uri}
                    alt="nft_image"
                    className="rounded-[18px] w-full aspect-[4/3]"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Marketplace;
