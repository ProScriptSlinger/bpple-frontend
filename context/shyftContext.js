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
  const [colId, setColId] = useState(null);
  const [allNFTs, setAllNFTs] = useState([]);
  const [activeCol, setActiveCol] = useState({});

  const xKey = process.env.NEXT_PUBLIC_API_KEY.toString();
  const endPoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const endPoint_v2 = process.env.NEXT_PUBLIC_API_ENDPOINT_V2;
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
    console.log("creating data ------>", data);
    const createNFTUrl = `${endPoint_v2}nft/create`;
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
        await fetchAllMyNFTs();
        toast.success("NFT created successfully");
      }
    } catch (err) {
      // Catch errors if any
      console.log("create NFT Error ------> ", err);
      toast.error("Something went wrong");
      return [];
    }
  };

  //   create NFT
  //   const createNFT = async (data) => {
  //     console.log("creating data------->", data);
  //     const createNFTUrl = `${endPoint}nft/create_detach`;
  //     try {
  //       const res = await axios.post(createNFTUrl, data, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           "x-api-key": xKey,
  //           Accept: "*/*",
  //           "Access-Control-Allow-Origin": "*",
  //         },
  //       });
  //       console.log("create NFT result ------> ", res);
  //       if (res.data.success === true) {
  //         const transaction = res.data.result.encoded_transaction;
  //         const mint = res.data.result.mint;
  //         const ret_result = await signAndConfirmTransaction(
  //           network,
  //           transaction
  //         );
  //         toast.success("NFT created successfully");
  //       }
  //     } catch (err) {
  //       // Catch errors if any
  //       console.log("create NFT Error ------> ", err);
  //       toast.error("Something went wrong");
  //       return [];
  //     }
  //   };

  //   fetch NFTs of MarketPlace
  const fetchListings = async (id = null) => {
    const nftUrl = `${endPoint_v2}marketplace/active_listings`;
    try {
      const res = await axios.get(nftUrl, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": xKey,
        },
        params: {
          network: network,
          marketplace_address: marketplaceAddress,
          nft_address: id,
        },
      });
      console.log("listingURl ------->", res);
      if (res.data.success === true) {
        setActiveNFTs(res.data.result.data);
        return res.data.result.data;
      } else {
        setActiveNFTs([]);
        toast.info("No NFTs");
        return [];
      }
    } catch (err) {
      console.log("listing error ----->", err);
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

  //   buy NFT
  const buyNFT = async () => {
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
        await fetchAllMyNFTs();
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
        setAllNFTs(res.data.success);
        return res.data.result;
      } else {
        toast.warning(res.data.message);
        setAllNFTs([]);
        return [];
      }
    } catch (err) {
      console.log("fetchAllMyNFTs Error ------> ", err);
      // Catch errors if any
      toast.error("Error loading NFTs");
      setAllNFTs([]);
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
      } else return {};
    } catch (err) {
      console.log("Read NFT ------>", err);
      toast.error("NFT not found");
      return {};
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

  //   Get Collections In Wallet
  const getCollectionsWallet = async () => {
    const getColUrl = `${endPoint}wallet/collections`;
    try {
      const res = await axios.get(getColUrl, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": xKey,
        },
        params: {
          network: network,
          wallet_address: address,
        },
      });
      console.log("Collections Res ----->", res);
      if (res.data.success === true) {
        const cols = res.data.result.collections;
        setCollections(cols);
        return cols;
      } else {
        setCollections([]);
        toast.warning(res.data.message);
        return [];
      }
    } catch (err) {
      setCollections([]);
      console.log("Get Collections Err------>", err);
      toast.error("Get collections failed");
      return [];
    }
  };

  //   Get Active Bids
  //   getFrom : {
  //     marketplace_address
  //     nft_address
  //     buyer_address
  //   }
  const getActiveBids = async (getFrom) => {
    const getBidsUrl = `${endPoint}marketplace/active_bids`;
    try {
      const res = await axios.get(getColUrl, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": xKey,
        },
        params: {
          network: network,
          marketplace_address: marketplaceAddress,
          ...getFrom,
        },
      });
      console.log("Collections Res ----->", res);
      if (res.data.success === true) {
        const cols = res.data.result.collections;
        setCollections(cols);
        toast.success(res.data.message);
        return true;
      } else {
        setCollections([]);
        toast.warning(res.data.message);
        return false;
      }
    } catch (err) {
      setCollections([]);
      console.log("Get Collections Err------>", err);
      toast.error("Get collections failed");
      return false;
    }
  };

  // transfer NFT to other wallet
  const transferNFT = async (toAddress) => {
    const xKey = process.env.NEXT_PUBLIC_API_KEY.toString();
    const endPoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    let nftUrl = `${endPoint}nft/transfer_detach`;
    const data = {
      network: network,
      token_address: selectedNFT.mint,
      from_address: address,
      to_address: toAddress,
    };
    try {
      const res = await axios.post(nftUrl, data, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": xKey,
        },
      });
      console.log("transferNFT Res ----->", res);
      if (res.data.success === true) {
        const transactions = res.data.result.encoded_transaction;
        const ret_result = await signAndConfirmTransaction(
          network,
          transactions
        );
        toast.success("Transfer success");
      } else {
        //setShowLister(false);
        toast.warning(res.data.message);
      }
    } catch (err) {
      setCollections([]);
      console.log("Get Collections Err------>", err);
      toast.error("Transfer failed");
      return false;
    }
  };

  // burn NFT of wallet
  const burnNFT = async () => {
    const xKey = process.env.NEXT_PUBLIC_API_KEY;
    const endPoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    let burnNftUrl = `${endPoint}nft/burn_detach`;
    const data = {
      network: network,
      wallet: address,
      token_address: selectedNFT.mint,
    };

    console.log("burning data------->", data);
    try {
      const res = await axios.delete(burnNftUrl, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": xKey,
        },
        data,
      });
      console.log("Burn NFT Res ----->", res);
      if (res.data.success === true) {
        const transactions = res.data.result.encoded_transaction;
        const ret_result = await signAndConfirmTransaction(
          network,
          transactions
        );
        toast.success("Burn success");
        await fetchAllMyNFTs();
      } else {
        //setShowLister(false);
        toast.warning(res.data.message);
      }
    } catch (err) {
      console.log("Burn NFT Err------>", err);
      toast.error("Burn failed");
      return false;
    }
  };

  const getColById = async (id) => {
    try {
      const colsRes = await getCollectionsWallet();
      console.log("colsRes ------> ", colsRes);
      return colsRes.find((item) => item.address == id);
    } catch (err) {
      console.log("getColById error------>", err);
      return [];
    }
  };

  // get NFTs of collection
  const getNFTsCollection = async (colAddress) => {
    // const getNFTsUrl = `${endPoint}collections/get_nfts`;
    console.log("getNFTsCollection ------> ", colAddress);
    try {
      // const res = await axios.get(getNFTsUrl, {
      //   headers: {
      //     "Content-Type": "application/json",
      //     "x-api-key": xKey,
      //   },
      //   params: {
      //     network: network,
      //     collection_address: colAddress,
      //   },
      // });
      // console.log("Collection's NFTs Res ----->", res);
      // if (res.data.success === true) {
      //   toast.success(res.data.message);
      //   return res.data.result;
      // } else {
      //   toast.warning(res.data.message);
      //   return [];
      // }
      const allNFTsRes = await fetchAllMyNFTs();
      console.log("1 ------>", allNFTsRes);
      const nftsRes = await getColById(colAddress);
      console.log("2 ------->", nftsRes.nfts);
      let nftIdList = [];
      nftsRes?.nfts.map((item) => nftIdList.push(item.mint));
      console.log("3 ------>", nftIdList);
      const nftsOfCol = allNFTsRes.filter((item) =>
        nftIdList.includes(item.mint)
      );
      console.log("nftsOfCol ------>", nftsOfCol);
      return nftsOfCol;
    } catch (err) {
      console.log("Get Collection's Err------>", err);
      toast.error("Get NFTs of collection failed");
      return [];
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
    buyNFT,
    fetchAllMyNFTs,
    readNFT,
    listNFT,
    createMarketplace,
    collections,
    getCollectionsWallet,
    getActiveBids,
    colId,
    setColId,
    transferNFT,
    burnNFT,
    getNFTsCollection,
    allNFTs,
    activeCol,
    setActiveCol,
  };

  return (
    <ShyftContext.Provider value={value}>{children}</ShyftContext.Provider>
  );
}
