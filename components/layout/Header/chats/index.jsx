"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { useUser } from "../../../../context/appContext";
import { getNameInitials } from "../../../../utils/functions/getNameInitials";
import GroupHeader from "./_components/GroupHeader";
import { useSocket } from "../../../../context/socketContext";
import { usePeerConnection } from "../../../../context/peerContext";

const ChatsHeader = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { chats, userDetail } = useUser();
  const { usersTyping, socket } = useSocket();
  const pathname = usePathname();
  const [chat, setChat] = useState(null);

  const { call, setCall, calling, setCalling, setCallDetails } =
    usePeerConnection();

  useEffect(() => {
    const handleFindChat = () => {
      if (!chats.messages) return;
      const chatById = chats.messages.find((dm) => dm.dm_messages_id == id);
      setChat(chatById);
    };

    handleFindChat();
    console.log("Other one ----->", chat?.otherUser);
  }, [id, chats]);

  useEffect(() => {
    if (socket.current) {
      socket.current.emit("join-room", { room_id: id });
    }
  }, [socket.current]);

  if (pathname.includes(`/chats/groups/`)) return <GroupHeader />;

  return (
    <>
      <div className="w-full inline-flex justify-between mt-[40px]">
        {loading && (
          <div className={`inline-flex items-center`}>
            <div className="w-[45px] aspect-square rounded-full bg-[#171717] animate-pulse"></div>
            <div className="ml-[10px]">
              <div className="w-[100px] h-[20px] rounded-[10px] bg-[#171717] animate-pulse mb-[3px]"></div>
              <div className="w-[150px] h-[20px] rounded-[10px] bg-[#171717] animate-pulse"></div>
            </div>
          </div>
        )}
        <button
          className={`inline-flex items-center hover:opacity-70 ${
            loading && "hidden"
          }`}
        >
          <Image
            src={chat?.otherUser?.avatar ?? "/avatar/2.svg"}
            className={` w-[45px] aspect-square rounded-full ${
              !chat?.otherUser?.avatar && "hidden"
            }   object-cover bg-[#191919] flex items-center justify-center `}
            width={50}
            height={50}
            alt={chat?.otherUser?.username}
            onLoad={() => {
              setLoading(false);
            }}
          />
          {chat?.otherUser?.avatar == null && (
            <div
              className="w-[45px] aspect-square rounded-full
             bg-[#191919] flex items-center justify-center
              text-[#4C4C4C] text-[22px]"
            >
              {getNameInitials(chat?.otherUser?.username ?? "B")}
            </div>
          )}
          <div
            className="ml-[10px] flex flex-col  items-start justify-start
           text-start capitalize"
          >
            <p> {chat?.otherUser?.username} </p>
            <p className="text-[#50FFFF] text-[12px]">
              {[...usersTyping]?.includes(id) &&
                ` ${chat?.otherUser?.username} is typing ...`}
            </p>
          </div>
        </button>
        <div className=" flex-1 relative">
          {loading && (
            <div className="w-full rounded-[10px] bg-[#171717] animate-pulse h-[40px]"></div>
          )}

          <Image
            src="/icon/search_grey.svg"
            width={0}
            height={0}
            alt="logo"
            className={`w-[14px] h-auto absolute left-[25px] top-[13px] ${
              loading && "hidden"
            }`}
          />
          <input
            className={`py-[10px] w-full outline-none bg-[#181818] px-[50px] text-[14px] rounded-[12px] placeholder:text-[#4C4C4C] placeholder:text-[12px] ${
              loading && "hidden"
            }`}
            placeholder="Search Friends"
          />
        </div>
        <div className="inline-flex">
          {loading && (
            <div className="w-[40px] rounded-[10px] aspect-square bg-[#171717] animate-pulse mr-[20px]"></div>
          )}
          <Image
            width={0}
            height={0}
            src="/icon/phone.svg"
            alt=""
            className={`w-[20px] h-auto mr-[20px] ${loading && "hidden"}`}
          />
          {loading && (
            <div className="w-[40px] rounded-[10px] aspect-square bg-[#171717] animate-pulse mr-[20px]"></div>
          )}
          <Image
            onClick={() => {
              // console.log("Set Call funtions------>");
              // setCall(true);
              setCallDetails({
                caller: userDetail,
                receiver: chat.otherUser,
                room_id: id,
              });
              setCalling(true);
            }}
            width={0}
            height={0}
            src="/icon/camera_white.svg"
            alt="camera"
            className={`w-[27px] h-auto mr-[20px] cursor-pointer ${
              loading && "hidden"
            }`}
          />
          {loading && (
            <div className="w-[40px] rounded-[10px] aspect-square bg-[#171717] animate-pulse mr-[20px]"></div>
          )}
          <Image
            width={0}
            height={0}
            src="/icon/detail.svg"
            alt=""
            className={`w-[5px] h-auto ${loading && "hidden"}`}
          />
        </div>
      </div>
    </>
  );
};
export default ChatsHeader;
