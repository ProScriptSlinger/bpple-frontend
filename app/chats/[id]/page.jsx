"use client";

import React, { useEffect, useRef, useState } from "react";
import { useUser } from "../../../context/appContext";
import { useDMsById } from "@/hooks/useDMsById";
import { useParams } from "next/navigation";
import MessageComponent from "../../../components/community/Message";
import { useSettingModal } from "../../../context/communitysetting";
import { getNameInitials } from "../../../utils/functions/getNameInitials";
import Image from "next/image";
import { handleEndpoint } from "../../../utils/api/handleEndpoint";
import { useSocket } from "../../../context/socketContext";

const Page = () => {
  let messageCounter = true;
  const { friendProfileModal, setFriendProfileModal } = useSettingModal();
  const [chatsMessages, setChatsMessages] = useState([]);
  const { id } = useParams();
  const { chats, userDetail } = useUser();
  const { user_messages } = useSocket();
  // const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [stored_messages, setStored_Messages] = useState([]);
  const [isLoading, chat] = useDMsById(id, chats);

  const Message = (index, sender) => {
    if (index === 0) {
      return (
        <div className="w-full mt-[20px]">
          <div className="inline-flex items-start">
            <button
              className="mr-[20px]"
              onClick={() => setFriendProfileModal(!friendProfileModal)}
            >
              {sender.avatar ? (
                <Image
                  src={sender.avatar}
                  width={50}
                  height={50}
                  alt={sender.username}
                  className=" max-w-[45px] w-[45px] object-center rounded-full h-[45px]"
                />
              ) : (
                <div
                  className="w-[45px] aspect-square rounded-full
           bg-[#191919] flex items-center justify-center
            text-[#4C4C4C] text-[22px]"
                >
                  {getNameInitials(sender.username ?? "B")}
                </div>
              )}
            </button>
            <div>
              <p className="text-[#2770FF] mt-[5px] mb-[5px] text-[14px]">
                {sender.username}
              </p>
              {MessageComponent(chatsMessages[index], messageCounter)}
            </div>
          </div>
        </div>
      );
    } else {
      if (
        chatsMessages[index].sender_id === chatsMessages[index - 1].sender_id
      ) {
        if (messageCounter === true) {
          return (
            <div className="w-full mt-[10px]">
              <div className="inline-flex">
                <div className="ml-[60px]">
                  {MessageComponent(chatsMessages[index], messageCounter)}
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div className="w-full mobile:text-right text-left mt-[10px]">
              <div className="inline-flex text-left mobile:mr-[60px] mobile:ml-0 ml-[60px] mr-0">
                <div className="w-full">
                  {MessageComponent(chatsMessages[index], messageCounter)}
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
                    {sender.avatar ? (
                      <Image
                        src={sender.avatar}
                        width={50}
                        height={50}
                        alt={sender.username}
                        className=" max-w-[45px] w-[45px] object-center rounded-full h-[45px]"
                      />
                    ) : (
                      <div
                        className="w-[45px] aspect-square rounded-full
           bg-[#191919] flex items-center justify-center
            text-[#4C4C4C] text-[22px]"
                      >
                        {getNameInitials(sender.username ?? "B")}
                      </div>
                    )}
                  </div>
                </button>
                <div>
                  <p className="text-[#2770FF] mt-[5px] mb-[5px] text-[14px]">
                    {sender.username}
                  </p>
                  {MessageComponent(chatsMessages[index], messageCounter)}
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
                    {sender.avatar ? (
                      <Image
                        src={sender.avatar}
                        width={50}
                        height={50}
                        alt={sender.username}
                        className=" max-w-[45px] w-[45px] object-center rounded-full h-[45px]"
                      />
                    ) : (
                      <div
                        className="w-[45px] aspect-square rounded-full
           bg-[#191919] flex items-center justify-center
            text-[#4C4C4C] text-[22px]"
                      >
                        {getNameInitials(sender.username ?? "B")}
                      </div>
                    )}
                  </div>
                </button>
                <div>
                  <p className="text-[#2770FF] mt-[5px] mb-[5px] text-[14px]">
                    {sender.username}
                  </p>
                  {MessageComponent(chatsMessages[index], messageCounter)}
                </div>
              </div>
            </div>
          );
        }
      }
    }
  };

  useEffect(() => {
    if (user_messages[id]) {
      setMessages(user_messages[id]);
    }
  }, [user_messages[id]]);

  const chatContainerRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setWindowWidth(windowWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial margin calculation

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const getDMs = async () => {
      const reponse = await handleEndpoint(
        null,
        `chat/messages/${id}`,
        "get",
        null
      );
      if (reponse) {
        setStored_Messages(reponse);
        console.log("good");
        setMessages();
      }
    };

    getDMs();
  }, [chat, id]);

  useEffect(() => {
    if (stored_messages && messages)
      return setChatsMessages([...stored_messages, ...messages]);

    if (stored_messages && !messages)
      return setChatsMessages([...stored_messages]);
    if (!stored_messages && messages) return setChatsMessages([...messages]);
  }, [stored_messages, messages]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({
        block: "center",
      });
    }
  }, [chatsMessages, id]);

  return (
    <>
      <div className="w-full h-full relative">
        <div
          className={`flex-row px-[40px] overflow-auto w-full flex-initial h-full absolute`}
        >
          {chatsMessages.map((message, index) => {
            let sender;
            if (message.sender_id == userDetail?.user_id) sender = userDetail;
            else sender = chat?.otherUser;

            if (!sender) return null;
            return (
              <div key={index} className="w-full">
                {Message(index, sender)}
              </div>
            );
          })}

          <div ref={chatContainerRef} className="w-full h-[20px]"></div>
        </div>
      </div>
    </>
  );
};
export default Page;
