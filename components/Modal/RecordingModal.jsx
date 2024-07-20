"use client";

import { MdOutlineCall, MdOutlineCallEnd } from "react-icons/md";
import { getNameInitials } from "../../utils/functions/getNameInitials";
import { CiMicrophoneOff, CiMicrophoneOn } from "react-icons/ci";
import { useSettingModal } from "../../context/communitysetting";
import { FaPlay } from "react-icons/fa6";
import { FaStop } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import dynamic from "next/dynamic";
import { ImCross } from "react-icons/im";
import { handleUploadFiles } from "@/utils/functions/handleUploadFiles";
import { useUser } from "@/context/appContext";
import Image from "next/image";
import { useState } from "react";
import { formatFileSize } from "@/utils/functions/formatFileSize";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ReactMediaRecorder = dynamic(
  () => import("react-media-recorder").then((mod) => mod.ReactMediaRecorder),
  {
    ssr: false,
  }
);
const RecordingModal = (props) => {
  const { recordingModal, setRecordingModal, handleSendMessage } = props;
  const [isUploading, setUploading] = useState(false);
  const { userDetail } = useUser();
  const [fileName, setFileName] = useState("");
  const handleStop = (e) => {
    console.log("handleStop ------>", e);
    setRecordingModal(false);
  };

  const handleSaveFile = async (mediaBlobUrl) => {
    try {
      const response = await fetch(mediaBlobUrl);
      const blob = await response.blob();
      // Get the current date and format it
      const now = new Date();
      const formattedDate = `${now.getFullYear()}-${String(
        now.getMonth() + 1
      ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}_${String(
        now.getHours()
      ).padStart(2, "0")}-${String(now.getMinutes()).padStart(2, "0")}-${String(
        now.getSeconds()
      ).padStart(2, "0")}`;
      // Create a file name with the current date
      const fileName = `${userDetail.username}_${formattedDate}.wav`;

      const file = new File([blob], fileName, { type: "audio/wav" });
      const savedFile = await handleUploadFiles(file, "voice_message");
      return savedFile;
    } catch (error) {
      console.error("Error saving file", error);
    }
  };

  const handleSend = async (mediaBlobUrl) => {
    try {
      if (fileName == "") return;
      setUploading(true);

      const audioRes = await handleSaveFile(mediaBlobUrl);
      const time = new Date();

      const message = {
        sender: userDetail._id,
        sender_id: userDetail.user_id,
        type: "audio",
        link: audioRes?.downloadURL,
        when: time.toString(),
        dm_messages_id: id,
        fileName: fileName,
        size: formatFileSize(audioRes?.fileInfo.metadata.size),
      };

      await handleSendMessage(message);
      setFileName("");
      setUploading(false);
      setRecordingModal(false);
    } catch (error) {
      setUploading(false);

      console.log(error);
    }
  };

  return (
    recordingModal && (
      <div>
        <div className=" z-50 text-[14px] w-full font-ttfirs fixed  top-0 right-0 h-screen flex items-center justify-center">
          <div className=" bg-[#181818]/40  z-0 text-[14px] w-full font-ttfirs fixed  top-0 right-0 h-screen flex items-center justify-center " />
          <div className=" w-full z-2 relative max-w-[350px] p-10 mx-auto bg-[#181818]/50 backdrop-blur-xl  rounded-3xl  border  border-[#393939]">
            <div className="w-full flex justify-end">
              <button
                onClick={() => {
                  setFileName("");
                  setRecordingModal(false);
                }}
              >
                <ImCross size={12} />
              </button>
            </div>
            <div className="">
              <ReactMediaRecorder
                audio
                render={({
                  status,
                  startRecording,
                  stopRecording,
                  mediaBlobUrl,
                }) => (
                  <div className="flex flex-col items-center">
                    <span className="py-6  text-[18px] font-abeezeeItalic  text-center flex  justify-center ">
                      {`Recording( ${status} )`}
                    </span>
                    <audio src={mediaBlobUrl} controls />
                    <input
                      className="w-full h-[40px] bg-[#131313] outline-none border border-[#4C4C4C] rounded-[14px] px-[20px] my-6 placeholder-[#4C4C4C]"
                      placeholder="Write your message"
                      onChange={(e) => setFileName(e.target.value)}
                      value={fileName}
                    />
                    <div className=" flex items-center gap-10 justify-center mt-4">
                      <button onClick={startRecording}>
                        <div className=" w-[50px] text-white h-[50px] rounded-full flex items-center justify-center  bg-[#3772FF]">
                          {status == "idle" ? (
                            <FaPlay size={24} />
                          ) : (
                            <FaPause size={24} />
                          )}
                        </div>
                      </button>
                      <button onClick={stopRecording}>
                        <div className=" w-[50px] h-[50px] rounded-full flex items-center justify-center  bg-[#F31816]">
                          <FaStop size={24} />
                        </div>
                      </button>
                      <button onClick={() => handleSend(mediaBlobUrl)}>
                        <div className=" w-[50px] h-[50px] rounded-full flex items-center justify-center  bg-[#3772FF]">
                          {isUploading ? (
                            <AiOutlineLoading3Quarters
                              size={24}
                              className=" animate-spin"
                            />
                          ) : (
                            <Image
                              width={0}
                              height={0}
                              alt=""
                              src="/icon/send.svg"
                              className="w-[15px] h-auto"
                            />
                          )}
                        </div>
                      </button>
                    </div>
                  </div>
                )}
                onStop={handleStop}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default RecordingModal;
