"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useShyft } from "@/context/shyftContext";
import { useUser } from "@/context/appContext";
const NewNFTS = dynamic(() => import("@/components/marketplace/MarketNFT"));
import { MdRadioButtonChecked } from "react-icons/md";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { handleEndpoint } from "@/utils/api/handleEndpoint";
import { toast } from "react-toastify";

const Page = () => {
  const { fetchListings, activeNFTs } = useShyft();
  const { address, currentCommunity, getCommunities } = useUser();
  const [isSaving, setSaving] = useState(false);
  const [list, setList] = useState([]);
  const router = useRouter();

  const fetchNFTs = async () => {
    await fetchListings();
  };

  console.log("communities ------>", currentCommunity);

  useEffect(() => {
    address && fetchNFTs();
  }, [address]);

  useEffect(() => {
    currentCommunity && setList(currentCommunity?.nfts);
  }, [currentCommunity]);

  const handleSave = async () => {
    try {
      setSaving(true);
      console.log("saving community------>", list, currentCommunity);
      const response = await handleEndpoint(
        { nfts: list },
        `community/${currentCommunity?._id}/update-nfts`,
        "put",
        null
      );
      await getCommunities();
      toast.success("NFTs successfully add to community");
      setSaving(false);
      router.push(`community/${currentCommunity?._id}/marketplace`);
    } catch (err) {
      console.log(err);
      setSaving(false);
    }
  };

  const handleSetList = (id) => {
    if (list.includes(id)) {
      let listBuffer = list;
      listBuffer = listBuffer.filter((item) => item !== id);
      setList(listBuffer);
      console.log("handleSetList ------>", id, list, listBuffer);
    } else {
      setList([...list, id]);
      console.log("handleSetList no includes------>", id, list);
    }
  };

  return (
    <>
      <div className="w-full h-full  mobile:px-[50px] px-[20px] pt-[30px] pb-[50px] overflow-auto prevent-select">
        <div className="flex justify-between">
          <p className="text-[20px]">Community&apos;s NFTs</p>
          <button
            className="text-[#3772FF] hover:opacity-70"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
        <div className="w-full mt-[20px] relative h-[250px] overflow-auto">
          <div className="w-full overflow-auto inline-flex gap-[10px] absolute">
            {/* {activeNFTs.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 items-center"
                onClick={() => handleSetList(item.nft.mint)}
              >
                <NewNFTS item={item} />
                {list.includes(item.nft.mint) ? (
                  <MdRadioButtonChecked className=" left-1 top-1 text-[30px] color-main  cursor-pointer" />
                ) : (
                  <MdRadioButtonUnchecked className=" left-1 top-1 text-[30px] color-main  cursor-pointer" />
                )}
              </div>
            ))} */}
          </div>
        </div>

        <div className="w-full h-[60px]"></div>
      </div>
    </>
  );
};
export default Page;
