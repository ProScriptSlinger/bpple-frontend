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

const ReactMediaRecorder = dynamic(
  () => import("react-media-recorder").then((mod) => mod.ReactMediaRecorder),
  {
    ssr: false,
  }
);
const RecordingModal = () => {
  const { recordingModal, setRecordingModal } = useSettingModal();
  // const { isRecording, setRecording } = useState(false);
  const handleStop = (e) => {
    console.log("handleStop ------>", e);
    setRecordingModal(false);
  };
  return (
    recordingModal && (
      <div>
        <div className=" z-50 text-[14px] w-full font-ttfirs fixed  top-0 right-0 h-screen flex items-center justify-center">
          <div className=" bg-[#181818]/40  z-0 text-[14px] w-full font-ttfirs fixed  top-0 right-0 h-screen flex items-center justify-center " />
          <div className=" w-full z-2 relative max-w-[350px] p-10 mx-auto bg-[#181818]/50 backdrop-blur-xl  rounded-3xl  border  border-[#393939]">
            <div className="">
              <ReactMediaRecorder
                audio
                render={({
                  status,
                  startRecording,
                  stopRecording,
                  mediaBlobUrl,
                }) => (
                  <div>
                    <span className="py-12  text-[18px] font-abeezeeItalic  text-center flex  justify-center ">
                      {`Recording( ${status} )`}
                    </span>
                    <audio src={mediaBlobUrl} controls />
                    <div className=" flex items-center gap-10 justify-center mt-10">
                      <button onClick={startRecording}>
                        <div className=" w-[50px] text-black h-[50px] rounded-full flex items-center justify-center  bg-[#53FAFB]">
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
                      <button onClick={() => setRecordingModal(false)}>
                        <div className=" w-[50px] h-[50px] rounded-full flex items-center justify-center  bg-gray-800">
                          <ImCross size={24} />
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
