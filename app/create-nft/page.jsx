"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import ImageComponent from "@/components/shared/ImageComponent/demo";
import { toast } from "react-toastify";
import { useUser } from "@/context/appContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useShyft } from "@/context/shyftContext";
import { useRouter } from "next/navigation";

const NFT = () => {
  const { createNFT, network, colId, setColId } = useShyft();
  const searchParams = useSearchParams();
  const nftTypeParam = searchParams.get("nftType");
  const [nftType, setNftType] = useState("nft");
  const { address } = useUser();
  const router = useRouter();

  useEffect(
    () =>
      nftTypeParam == "collection"
        ? setNftType("collection")
        : nftTypeParam == "nft"
        ? setNftType("nft")
        : setNftType("add-nft"),
    [nftTypeParam]
  );

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [royalty, setRoyalty] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const admins = [
  //     "7bgNUCdFZX729Vmvz9S5JwhrfQE52kDv6QyeBpbr5Yw5",
  //     "4dJ6QHdisXwcFVjADr8dS7BqHfDUfuzc6pzDoTEgGDQi",
  //     "FhvzCMoiTq8JHZuKwiPsGPgVtQjR8Z4KJ71r55h2tgqC",
  //     "CBDspbBz3Xy6MYyURfGVzqMg7rS8EsQzBy3hf7UbR7uv",
  //     "8SzTAw5w4rfpvp9qcw1WUtJUXCxE1RiNZXyY8icg4yCn",
  //   ];
  //   if (!admins.includes(address)) {
  //     router.push("/nfts");
  //   }
  // }, [address]);

  const handleMint = async () => {
    setIsLoading(true);
    const data = {
      network,
      name,
      symbol,
      description,
      external_url: url,
      max_supply: maxSupply,
      royalty,
      collection_address: colId,
    };
    console.log("Creating NFT ------>", data);
    await createNFT({ ...data, image: file, creator_wallet: address });
    setColId(null);
    setIsLoading(false);
    router.back();
  };

  return (
    <>
      <div className="w-full h-full relative overflow-auto">
        <div className="w-full flex flex-col px-[50px] bg-[#121212] overflow-auto absolute h-full">
          <div className="w-full flex justify-center">
            <div className="mt-[30px] w-full inline-flex justify-between items-center mb-[30px]">
              <p className="text-[25px]">
                {nftType == "collection"
                  ? "New Collection"
                  : nftType == "add-nft"
                  ? "Add new NFT to collection"
                  : "New NFT"}
              </p>
            </div>
          </div>
          <div className="w-full pb-[30px] overflow-auto h-full">
            <div className="w-full flex flex-col justify-center items-center overflow-auto gridWidth:h-full gap-[40px]">
              <div className="gridWidth:flex gridWidth:flex-row gridWidth:gap-[40px] overflow-auto">
                <div className="flex flex-col gap-[30px] w-[380px] flex-none justify-between mb-[50px] gridWidth:mb-0">
                  <div className="w-full flex-1">
                    <label htmlFor="file" className="cursor-pointer">
                      {file ? (
                        <ImageComponent src={preview} />
                      ) : (
                        <div className="flex items-center justify-center gap-[20px] w-full h-full duration-700 opacity-100 border-[2px] border-dashed rounded-[18px]">
                          <Image
                            src="/icon/upload.svg"
                            width="25"
                            height="25"
                            alt="icon"
                          />
                          <p>Select File</p>
                        </div>
                      )}
                    </label>
                    <input
                      id="file"
                      name="file"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                        setPreview(URL.createObjectURL(e.target.files[0]));
                      }}
                    />
                  </div>
                  <div className="w-full inline-flex items-center justify-center">
                    <button className="inline-flex items-center">
                      {/* <img
                        width={0}
                        height={0}
                        alt=""
                        src={"/avatar/20.png"}
                        className="w-[45px] h-auto rounded-[8px]"
                      /> */}
                      <div className="ml-[20px] text-left">
                        <p>{"NFT Image"}</p>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="h-full gridWidth:w-[500px] w-[380px] flex flex-col overflow-auto flex-1 px-[20px] gap-[25px]">
                  <input
                    placeholder={"Enter NFT Name"}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className="bg-[#191919] border-none outline-none placeholder:text-[#707070] py-[15px] px-[25px] w-full rounded-[12px] text-[14px]"
                  />
                  <input
                    placeholder="symbol"
                    onChange={(e) => {
                      setSymbol(e.target.value);
                    }}
                    className="bg-[#191919] border-none outline-none placeholder:text-[#707070] py-[15px] px-[25px] w-full rounded-[12px] text-[14px]"
                  />
                  <textarea
                    placeholder="Enter Description"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    className="bg-[#191919] border-none outline-none placeholder:text-[#707070] py-[15px] px-[25px] w-full rounded-[12px] text-[14px]"
                  />
                  <input
                    placeholder="Enter URL"
                    onChange={(e) => {
                      setUrl(e.target.value);
                    }}
                    className="bg-[#191919] border-none outline-none placeholder:text-[#707070] py-[15px] px-[25px] w-full rounded-[12px] text-[14px]"
                  />
                  <div className="flex items-center gap-[20px]">
                    {/* {nftType !== "collection" && (
                      <input
                        placeholder="Enter Max Supply"
                        type="number"
                        onChange={(e) => {
                          setMaxSupply(Number(e.target.value));
                        }}
                        className="bg-[#191919] border-none outline-none placeholder:text-[#707070] py-[15px] px-[25px] w-full rounded-[12px] text-[14px]"
                      />
                    )} */}
                    <input
                      placeholder="Enter Loyalty"
                      type="number"
                      onChange={(e) => {
                        setRoyalty(Number(e.target.value));
                      }}
                      className="bg-[#191919] border-none outline-none placeholder:text-[#707070] py-[15px] px-[25px] w-full rounded-[12px] text-[14px]"
                    />
                  </div>
                </div>
              </div>
              <button
                className={`w-[130px] h-[45px] flex justify-center items-center rounded-full border border-[#3772FF] text-[#3772FF] mr-[10px] ${
                  !isLoading && "hover:bg-[#3772FF]"
                } hover:text-white`}
                onClick={handleMint}
                disabled={isLoading}
              >
                {isLoading ? (
                  <AiOutlineLoading3Quarters
                    size={24}
                    className=" animate-spin"
                  />
                ) : (
                  "Mint"
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
