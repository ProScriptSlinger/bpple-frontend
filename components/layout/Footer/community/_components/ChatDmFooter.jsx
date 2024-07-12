"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSettingModal } from "../../../../../context/communitysetting";
import { useUser } from "../../../../../context/appContext";
import { useParams, usePathname } from "next/navigation";
import { userFindDmById } from "../../../../../hooks/userFindDmById";
import { handleEndpoint } from "../../../../../utils/api/handleEndpoint";
import { useSocket } from "../../../../../context/socketContext";

import { IoCloudUploadOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";

import { storage } from "../../../../../firebase_config";
import { formatFileSize } from "../../../../../utils/functions/formatFileSize";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { AiFillFilePdf } from "react-icons/ai";
import { handleUploadFiles } from "../../../../../utils/functions/handleUploadFiles";
// import RecordingModal from "../../../../modal/RecordingModal";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const ChatDmFooter = () => {
  const [recordingModal, setRecordingModal] = useState(false);
  const [text, setText] = useState("");
  const [chat, setChat] = useState(null);
  const { chats, userDetail } = useUser();
  const { socket } = useSocket();

  const [file, setFile] = useState(null);
  const [upload, setUpload] = useState(false);
  const [isUploading, setUploading] = useState(false);

  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

  const onSend = () => {
    if (file) {
      sendImage();
    } else {
      onSendTextMessage();
    }
  };

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

  const sendImage = async () => {
    try {
      setUploading(true);
      const ImageResponse = await handleUploadFiles(file, id);
      const time = new Date();

      const message = {
        sender: userDetail._id,
        sender_id: userDetail.user_id,
        type: file?.type?.startsWith("image/") ? "image" : "file",
        link: ImageResponse?.downloadURL,
        when: time.toString(),
        dm_messages_id: id,
        fileName: file.name,
        size: formatFileSize(ImageResponse?.fileInfo.metadata.size),
      };
      await handleSendMessage(message);
    } catch (error) {
      setUploading(false);

      console.log(error);
    }
  };

  const onSendTextMessage = async () => {
    try {
      if (!userDetail || text == "") {
        console.error("User detail not available. or text is null");
        return;
      }

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
      await handleSendMessage(message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMessage = async (message) => {
    const response = await handleEndpoint(
      { message },
      "chat/message",
      "post",
      null
    );
    if (response) {
      setUploading(false);
      setText("");
      setFile(null);
      if (socket.current) {
        socket.current.emit("sent-direct-message", { ...message });
        setUpload(false);
        setFile(null);
      }
    }
  };

  if (pathname.includes(`/groups/join`)) return null;

  const onChangeAttachment = (e) => {
    setUpload(false);
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleKeyPress = (event) => {
    console.log("hande key press ------>", event);
    if (event.key === "Enter") {
      onSend();
    }
  };

  const addEmoji = (emoji) => {
    setText(text + emoji.native);
    setEmojiPickerVisible(false);
  };

  return (
    pathname.includes(`/chats/${id}`) && (
      <>
        <div
          className={`relative inline-flex bg-[#121212] h-[100px] border-t-[1px] border-t-[#2A2A2A] bottom-0 items-center justify-center w-full flex-none`}
        >
          {emojiPickerVisible && (
            <div
              style={{
                position: "absolute",
                bottom: "80px",
                left: "10px",
              }}
              className="z-20"
            >
              {/* <Picker onSelect={addEmoji} /> */}
              <Picker
                data={data}
                onEmojiSelect={(emoji) => addEmoji(emoji)}
                theme={"dark"}
              />
            </div>
          )}
          {file && (
            <div className="  bottom-20 flex absolute p-5 w-full  bg-[#121212] ">
              <div className=" flex items-center gap-5 w-full overflow-y-visible pt-10   overflow-x-auto">
                <div className="  relative text-[14px] justify-between p-2 flex-col flex w-[200px] min-w-[200px]   bg-[#2A2A2A]/50 rounded-lg">
                  <div className=" border-[#4C4C4C] border rounded-lg -top-2 -right-2 flex items-center bg-[#121212] gap-5 p-2 px-4 absolute">
                    <button className="  ">
                      <FaRegEye size={16} />
                    </button>
                    <button
                      onClick={() => setFile(null)}
                      className="  text-red-600"
                    >
                      <RiDeleteBin6Fill size={16} />
                    </button>
                  </div>
                  {file?.type?.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(file)}
                      width={200}
                      height={100}
                      className=" my-10  h-[100px] object-cover w-full flex flex-col  bg-green-400"
                    />
                  ) : (
                    <div className=" flex text-white items-center my-10 justify-center">
                      <AiFillFilePdf size={100} />
                    </div>
                  )}

                  <span>{file.name}</span>
                </div>
              </div>
            </div>
          )}

          <div className="relative w-[97%] h-[50px]">
            <input
              className="w-full h-full bg-[#131313] outline-none border border-[#4C4C4C] rounded-[14px] px-[70px] placeholder-[#4C4C4C]"
              placeholder="Write your message"
              onChange={handleIstyping}
              value={text}
              onKeyPress={(e) => handleKeyPress(e)}
            />
            <div className="absolute left-0 h-full w-[70px] top-0 items-center justify-center inline-flex">
              <button onClick={() => setUpload(!upload)}>
                <Image
                  width={0}
                  height={0}
                  alt=""
                  src="/icon/clip.svg"
                  className="w-[15px] h-auto"
                />
              </button>
              <div
                className={`${
                  upload
                    ? "bottom-10 h-[100px] w-[200px]  z-50"
                    : "-bottom-[1000%] "
                } bg-[#171717] border border-[#4C4C4C] text-[#4C4C4C] absolute rounded-lg `}
              >
                <button className="h-[45px] relative overflow-hidden border-b border-[#4C4C4C] inline-flex items-center mobile:px-[15px] px-[10px] rounded-lg w-[200px] hover:bg-opacity-70">
                  <IoCloudUploadOutline size={24} />
                  <p className=" text-[#4C4C4C] ml-[10px] mr-[10px] mobile:block mt-[3px]">
                    {isUploading ? "Uplloading..." : "Upload a File"}
                  </p>

                  <input
                    onChange={onChangeAttachment}
                    type="file"
                    className="right-0 top-0 h-full absolute opacity-0 w-full flex"
                    onKeyPress={(e) => handleKeyPress(e)}
                  />
                </button>
              </div>
              <button
                onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}
              >
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
              <button onClick={() => setRecordingModal(!recordingModal)}>
                <Image
                  width={0}
                  height={0}
                  alt=""
                  src="/icon/mic.svg"
                  className="w-[15px] h-auto mr-[10px]"
                />
              </button>
              <button
                onClick={onSend}
                className="bg-[#3772FF] ml-[5px] p-[10px] rounded-[7px] mr-[10px]"
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
        {/* <RecordingModal
          recordingModal={recordingModal}
          setRecordingModal={setRecordingModal}
          handleSendMessage={handleSendMessage}
        /> */}
      </>
    )
  );
};
export default ChatDmFooter;
