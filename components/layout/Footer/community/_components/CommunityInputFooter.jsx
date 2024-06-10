"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSettingModal } from "../../../../../context/communitysetting";
import { useUser } from "../../../../../context/appContext";
import { useParams, usePathname } from "next/navigation";
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

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const CommunityInputFooter = () => {
  const { callActionModal, setCallActionModal } = useSettingModal();
  const [text, setText] = useState("");
  const { userDetail, communities } = useUser();
  const { socket } = useSocket();

  const [file, setFile] = useState(null);
  const [upload, setUpload] = useState(false);
  const [isUploading, setUploading] = useState(false);

  const { communityId, channel } = useParams();
  const [channelData, setChannelData] = useState(null);
  const pathname = usePathname();
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

  useEffect(() => {
    const handleFindChannel = () => {
      const communityData = communities?.find(
        (community) => community._id == communityId
      );

      if (communityData && channel) {
        const chal = communityData.channels?.find(
          (item) => item.channelId.name === channel
        );

        setChannelData(chal);
      }
    };
    communities && handleFindChannel();
  }, [communityId, channel, communities]);

  const handleIstyping = (e) => {
    setText(e.target.value);
  };

  const sendTextMessage = async () => {
    console.log(channelData);
    try {
      if (!userDetail || text == "") {
        console.error("User detail not available. or text is null");
        return;
      }

      const time = new Date();
      const textmessage = text;

      const messageData = {
        type: "context",
        content: textmessage,
        when: time.toString(),
        communityId: communityId,
        channelId: channelData._id,
      };

      if (socket.current) {
        socket.current.emit("user-sent-message-to-community", {
          ...messageData,
          senderId: userDetail,
        });
        setText("");
        const response = await handleEndpoint(
          { senderId: userDetail._id, messageData },
          `community/${communityId}/messages`,
          "post",
          null
        );
        if (response) {
          console.log("sennt ======>", response);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeAttachment = (e) => {
    setUpload(false);
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const onSend = () => {
    if (file) {
      sendImage();
    } else {
      sendTextMessage();
    }
  };

  const sendImage = async () => {
    try {
      setUploading(true);
      const ImageResponse = await handleUploadFiles(file, communityId);
      const time = new Date();

      const messageData = {
        type: file?.type?.startsWith("image/") ? "image" : "file",
        link: ImageResponse?.downloadURL,
        when: time.toString(),
        communityId: communityId,
        fileName: file.name,
        size: formatFileSize(ImageResponse?.fileInfo.metadata.size),
        channelId: channelData._id,
      };

      const response = await handleEndpoint(
        { senderId: userDetail._id, messageData },
        `community/${communityId}/messages`,
        "post",
        null
      );
      if (response) {
        setUploading(false);

        console.log("sennt ======>", response);
        if (socket.current) {
          socket.current.emit("user-sent-message-to-community", {
            ...messageData,
            senderId: userDetail,
          });
          setUpload(false);
          setFile(null);
        }
      }
    } catch (error) {
      setUploading(false);

      console.log(error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSend();
    }
  };

  const addEmoji = (emoji) => {
    setText(text + emoji.native);
    setEmojiPickerVisible(false);
  };

  if (pathname.includes(`join`)) return null;

  return (
    pathname.includes(`/community/${communityId}`) && (
      <>
        <div
          className={`  relative inline-flex bg-[#121212] h-[100px] border-t-[1px] border-t-[#2A2A2A] bottom-0 items-center justify-center w-full flex-none`}
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
              className="w-full border-[#4C4C4C] h-full bg-[#131313] outline-none border  rounded-[14px] px-[70px] placeholder-[#4C4C4C]"
              placeholder="Write your message to group"
              onChange={handleIstyping}
              value={text}
              onKeyPress={(e) => handleKeyPress(e)}
            />
            <div className="absolute left-0 h-full w-[70px] top-0 items-center justify-center inline-flex">
              <div className=" flex  relative">
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
                  } bg-[#171717] border border-[#4C4C4C] text-[#4C4C4C] absolute rounded-lg`}
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
                      onKeyPress={handleKeyPress}
                    />
                  </button>
                </div>
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
                onClick={onSend}
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
export default CommunityInputFooter;
