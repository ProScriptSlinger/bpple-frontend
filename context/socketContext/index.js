"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { handleEndpoint } from "../../utils/api/handleEndpoint";
import io from "socket.io-client";
import { editRequestById } from "../../utils/functions/editRequestById";
import { useUser } from "../appContext";

const SocketIoContext = createContext();

export function useSocket() {
  return useContext(SocketIoContext);
}

export function SocketIoProvider({ children }) {
  const [usersTyping, setUsersTyping] = useState(new Set());
  const [user_messages, setUser_messages] = useState({});
  const [user_group_messages, setUser_group_messages] = useState({});
  const [community_messages, setCommunity_messages] = useState({});

  const socket = useRef(null);
  const {
    communities,
    userDetail,
    setFriendRequestsReceived,
    chats,
    setChats,
    friendRequestsSent,
    setFriendRequestsSent,
    getCommunities,
    requestsSent,
    requestsReceived,
    setRequestsReceived,
    setRequestsSent,
  } = useUser();

  useEffect(() => {
    if (userDetail != null) {
      socket.current = io(process.env.NEXT_PUBLIC_API_BASE_URL, {
        query: { user_id: userDetail.user_id },
      });

      if (socket.current) {
        if (!socket.current.hasListeners("friend-request-accepted")) {
          socket.current.on("friend-request-accepted", async (request) => {
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
              console.error("Error fetching sent friend requests:", error);
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
          });
        }

        if (!socket.current.hasListeners("new-group-member")) {
          socket.current.on("new-group-member", async (data) => {
            console.log("new-group-member:", data);
            await getUser();
          });
        }

        if (!socket.current.hasListeners("received-friend-request")) {
          socket.current.on("received-friend-request", (request) => {
            console.log("Received friend:", request);

            setFriendRequestsReceived((prev) => [...prev, request]);
          });
        }

        if (!socket.current.hasListeners("received-invite-group-request")) {
          socket.current.on("received-invite-group-request", (request) => {
            console.log("Received friend:", request);

            setRequestsReceived((prev) => [...prev, request]);
          });
        }

        if (!socket.current.hasListeners("new-message-to-group")) {
          console.log("Adding new-message-to-group listener...");
          socket.current.on("new-message-to-group", (message) => {
            console.log("Received new-message-to-group:", message);

            setUser_group_messages((prevMessages) => {
              const updatedMessages = { ...prevMessages };
              const messagesId = message.groupId;

              if (messagesId in updatedMessages) {
                updatedMessages[messagesId] = [
                  ...updatedMessages[messagesId],
                  message,
                ];
              } else {
                updatedMessages[messagesId] = [message];
              }

              return updatedMessages;
            });
          });
        } else {
          console.log("Listener for new-message-to-group already exists.");
        }
      }
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [userDetail]);

  useEffect(() => {
    if (userDetail && socket.current) {
      console.log("userDetail------>", userDetail);
      for (let { groupId: group } of userDetail?.groups) {
        socket.current.emit("join-room", {
          room_id: group?._id,
        });
      }

      if (!socket.current.hasListeners("new-group-member")) {
        socket.current.on("new-group-member", async (data) => {
          console.log("new-group-member:", data);
          await getUser();
        });
      }

      if (!socket.current.hasListeners("new-message-to-group")) {
        console.log("Adding new-message-to-group listener...");
        socket.current.on("new-message-to-group", (message) => {
          console.log("Received new-message-to-group:", message);

          setUser_group_messages((prevMessages) => {
            const updatedMessages = { ...prevMessages };
            const messagesId = message.groupId;

            if (messagesId in updatedMessages) {
              updatedMessages[messagesId] = [
                ...updatedMessages[messagesId],
                message,
              ];
            } else {
              updatedMessages[messagesId] = [message];
            }

            return updatedMessages;
          });
        });
      } else {
        console.log("Listener for new-message-to-group already exists.");
      }
    }
  }, [userDetail, socket.current]);

  useEffect(() => {
    const socketInstance = socket.current;

    if (socketInstance && communities) {
      if (!socketInstance.hasListeners("new-message-to-community")) {
        socketInstance.on("new-message-to-community", (message) => {
          console.log("new-message-to-community", message);

          setCommunity_messages((prevMessages) => {
            const updatedMessages = { ...prevMessages };
            const { communityId, channelId } = message;

            if (communityId in updatedMessages) {
              if (!(channelId in updatedMessages[communityId].channel)) {
                updatedMessages[communityId].channel[channelId] = [message];
              } else {
                updatedMessages[communityId] = {
                  channel: {
                    [channelId]: [
                      ...updatedMessages[communityId].channel[channelId],
                      message,
                    ],
                  },
                };
              }
            } else {
              updatedMessages[communityId] = {
                channel: { [channelId]: [message] },
              };
            }

            return updatedMessages;
          });
        });

        if (!socket.current.hasListeners("new-community-member")) {
          socket.current.on("new-community-member", async (data) => {
            console.log("new-community-member:", data);
            await getCommunities();
          });
        }
      }

      // Join rooms for each community
      for (let community of communities) {
        socketInstance.emit("join-room", {
          room_id: community._id,
        });
      }
    }

    return () => {
      // Clean up listeners when component unmounts
      if (socketInstance) {
        socketInstance.off("new-message-to-community");
      }
    };
  }, [communities, socket.current]);

  useEffect(() => {
    if (socket.current && chats?.messages) {
      for (let messages of chats.messages) {
        socket.current.emit("join-room", {
          room_id: messages.dm_messages_id,
        });
      }

      if (!socket.current.hasListeners("user-is-typing")) {
        socket.current.on("user-is-typing", (data) => {
          setUsersTyping((prevSet) => new Set([...prevSet, data.room_id]));
          console.log("User-typing:", data);
        });

        socket.current.on("user-stoped-typing", (data) => {
          const user_still_typing = [...usersTyping].filter(
            (id) => id != data.room_id
          );
          setUsersTyping(new Set([...user_still_typing]));

          console.log("User typing:", data);
        });
      }

      if (!socket.current.hasListeners("new-direct-message")) {
        socket.current.on("new-direct-message", (message) => {
          console.log("new-direct-message", message);

          setUser_messages((prevMessages) => {
            const updatedMessages = { ...prevMessages };
            const messagesId = message.dm_messages_id;

            if (messagesId in updatedMessages) {
              updatedMessages[messagesId] = [
                ...updatedMessages[messagesId],
                message,
              ];
            } else {
              updatedMessages[messagesId] = [message];
            }

            return updatedMessages;
          });
        });
      }
    }
  }, [userDetail, chats, socket.current]);

  const value = {
    socket,
    usersTyping,
    user_messages,
    community_messages,
    user_group_messages,
  };

  return (
    <SocketIoContext.Provider value={value}>
      {children}
    </SocketIoContext.Provider>
  );
}
