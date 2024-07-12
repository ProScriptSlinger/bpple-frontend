import Image from "next/image";
import ImageComponent from "../../.././../components/shared/ImageComponent/demo";
import { getNameInitials } from "../../../../utils/functions/getNameInitials";

const Page2 = ({ onLogin, userData }) => {
  return (
    userData && (
      <div className="fixed right-0 left-0 top-0 bottom-0 mobile:px-[100px] px-[20px] mobile:pt-[100px] pt-[40px] overflow-auto">
        <div>
          <Image
            src="/icon/back_bgwhite.svg"
            className="w-[40px] h-auto"
            width={0}
            height={0}
            alt=""
          />
        </div>
        <div className="w-full items-center inline-flex justify-center mt-[40px]">
          <div className="relative w-[150px]">
            {userData.avatar ? (
              <Image
                src={userData.avatar ?? ""}
                className="w-[150px] aspect-square rounded-full object-cover bg-[#191919] flex items-center justify-center "
                width={200}
                height={200}
                alt={userData.username}
              />
            ) : (
              <div
                className="w-[150px] aspect-square rounded-full
             bg-[#191919] flex items-center justify-center
              text-[#4C4C4C] text-[60px]"
              >
                {getNameInitials(userData?.username ?? "B")}
              </div>
            )}
          </div>
        </div>
        <div className="w-full inline-flex justify-center mt-[40px]">
          <button
            className="w-[250px] h-[40px] bg-[#3772FF] rounded-[12px] text-black font-abeezeeItalic text-[12px] hover:opacity-70 transition-all duration-100"
            onClick={onLogin}
          >
            Log in
          </button>
        </div>
        <button className="w-full text-center text-[#3772FF] text-[12px] mt-[20px]">
          Recovery account?
        </button>
        <p className="w-full text-center text-[12px] mt-[50px]">
          Back to Register or Sign
        </p>
        <div className={`w-full flex justify-center font-ttfirs mt-[40px]`}>
          <div className="inline-flex">
            <button className="w-[50px] mr-[10px] h-[50px] bg-[#898989] bg-opacity-[28%] rounded-[12px] flex items-center justify-center hover:bg-opacity-70 transition-all duration-100">
              <div className="w-[27px]">
                <ImageComponent src={"/icon/phantom.svg"} height={25} />
              </div>
            </button>
            <button className="w-[50px] h-[50px] mr-[10px] bg-[#898989] bg-opacity-[28%] rounded-[12px] flex items-center justify-center hover:bg-opacity-70 transition-all duration-100">
              <div className="w-[27px]">
                <ImageComponent src={"/icon/backpack.svg"} height={25} />
              </div>
            </button>
            <button className="w-[50px] h-[50px] mr-[10px] bg-[#898989] bg-opacity-[28%] rounded-[12px] flex items-center justify-center hover:bg-opacity-70 transition-all duration-100">
              <div className="w-[27px]">
                <ImageComponent src={"/icon/bitrock.svg"} height={25} />
              </div>
            </button>
            <button className="w-[50px] h-[50px] mr-[10px] bg-[#898989] bg-opacity-[28%] rounded-[12px] flex items-center justify-center hover:bg-opacity-70 transition-all duration-100">
              <div className="w-[27px]">
                <ImageComponent src={"/icon/metamask.svg"} height={25} />
              </div>
            </button>
          </div>
        </div>
        <p className="w-full text-center text-[12px] text-[#565656] mt-[30px]">
          By creating your account, you agree in the Biples <br />{" "}
          <span className="text-white">Privacy policy</span> and{" "}
          <span className="text-white">Termes & Conditions</span>
        </p>
      </div>
    )
  );
};

export default Page2;
