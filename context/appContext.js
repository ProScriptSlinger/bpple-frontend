"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { handleEndpoint } from "../utils/api/handleEndpoint";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

const AuthContext = createContext();

export function useUser() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
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

  const { address, isConnecting, isConnected, isDisconnected } = useAccount();
  const { open } = useWeb3Modal();

  const getUserByAddress = async () => {
    try {
      if (!address || !isConnected || userDetail?.email) return;
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
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
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

  useEffect(() => {
    const getUser = async () => {
      if (userDetail) return;

      try {
        setPending(true);
        const addresResponse = await getUserByAddress();
        const tokenResponse = await getUserwithToken();

        if (addresResponse && tokenResponse) {
          setUserDetail({ ...tokenResponse, ...addresResponse });
        }

        if (addresResponse) {
          setUserDetail(addresResponse);
        }

        if (tokenResponse) {
          setUserDetail(tokenResponse);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setPending(false);
      }
    };

    getUser();
  }, [address, userDetail]);

  const getUser = async () => {
    try {
      const addresResponse = await getUserByAddress();
      const tokenResponse = await getUserwithToken();

      if (addresResponse && tokenResponse) {
        setUserDetail({ ...tokenResponse, ...addresResponse });
      } else if (addresResponse) {
        setUserDetail(addresResponse);
      } else if (tokenResponse) {
        setUserDetail(tokenResponse);
      }
    } catch (error) {
      console.log(error);
    } finally {
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

  useEffect(() => {
    const getUserData = async () => {
      if (userDetail) {
        try {
          const communityResponse = await handleEndpoint(
            null,
            `community/${userDetail._id}/user`,
            "get",
            null
          );

          if (communityResponse) {
            setCommunities(communityResponse);
            console.log("Communities updated", communityResponse);
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
            console.log("Friend requests received updated", receivedResponse);
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
            console.log("Requests received updated", receivedResponse);
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
            console.log("Friend requests sent updated", sentResponse);
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
            console.log("Requests sent updated", sentResponse);
          }
        } catch (error) {
          console.error("Error fetching sent requests:", error);
        }

        try {
          const chatResponse = await handleEndpoint(
            null,
            `chat/${userDetail.user_id}`,
            "get",
            null
          );

          if (chatResponse) {
            setChats(chatResponse);
            console.log("Chats updated", chatResponse);
          }
        } catch (error) {
          console.error("Error fetching chats:", error);
        }
      }
    };

    getUserData();
  }, [userDetail]);

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
    isConnecting,
    isConnected,
    isDisconnected,
    open,
    setPending,
    communities,
    getCommunities,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
