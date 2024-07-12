import Image from "next/image";

const Page4 = () => {
  return (
    <div className="fixed right-0 left-0 top-0 bottom-0 mobile:px-[100px] px-[20px] flex flex-row mobile:pt-[100px] pt-[40px] overflow-auto">
      <div className="desktop:block hidden desktop:w-[45%] h-full">
        <button
          onClick={() => {
            setPage(2);
          }}
        >
          <Image
            src="/icon/back_bgwhite.svg"
            className="w-[40px] h-auto hover:opacity-70"
            width={0}
            height={0}
            alt=""
          />
        </button>
        <p className="text-[30px] mt-[100px] font-abeezeeItalic">
          Rest your account, Verify you now.
        </p>
        <p className="text-[17px] text-[#4C4C4C] mt-[30px]">
          You can reset your password now, Make sure you remember or you can
          reset It again.
        </p>
      </div>
      <div className="desktop:w-[65%] w-full flex justify-center">
        <div className="w-full flex justify-center">
          <div className="mobile:w-[80%] w-full flex flex-col mt-[150px]">
            <div className="flex items-center relative w-full">
              <Image
                src={"/icon/lock.svg"}
                alt={"refresh"}
                width={0}
                height={0}
                className="absolute color-white ml-[29px] w-[15px] h-auto"
              />
              <input
                className="w-full bg-[#191919] text-white text-[14px] placeholder-[#4C4C4C] outline-none py-[15px] rounded-[15px] pl-[55px] pr-[55px]"
                placeholder={`Type your password`}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Image
                src={"/icon/eye.svg"}
                alt={"refresh"}
                width={0}
                height={0}
                className="absolute color-white right-[25px] w-[15px] h-auto"
              />
            </div>
            <div className="flex items-center relative w-full mt-[20px]">
              <Image
                src={"/icon/lock.svg"}
                alt={"refresh"}
                width={0}
                height={0}
                className="absolute color-white ml-[29px] w-[15px] h-auto"
              />
              <input
                className="w-full bg-[#191919] text-white text-[14px] placeholder-[#4C4C4C] outline-none py-[15px] rounded-[15px] pl-[55px] pr-[55px]"
                placeholder={`Type your password`}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <Image
                src={"/icon/eye.svg"}
                alt={"refresh"}
                width={0}
                height={0}
                className="absolute color-white right-[25px] w-[15px] h-auto"
              />
            </div>
            <div
              className={`w-full text-center text-[#3772FF] text-[12px] mt-[15px] ${
                show ? "block" : "hidden"
              }`}
            >
              Great Your Password is matched!
            </div>
            <button className="w-full rounded-[12px] bg-[#3772FF] h-[45px] text-black mt-[100px] font-abeezeeItalic hover:bg-opacity-70 transition-all duration-100">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page4;
