import { MdOutlineCall, MdOutlineCallEnd } from "react-icons/md";
import { getNameInitials } from "../../utils/functions/getNameInitials";
import { CiMicrophoneOff, CiMicrophoneOn } from "react-icons/ci";

const InCallModal = ({ cancelCall, callDetails, isMuted, toggleMute }) => {
  const { receiver } = callDetails;
  return (
    <div>
      <div className=" z-50 text-[14px] w-full font-ttfirs fixed  top-0 right-0 h-screen flex items-center justify-center">
        <div className=" bg-[#181818]/40  z-0 text-[14px] w-full font-ttfirs fixed  top-0 right-0 h-screen flex items-center justify-center " />
        <div className=" w-full z-2 relative py-20 max-w-[350px] p-10 mx-auto bg-[#181818]/50 backdrop-blur-xl  rounded-3xl  border  border-[#393939]">
          <span className="  text-[18px] font-abeezeeItalic  text-center flex  justify-center ">
            In Call
          </span>
          <div className=" mt-10">
            {receiver?.avatar ? (
              <img
                src={receiver?.avatar}
                className="w-[100px] aspect-square rounded-full mx-auto
               object-cover bg-[#191919] flex items-center justify-center "
                width={200}
                height={200}
                alt={"YC EC"}
              />
            ) : (
              <div
                className="w-[100px] aspect-square rounded-full mx-auto
             bg-[#191919] flex items-center   border  border-[#393939] justify-center
              text-[#4C4C4C] text-[40px]"
              >
                {getNameInitials(receiver?.username ?? "B")}
              </div>
            )}
            <div className=" font-medium mt-5 flex  text-center justify-center">
              <span>{receiver?.username}</span>
            </div>
          </div>

          <div className=" flex items-center gap-10 justify-center mt-10">
            <button
              className=" gap-1 flex flex-col items-center justify-center"
              onClick={() => toggleMute()}
            >
              <div className=" w-[50px] text-black h-[50px] rounded-full flex items-center justify-center  bg-[#3772FF]">
                {isMuted ? (
                  <CiMicrophoneOn size={24} />
                ) : (
                  <CiMicrophoneOff size={24} />
                )}
              </div>
              <span>Mute Call</span>
            </button>
            <button
              className=" gap-1 flex flex-col items-center justify-center"
              onClick={() => cancelCall()}
            >
              <div className=" w-[50px] h-[50px] rounded-full flex items-center justify-center  bg-[#F31816]">
                <MdOutlineCall size={24} />
              </div>
              <span>End Call</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InCallModal;
