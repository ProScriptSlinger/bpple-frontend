import Image from "next/image";

const Content = () => {
  const Grid = () => {
    return (
      <div className="w-[550px] h-[20px] relative opacity-10">
        <div className="left-0 top-[89px] absolute flex-col justify-start items-start gap-[92px] flex">
          <div className="w-[550px] h-px bg-purple-500" />
          <div className="w-[550px] h-px bg-purple-500" />
          <div className="w-[550px] h-px bg-purple-500" />
          <div className="w-[550px] h-px bg-purple-500" />
          <div className="w-[550px] h-px bg-purple-500" />
        </div>
        <div className="left-[42px] top-0 absolute justify-start items-start gap-[92px] flex">
          <div className="h-[550px] w-px origin-top-left bg-purple-500" />
          <div className="h-[550px] w-px origin-top-left bg-purple-500" />
          <div className="h-[550px] w-px origin-top-left bg-purple-500" />
          <div className="h-[550px] w-px origin-top-left bg-purple-500" />
          <div className="h-[550px] w-px origin-top-left bg-purple-500" />
          <div className="h-[550px] w-px origin-top-left bg-purple-500" />
        </div>
        {/* <div className="w-[550px] h-[120px] left-0 top-0 absolute bg-gradient-to-b from-neutral-900 to-zinc-950" />
        <div className="w-[550px] h-[181px] left-0 top-[550px] absolute bg-gradient-to-b from-neutral-900 to-zinc-950" /> */}
      </div>
    );
  };
  return (
    <div className="flex-col md:flex-col md:flex lg:flex-col xl:flex-row  justify-between items-center xl:items-start 2xl:items-center pr-0 lg:-6 pl-0 2xl:px-[60px] pb-4 min-h-[65vh] h-fit">
      <div className="pt-10 pl-4 sm:pt-20 sm:pl-9  w-full">
        <div className="flex items-center justify-between ">
          <div className="flex flex-col w-full 2xl:text-[93px] 2xl:leading-[93px]  md:text-[70px] md:leading-[70px] text-[50px] leading-[50px]">
            <span className="text-blue-500 font-semibold font-['Poppins']">
              Create
            </span>
            <span className="text-white font-normal font-['Poppins'] italic">
              Launch
            </span>
            <span className="text-white font-normal font-['Poppins']">
              Trade
            </span>
          </div>
          <Image
            width={0}
            height={0}
            src={"/images/left_badge.svg"}
            alt={"left-banner"}
            className={"w-[294px] h-[84px] mr-[-40px] z-50 hidden xl:block"}
          />
        </div>
        <div className="flex 2xl:text-[93px] 2xl:leading-[93px]  md:text-[70px] md:leading-[70px] text-[50px] leading-[50px]">
          <span className="text-white mr-4 font-semibold font-['Poppins'] text-nowrap">
            Better than
          </span>
          <span className="text-blue-500 pb-0 font-semibold font-['Poppins']">
            ever
            <div className="w-[111px] md:w-[157px]  2xl:w-[210px] border-b-8 border-blue-500 mt-[-5px]" />
          </span>
          <span className="text-blue-500 font-semibold font-['Poppins']">
            .
          </span>
        </div>
        <div class="pt-6 w-full text-left text-gray-300 text-[18px] 2xl:text-[20px]  font-poppins hidden xl:block font-semibold leading-6 break-words">
          Experience the Next Generation of Community-Driven Trading.
        </div>
      </div>
      <div className="flex w-full md:w-fit justify-center xl:justify-start">
        <div className="flex flex-col w-fit ">
          <div className="mt-4 w-[371px] md:w-[505px] mb-16 md:mb-0 2xl:w-[567px] h-fit p-[5px] md:p-[20px] bg-neutral-900 rounded-[40px] border border-gray-800 flex-col inline-flex overflow-hidden items-center">
            <Grid />
            <Image
              width={0}
              height={0}
              src={"/images/landing_banner.svg"}
              alt={"landing-banner"}
              className={
                "w-[313px] md:w-[416px] 2xl:w-[468px] h-[261.34px] rounded-[232px]"
              }
            />
            <div className="w-[370.06px] text-center md:text-left mt-4 h-11 text-white 2xl:text-[32px] font-normal font-['Sora'] leading-[48px] text-[23px] md:text-[25px]">
              Do everything in one place.
            </div>
            <div className="w-[370.06px] mt-4 h-[88.03px] text-[16px] text-gray-500 text-base font-light font-['Sora'] leading-normal hidden md:block">
              Create tokens, build communities, and trade seamlessly in our
              all-in-one platform. <br />
              Experience effortless integration of trading and community
              engagement.
            </div>
          </div>
          <div className="flex justify-between items-center mt-[-55px]">
            <Image
              width={0}
              height={0}
              src={"/images/payment_progress.svg"}
              alt={"landing-banner"}
              className={"w-28 h-28 ml-[-40px] hidden xl:block"}
            />
            <Image
              width={0}
              height={0}
              src={"/images/tab-bar.svg"}
              alt={"landing-banner"}
              className={"w-[236px] h-[72px] mr-[-20px] hidden xl:block"}
            />
            <Image
              width={0}
              height={0}
              src={"/images/tab-bar.svg"}
              alt={"landing-banner"}
              className={
                "w-[236px] h-[72px] ml-[-30px] lg:ml-[-90px] hidden md:block xl:hidden"
              }
            />
            <Image
              width={0}
              height={0}
              src={"/images/payment_progress.svg"}
              alt={"landing-banner"}
              className={"w-28 h-28 mr-[-80px] hidden md:block xl:hidden"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Content;
