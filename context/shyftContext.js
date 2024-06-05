"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import signAndConfirmTransaction from "@/lib/signAndConfirmTransaction";
import { useUser } from "./appContext";

const ShyftContext = createContext();

export function useShyft() {
  return useContext(ShyftContext);
}

export function ShyftProvider({ children }) {
  const { address } = useUser();

  const networkValue = process.env.NEXT_PUBLIC_NETWORK?.toString() || "devnet";
  const [network, setNetwork] = useState(networkValue);
  const [connStatus, setConnStatus] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState({});
  const [activeNFTs, setActiveNFTs] = useState([]);
  const [collections, setCollections] = useState([]);

  const xKey = process.env.NEXT_PUBLIC_API_KEY.toString();
  const endPoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const marketplaceAddress = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS;

  //   useEffect(() => {
  //     fetchListings();
  //   }, [address]);

  //   create NFT
  const createMarketplace = async () => {
    const createMPUrl = `${endPoint}marketplace/create`;
    const data = {
      network: network,
      transaction_fee: 10,
      creator_wallet: address,
    };
    try {
      const res = await axios.post(createMPUrl, data, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": xKey,
        },
      });
      console.log("create Marketplace result ------> ", res);
      if (res.data.success === true) {
        const transaction = res.data.result.encoded_transaction;
        const mint = res.data.result.mint;
        const ret_result = await signAndConfirmTransaction(
          network,
          transaction
        );
        toast.success("Marketplace created successfully");
      }
    } catch (err) {
      // Catch errors if any
      console.log("create Marketplace Error ------> ", err);
      toast.error("Something went wrong");
      return [];
    }
  };

  //   create NFT
  const createNFT = async (data) => {
    const createNFTUrl = `${endPoint}nft/create_detach`;
    try {
      const res = await axios.post(createNFTUrl, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": xKey,
          Accept: "*/*",
          "Access-Control-Allow-Origin": "*",
        },
      });
      console.log("create NFT result ------> ", res);
      if (res.data.success === true) {
        const transaction = res.data.result.encoded_transaction;
        const mint = res.data.result.mint;
        const ret_result = await signAndConfirmTransaction(
          network,
          transaction
        );
        toast.success("NFT created successfully");
      }
    } catch (err) {
      // Catch errors if any
      console.log("create NFT Error ------> ", err);
      toast.error("Something went wrong");
      return [];
    }
  };

  //   fetch NFTs of MarketPlace
  const fetchListings = async () => {
    const nftUrl = `${endPoint}marketplace/active_listings?network=${network}&marketplace_address=${marketplaceAddress}`;
    try {
      const res = await axios.get(nftUrl, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": xKey,
        },
      });
      console.log("listingURl ------->", res);
      if (res.data.success === true) {
        setActiveNFTs(res.data.result);
        return res.data.result;
      } else {
        setActiveNFTs([]);
        toast.info("No NFTs");
        return [];
      }
    } catch (err) {
      // Catch errors if any
      toast.warning(err.response.data.message);
      setActiveNFTs([]);
      return [];
    }
  };

  //   fetch My NFTs of MarketPlace
  const fetchMyNFTs = async () => {
    let myNFTUrl = `${endPoint}marketplace/active_listings?network=${network}&marketplace_address=${marketplaceAddress}`;
    try {
      const res = await axios.get(myNFTUrl, {
        headers: {
          "x-api-key": xKey,
        },
        params: {
          network: network,
          address: address,
        },
      });
      if (res.data.success === true) {
        return res.data.result;
      } else {
        toast.info("No NFTs");
        return [];
      }
    } catch (err) {
      // Catch errors if any
      toast.error("Error loading NFTs");
      return [];
    }
  };

  //   fetch a collections's NFTs of MarketPlace
  const fetchNFTsByCol = async (collection_address) => {
    let colNFTUrl = `${endPoint}marketplace/active_listings?network=${network}&collection_address=${collection_address}`;
    try {
      const res = await axios.get(colNFTUrl, {
        headers: {
          "x-api-key": xKey,
        },
      });
      if (res.data.success === true) {
        return res.data.result;
      } else {
        toast.info("No NFTs");
        return [];
      }
    } catch (err) {
      // Catch errors if any
      toast.error("Error loading NFTs");
      return [];
    }
  };

  //   fetch collections of MarketPlace

  const fetchCollections = async () => {
    const collectionUrl = `${endPoint}marketplace/active_listings?network=${network}&marketplace_address=${marketplaceAddress}`;
    try {
      const res = await axios.get(collectionUrl, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": xKey,
        },
      });
      if (res.data.success === true) {
        return res.data.result;
      } else {
        toast.info("No NFTs");
        return [];
      }
    } catch (err) {
      // Catch errors if any
      toast.warning(err.response.data.message);
      return [];
    }
  };

  //   fetch one NFT by id
  const getNFTById = async (id) => {
    const nftByIdUrl = `${endPoint}nft/read`;
    try {
      const res = await axios.get(nftByIdUrl, {
        headers: {
          "x-api-key": xKey,
        },
        params: {
          network: network,
          token_address: id,
        },
      });
      if (res.data.success === true) {
        return res.data.result;
      }
    } catch (err) {
      // Catch errors if any
      toast.error("Something went wrong");
    }
  };

  //   buy NFT
  const buyNFT = async (selectedNFT) => {
    const buyNFTUrl = `${endPoint}marketplace/buy`;
    const data = {
      network: network,
      marketplace_address: marketplaceAddress,
      nft_address: selectedNFT.nft_address,
      price: selectedNFT.price,
      seller_address: selectedNFT.seller_address,
      buyer_wallet: address,
    };
    try {
      const res = await axios.post(buyNFTUrl, data, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": xKey,
        },
      });
      if (res.data.success === true) {
        const transaction = res.data.result.encoded_transaction;
        const ret_result = await signAndConfirmTransaction(
          network,
          transaction
        );
        toast.success("Transaction success!");
      } else {
        toast.warning(res.data.message);
      }
    } catch (err) {
      // Catch errors if any
      toast.error("Transaction failed!");
    }
  };

  //   fetch my All NFTs
  const fetchAllMyNFTs = async () => {
    const allMyNFTUrl = `${endPoint}nft/read_all`;
    console.log("network and address -----> ", network, address);
    try {
      const res = await axios.get(allMyNFTUrl, {
        headers: {
          "x-api-key": xKey,
        },
        params: {
          network: network,
          address: address,
        },
      });
      console.log("fetchAllMyNFTs ------>", res);
      if (res.data.success === true) {
        return res.data.result;
      } else {
        toast.warning(res.data.message);
        return [];
      }
    } catch (err) {
      console.log("fetchAllMyNFTs Error ------> ", err);
      // Catch errors if any
      toast.error("Error loading NFTs");
      return [];
    }
  };

  //   Read my NFT
  const readNFT = async (id) => {
    const readNFTUrl = `${endPoint}nft/read`;
    console.log("network and address -----> ", network, address, id);
    try {
      const res = await axios.get(readNFTUrl, {
        headers: {
          "x-api-key": xKey,
        },
        params: {
          network: network,
          token_address: id,
        },
      });
      if (res.data.success) {
        setSelectedNFT(res.data.result);
        return res.data.result;
      }
    } catch (err) {
      console.log("Read NFT ------>", err);
      toast.error("NFT not found");
      return [];
    }
  };

  //   list NFT to marketplace
  const listNFT = async (price) => {
    const data = {
      network: network,
      marketplace_address: marketplaceAddress,
      nft_address: selectedNFT.mint,
      price: price,
      seller_wallet: address,
    };

    const listNFTUrl = `${endPoint}marketplace/list`;
    try {
      const res = await axios.post(listNFTUrl, data, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": xKey,
        },
      });
      console.log("listNFT Res ----->", res);
      if (res.data.success === true) {
        const transaction = res.data.result.encoded_transaction;
        const ret_result = await signAndConfirmTransaction(
          network,
          transaction
        );
        toast.success("Listing success");
        return true;
      } else {
        //setShowLister(false);
        toast.warning(res.data.message);
        return false;
      }
    } catch (err) {
      console.log("List NFT Err------>", err);
      toast.error("Listing failed");
      return false;
    }
  };

  const value = {
    // shyft integration
    network,
    setNetwork,
    connStatus,
    setConnStatus,
    selectedNFT,
    setSelectedNFT,
    activeNFTs,
    setActiveNFTs,
    // shyft API functions
    createNFT,
    fetchListings,
    fetchMyNFTs,
    fetchNFTsByCol,
    fetchCollections,
    getNFTById,
    buyNFT,
    fetchAllMyNFTs,
    readNFT,
    listNFT,
    createMarketplace,
  };

  return (
    <ShyftContext.Provider value={value}>{children}</ShyftContext.Provider>
  );
}
