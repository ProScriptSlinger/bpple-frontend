"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSettingModal } from "../../../../../context/communitysetting";
import { useUser } from "../../../../../context/appContext";
import { useParams, usePathname } from "next/navigation";
import { userFindDmById } from "../../../../../hooks/userFindDmById";
import { handleEndpoint } from "../../../../../utils/api/handleEndpoint";
import { useSocket } from "../../../../../context/socketContext";

const ChatDmFooter = () => {
  const { callActionModal, setCallActionModal } = useSettingModal();
  const [text, setText] = useState("");
  const [chat, setChat] = useState(null);
  const { chats, userDetail } = useUser();
  const { socket } = useSocket();

  const { id } = useParams();
  const pathname = usePathname();
  userFindDmById(id, chats, setChat);

  const handleIstyping = (e) => {
    setText(e.target.value);
    let isTyping_id;
    clearTimeout(isTyping_id);

    isTyping_id = setTimeout(() => {
      if (socket.current) {
        socket.current.emit("typing", { room_id: id });
      }
    }, 2000);
  };

  const onSendTextMessage = async () => {
    try {
      if (!userDetail) return;
      const time = new Date();
      const textmessage = text;
      const message = {
        sender: userDetail._id,
        sender_id: userDetail.user_id,
        recipient_id: chat.otherUser_id,
        dm_messages_id: id,
        type: "context",
        content: textmessage,
        when: time.toString(),
      };
      if (socket.current) {
        socket.current.emit("sent-direct-message", { ...message });
        setText("");
      }
      const reponse = await handleEndpoint(
        { message },
        "chat/message",
        "post",
        null
      );
      if (reponse) {
        console.log(" socket.current.emit(user-send-dm { ...message })");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (pathname.includes(`/groups/join`)) return null;

  return (
    pathname.includes(`/chats/${id}`) && (
      <>
        <div
          className={`inline-flex bg-[#121212] h-[100px] border-t-[1px] border-t-[#2A2A2A] bottom-0 items-center justify-center w-full flex-none`}
        >
          <div className="relative w-[97%] h-[50px]">
            <input
              className="w-full h-full bg-[#131313] outline-none border border-[#4C4C4C] rounded-[14px] px-[70px] placeholder-[#4C4C4C]"
              placeholder="Write your message"
              onChange={handleIstyping}
              value={text}
            />
            <div className="absolute left-0 h-full w-[70px] top-0 items-center justify-center inline-flex">
              <button>
                <Image
                  width={0}
                  height={0}
                  alt=""
                  src="/icon/clip.svg"
                  className="w-[15px] h-auto"
                />
              </button>
              <button>
                <Image
                  width={0}
                  height={0}
                  alt=""
                  src="/icon/smile.svg"
                  className="ml-[10px] w-[15px] h-auto"
                />
              </button>
            </div>
            <div className="absolute right-0 h-full w-[70px] top-0 items-center justify-center inline-flex">
              <button onClick={() => setCallActionModal(!callActionModal)}>
                <Image
                  width={0}
                  height={0}
                  alt=""
                  src="/icon/mic.svg"
                  className="w-[15px] h-auto mr-[10px]"
                />
              </button>
              <button
                onClick={onSendTextMessage}
                className="bg-[#53FAFB] ml-[5px] p-[10px] rounded-[7px] mr-[10px]"
              >
                <Image
                  width={0}
                  height={0}
                  alt=""
                  src="/icon/send.svg"
                  className="w-[15px] h-auto"
                />
              </button>
            </div>
          </div>
        </div>
      </>
    )
  );
};
export default ChatDmFooter;
