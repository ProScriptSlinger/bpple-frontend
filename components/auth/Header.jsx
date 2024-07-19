import Image from "next/image";

const Header = () => {
  const CommunityCard = () => {
    return (
      <div className="hidden md:block">
        <div className="w-fit h-[53px] bg-neutral-900 rounded-[20px] border border-neutral-700 justify-center items-center gap-2 flex px-2  ">
          <div className="w-[35px] h-[35px] flex justify-center items-center bg-zinc-800 rounded-[20px]">
            <Image
              alt="fire"
              width={0}
              height={0}
              className="w-[18px] h-[18px]"
              src="/images/fire.svg"
            />
          </div>
          <div className="justify-start items-center gap-2 flex">
            <div className="text-center text-white text-[15px] font-medium font-['Poppins'] leading-[18px] mr-2">
              $PEPE
            </div>
          </div>
          <Image
            alt="chart"
            width={0}
            height={0}
            className="w-[73.18px] h-6 relative"
            src="/images/chart.svg"
          />
          <div className="w-fit text-emerald-400 text-xs font-medium font-['Poppins'] leading-normal tracking-tight mr-2">
            62.80%
          </div>
          <div className="cursor-pointer w-[37.08px] h-[37.08px] flex justify-center items-center bg-blue-500 rounded-full">
            <Image
              alt="arrow"
              width={0}
              height={0}
              className="w-6 h-6"
              src="/images/arrows-join-2.svg"
            />
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="h-[100px] flex items-center justify-between border-b-[1px] border-[#494848] px-8  mt-4">
      <div className="flex">
        <Image
          alt="logo"
          className="w-[48.22px] h-[43.72px] mr-[70px]"
          width={0}
          height={0}
          src="/images/logo.svg"
        />
        <CommunityCard />
      </div>
      <div className="cursor-pointer w-[197px] h-[57px] px-4 py-3 rounded-[90px] border hover:bg-[#17181A] border-blue-500 justify-center items-center gap-3 inline-flex">
        <div className="text-center text-white text-sm font-bold font-['Poppins']  leading-none">
          Connect Wallet
        </div>
      </div>
    </div>
  );
};
export default Header;
