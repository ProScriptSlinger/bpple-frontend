import { MdOutlineCall, MdOutlineCallEnd } from "react-icons/md";
import { getNameInitials } from "../../utils/functions/getNameInitials";
import { Image } from "next/image";


const IncomingCallModal = ({}) => {
  const caller = {
    username: "Canon Samson",
  };

  const JoinCall = () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const DeclineCall = () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className=" z-50 text-[14px] w-full font-ttfirs fixed  top-0 right-0 h-screen flex items-center justify-center">
        <div className=" bg-[#181818]/40  z-0 text-[14px] w-full font-ttfirs fixed  top-0 right-0 h-screen flex items-center justify-center " />
        <div className=" w-full z-2 relative py-20 max-w-[350px] p-10 mx-auto bg-[#181818]/50 backdrop-blur-xl  rounded-3xl  border  border-[#393939]">
          <span className="  text-[18px] font-abeezeeItalic  text-center flex  justify-center ">
            Incoming Call ...
          </span>
          <div className=" mt-10">
            {caller?.avatar ? (
              <Image
                src={"/avatar/2.svg"}
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
                {getNameInitials(caller?.username ?? "B")}
              </div>
            )}
            <div className=" font-medium mt-5 flex  text-center justify-center">
              <span>{caller?.username}</span>
            </div>
          </div>

          <div className=" flex items-center gap-5 justify-center mt-10">
            <button
              onClick={JoinCall}
              className=" gap-1 flex flex-col items-center justify-center"
            >
              <div className=" w-[50px] text-black h-[50px] rounded-full flex items-center justify-center  bg-[#53FAFB]">
                <MdOutlineCall size={24} />
              </div>
              <span>Answer Call</span>
            </button>
            <button
              onClick={DeclineCall}
              className=" gap-1 flex flex-col items-center justify-center"
            >
              <div className=" w-[50px] h-[50px] rounded-full flex items-center justify-center  bg-[#F31816]">
                <MdOutlineCallEnd size={24} />
              </div>
              <span>Decline Call</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomingCallModal;
