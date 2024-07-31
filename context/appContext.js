"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { handleEndpoint } from "../utils/api/handleEndpoint";
import { toast } from "react-toastify";
// import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
// import { useAccount, useDisconnect } from "wagmi";
// import { useWeb3Modal } from "@web3modal/wagmi/react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useMemo } from "react";

const AuthContext = createContext();

export function useUser() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const { wallets } = useWallets();
  const [pending, setPending] = useState(true);
  const [userDetail, setUserDetail] = useState(null);
  const [friendRequestsReceived, setFriendRequestsReceived] = useState([]);
  const [friendRequestsSent, setFriendRequestsSent] = useState([]);
  const [requestsReceived, setRequestsReceived] = useState([]);
  const [requestsSent, setRequestsSent] = useState([]);
  const [chats, setChats] = useState([]);
  const [usersTyping, setUsersTyping] = useState(new Set());
  const [user_messages, setUser_messages] = useState({});
  const [user_group_messages, setUser_group_messages] = useState({});
  const [community_messages, setCommunity_messages] = useState({});
  const [communities, setCommunities] = useState([]);
  const [isRegistered, setRegistered] = useState(false);
  const [currentCommunity, setCurrentCommunity] = useState(null);
  const [wallet, setWallet] = useState();
  const [dataLoading, setUserDataLoading] = useState(false);
  const [isWalletConnected, setWalletConnected] = useState(false);

  const memoizedValues = useMemo(() => {
    if (wallet) {
      return {
        address: wallet.address,
        disconnect: wallet.disconnect,
        isConnected: wallet.isConnected,
      };
    }
    return {}; // Return an empty object if wallet is undefined
  }, [wallet]);

  const { address, disconnect, isConnected } = memoizedValues;
  useEffect(() => {
    if (wallets[0]) setWallet(wallets[0]);
  }, [wallets]);
  // const { address, isConnecting, isConnected, isDisconnected, status } =
  //   useAccount();
  // const { open } = useWeb3Modal();

  const getUserByAddress = async () => {
    try {
      console.log("wallet address ------>", address);
      if (!address) return;
      const response = await handleEndpoint(
        null,
        `user/by_address/${address}`,
        "get",
        null
      );

      if (response) {
        return response;
      } else {
        // Handle empty response or other conditions
        console.log("Empty response or other condition");
        setUserDetail(null);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setUserDetail(null);
      // Handle error, such as setting an error state or displaying a message
    }
  };

  const getUserwithToken = async () => {
    try {
      const token = localStorage.getItem("bipple_token");
      if (!token) return;
      const response = await handleEndpoint(null, "user", "get", token);

      if (response) {
        return response;
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const getUser = async () => {
    console.log("getUser ----->", address);
    try {
      setPending(true);

      const addresResponse = await getUserByAddress();
      const tokenResponse = await getUserwithToken();
      console.log("address response ------> ", addresResponse);
      if (addresResponse && tokenResponse) {
        setUserDetail({ ...tokenResponse, ...addresResponse.user });
      } else if (addresResponse) {
        localStorage.setItem("bipple_token", addresResponse.token);
        setUserDetail(addresResponse.user);
      } else if (tokenResponse) {
        setUserDetail(tokenResponse);
      }

      if (!addresResponse) setUserDetail(null);
    } catch (error) {
      console.log(error);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [address, wallet, isWalletConnected]);

  const getChatById = async () => {
    try {
      const chatResponse = await handleEndpoint(
        null,
        `chat/${userDetail.user_id}`,
        "get",
        null
      );

      if (chatResponse) {
        setChats(chatResponse);
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const getCommunities = async () => {
    if (userDetail) {
      const communityResponse = await handleEndpoint(
        null,
        `community/${userDetail._id}/user`,
        "get",
        null
      );
      if (communityResponse) {
        setCommunities(communityResponse);
        console.log(communityResponse);
      }
    }
  };

  const getUserData = async () => {
    if (userDetail) {
      try {
        setCommunities([]);
        const communityResponse = await handleEndpoint(
          null,
          `community/${userDetail._id}/user`,
          "get",
          null
        );

        if (communityResponse) {
          setCommunities(communityResponse);
        }
      } catch (error) {
        console.error("Error fetching communities:", error);
      }

      try {
        const receivedResponse = await handleEndpoint(
          null,
          `friend-request/received/${userDetail._id}/user`,
          "get",
          null
        );

        if (receivedResponse.ok) {
          setFriendRequestsReceived(receivedResponse.requests);
          // console.log("Friend requests received updated", receivedResponse);
        }
      } catch (error) {
        console.error("Error fetching received friend requests:", error);
      }

      try {
        const receivedResponse = await handleEndpoint(
          null,
          `request/received/${userDetail._id}/user`,
          "get",
          null
        );

        if (receivedResponse.ok) {
          setRequestsReceived(receivedResponse.requests);
          // console.log("Requests received updated", receivedResponse);
        }
      } catch (error) {
        console.error("Error fetching received friend requests:", error);
      }

      try {
        const sentResponse = await handleEndpoint(
          null,
          `friend-request/sent/${userDetail._id}/user`,
          "get",
          null
        );

        if (sentResponse.ok) {
          setFriendRequestsSent(sentResponse.requests);
        }
      } catch (error) {
        console.error("Error fetching sent friend requests:", error);
      }

      try {
        const sentResponse = await handleEndpoint(
          null,
          `request/sent/${userDetail._id}/user`,
          "get",
          null
        );

        if (sentResponse.ok) {
          setRequestsSent(sentResponse.requests);
        }
      } catch (error) {
        console.error("Error fetching sent requests:", error);
      }

      await getChatById();
    }
  };
  useEffect(() => {
    getUserData();
  }, [address, wallet, userDetail]);

  // useEffect(() => {
  //   solanaConnect();
  // }, []);

  // const solanaConnect = async () => {
  //   const { solana } = window;
  //   if (!solana) {
  //     alert("Please Install Solana Wallet");
  //   }

  //   try {
  //     const phantom = new PhantomWalletAdapter();
  //     await phantom.connect();
  //     const wallet = {
  //       address: phantom.publicKey && phantom.publicKey.toString(),
  //     };

  //     if (wallet.address) {
  //       setAddress(wallet.address);
  //       setConnected(true);
  //       setDisconnected(false);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const value = {
    pending,
    userDetail,
    setUserDetail,
    friendRequestsSent,
    friendRequestsReceived,
    setFriendRequestsReceived,
    setFriendRequestsSent,
    requestsSent,
    requestsReceived,
    setRequestsReceived,
    setRequestsSent,
    chats,
    getUser,
    setChats,
    getUserByAddress,
    address,
    // connectWallet,
    // isConnecting,
    isConnected,
    // isDisconnected,
    disconnect,
    // open,
    setPending,
    pending,
    communities,
    getCommunities,
    // solanaConnect,
    currentCommunity,
    setCurrentCommunity,
    getUserData,
    isWalletConnected,
    setWalletConnected,
    getChatById,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
