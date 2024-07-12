"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import MessageComponent from "../../../../components/community/Message";
import { useSettingModal } from "../../../../context/communitysetting";
import { handleEndpoint } from "../../../../utils/api/handleEndpoint";
import { useUser } from "../../../../context/appContext";
import { useSocket } from "../../../../context/socketContext";
import { getNameInitials } from "../../../../utils/functions/getNameInitials";

const Community = () => {
  let messageCounter = true;
  const { friendProfileModal, setFriendProfileModal } = useSettingModal();

  const Message = (index) => {
    if (index === 0) {
      return (
        <div className="w-full mt-[20px]">
          <div className="inline-flex items-start">
            <button
              className="mr-[20px]"
              onClick={() => setFriendProfileModal(!friendProfileModal)}
            >
              {messages[index]?.senderId.avater ? (
                <Image
                  src={messages[index].avatar}
                  width={0}
                  height={0}
                  alt=""
                  className="w-[40px] h-auto"
                />
              ) : (
                <div
                  className="w-[45px] aspect-square rounded-full
                  bg-[#191919] flex items-center justify-center
                    text-[#4C4C4C] text-[22px]"
                >
                  {getNameInitials(messages[index]?.senderId.username ?? "B")}
                </div>
              )}
            </button>
            <div>
              <p className="text-[#2770FF] mt-[5px] mb-[5px] text-[14px]">
                {messages[index].senderId.username}
              </p>
              {MessageComponent(messages[index], messageCounter)}
            </div>
          </div>
        </div>
      );
    } else {
      if (messages[index].senderId._id === messages[index - 1].senderId._id) {
        if (messageCounter === true) {
          return (
            <div className="w-full mt-[10px]">
              <div className="inline-flex">
                <div className="ml-[60px]">
                  {MessageComponent(messages[index], messageCounter)}
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div className="w-full mobile:text-right text-left mt-[10px]">
              <div className="inline-flex text-left mobile:mr-[60px] mobile:ml-0 ml-[60px] mr-0">
                <div className="w-full">
                  {MessageComponent(messages[index], messageCounter)}
                </div>
              </div>
            </div>
          );
        }
      } else {
        messageCounter = !messageCounter;
        if (messageCounter === false) {
          return (
            <div className="w-full mobile:text-right text-left mt-[10px]">
              <div className="mobile:text-right flex mobile:flex-row-reverse items-start">
                <button
                  className="mobile:ml-[20px] mobile:mr-0 mr-[20px]"
                  onClick={() => setFriendProfileModal(!friendProfileModal)}
                >
                  <div className="w-[40px] flex flex-none">
                    {messages[index]?.senderId.avater ? (
                      <Image
                        src={messages[index].avatar}
                        width={0}
                        height={0}
                        alt=""
                        className="w-[40px] h-auto"
                      />
                    ) : (
                      <div
                        className="w-[45px] aspect-square rounded-full
             bg-[#191919] flex items-center justify-center
              text-[#4C4C4C] text-[22px]"
                      >
                        {getNameInitials(
                          messages[index]?.senderId.username ?? "B"
                        )}
                      </div>
                    )}
                  </div>
                </button>
                <div>
                  <p className="text-[#2770FF] mt-[5px] mb-[5px] text-[14px]">
                    {messages[index].senderId.username}
                  </p>
                  {MessageComponent(messages[index], messageCounter)}
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div className="w-full mt-[10px]">
              <div className="inline-flex text-left items-start">
                <button
                  className="mr-[20px]"
                  onClick={() => setFriendProfileModal(!friendProfileModal)}
                >
                  <div className="w-[40px] flex flex-none">
                    {messages[index]?.senderId.avater ? (
                      <Image
                        src={messages[index].avatar}
                        width={0}
                        height={0}
                        alt=""
                        className="w-[40px] h-auto"
                      />
                    ) : (
                      <div
                        className="w-[45px] aspect-square rounded-full
             bg-[#191919] flex items-center justify-center
              text-[#4C4C4C] text-[22px]"
                      >
                        {getNameInitials(
                          messages[index]?.senderId.username ?? "B"
                        )}
                      </div>
                    )}
                  </div>
                </button>
                <div>
                  <p className="text-[#2770FF] mt-[5px] mb-[5px] text-[14px]">
                    {messages[index].senderId.username}
                  </p>
                  {MessageComponent(messages[index], messageCounter)}
                </div>
              </div>
            </div>
          );
        }
      }
    }
  };

  const chatContainerRef = useRef(null);
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(0);
  const { channel, communityId } = useParams();
  const [messages, setMessages] = useState([]);
  const [storedMessages, setStoredMessages] = useState([]);
  const { communities } = useUser();
  const { community_messages } = useSocket();
  const [channelData, setChannelData] = useState(null);

  useEffect(() => {
    const handleFindChannel = () => {
      const communityData = communities?.find(
        (community) => community._id == communityId
      );

      if (communityData && channel) {
        const chal = communityData.channels?.find(
          ({ channelId: item }) => item.name === channel
        );

        setChannelData(chal);
      }
    };
    handleFindChannel();
  }, [communityId, channel, communities]);

  useEffect(() => {
    const getMessages = async () => {
      if (channelData) {
        console.log(channelData);
        try {
          const response = await handleEndpoint(
            null,
            `community/${communityId}/channel/${channelData._id}`,
            "get",
            null
          );

          if (response.ok && response?.messages.length > 0) {
            setStoredMessages(response.messages);
            console.log(response);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    getMessages();
  }, [communityId, channelData]);

  // useEffect(() => {
  //   if (community_messages[communityId]?.channel[channelData?._id]) {
  //     setMessages([
  //       ...storedMessages,
  //       ...community_messages[communityId]?.channel[channelData?._id],
  //     ]);
  //   } else {
  //     setMessages([...storedMessages]);
  //   }
  // }, [community_messages, channelData, communityId]);

  // useEffect(() => {
  //   if (storedMessages) {
  //     setMessages([...storedMessages]);
  //   }
  // }, [storedMessages]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({
        block: "center",
      });
    }
  }, [messages, channel]);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setWindowWidth(windowWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const msgList = [
    {
      type: "context",
      content:
        "Hello world please let me know if this NFTs can be more than cryptocurrencies in the mint world of NFTs, you can use our platform",
      senderId: {
        _id: "id_1",
        username: "Mussa OUEL",
        avatar: "/community/icons/MsgIcon.svg",
      },
      emoji: ["hot_face", "head_bandage", "rage"],
      link: "https://test_link",
      readStatus: true,
      when: "Yesterday 03:21 PM",
    },
    {
      type: "context",
      content:
        "Hello world please let me know if this NFTs can be more than cryptocurrencies in the mint world of NFTs, you can use our platform",
      senderId: {
        _id: "id_1",
        username: "Mussa OUEL",
        avatar: "/community/icons/MsgIcon.svg",
      },
      emoji: ["hot_face", "head_bandage", "rage"],
      link: "https://test_link",
      readStatus: true,
      when: "Yesterday 03:21 PM",
    },
    {
      type: "voice",
      senderId: {
        _id: "id_1",
        username: "Mussa OUEL",
        avatar: "/community/icons/MsgIcon.svg",
      },
      length: "0:21",
      emoji: ["hot_face", "head_bandage", "rage"],
      link: "https://test_link",
      readStatus: true,
      when: "Yesterday 03:21 PM",
    },
    {
      type: "voice",
      senderId: {
        _id: "id_1",
        username: "Mussa OUEL",
        avatar: "/community/icons/MsgIcon.svg",
      },
      isPlaying: true,
      length: "0:19",
      emoji: ["hot_face", "head_bandage", "rage"],
      link: "https://test_link",
      readStatus: true,
      when: "2024/07/12",
    },
    {
      type: "file",
      fileName: "Fichier.pdf",
      size: "0 KB – 291 MB ",
      senderId: {
        _id: "id_1",
        username: "Mussa OUEL",
        avatar: "/community/icons/MsgIcon.svg",
      },
      img_uri: "/community/icons/file.svg",
      emoji: ["hot_face", "head_bandage", "rage"],
      link: "https://test_link",
      readStatus: true,
      when: "2024/07/12",
    },
  ];

  useEffect(() => {
    setMessages(msgList);
  }, []);

  return (
    <>
      <div className="w-full h-full relative">
        <div
          className={`flex-row px-[40px] overflow-auto w-full flex-initial h-full absolute`}
        >
          {messages.map((item, index) => (
            <div key={index} className="w-full">
              {Message(index)}
            </div>
          ))}
          <div ref={chatContainerRef} className="w-full h-[20px]"></div>
        </div>
      </div>
    </>
  );
};

export default Community;
