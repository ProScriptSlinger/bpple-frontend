import Image from "next/image";

const Footer = () => {
  const Badge = () => {
    return (
      <div className="w-fit h-[53px] bg-neutral-900 rounded-[20px] border border-neutral-700 justify-center items-center gap-2 md:gap-8 inline-flex px-2">
        <div className="w-9 h-[35px] p-1.5 bg-zinc-800 rounded-[20px] justify-center items-center gap-2 flex">
          <Image
            alt="guard"
            src={"/images/guard.svg"}
            width={0}
            height={0}
            className="w-5 h-5 relative"
          />
        </div>
        <div className="justify-start items-center gap-1 flex">
          <div className="text-center text-white text-[15px] text-nowrap font-normal font-['Poppins'] leading-[18px]">
            The most secure launches
          </div>
          <Image
            alt="exclamation"
            src={"/images/exclamation.svg"}
            width={0}
            height={0}
            className="w-5 h-5 relative"
          />
        </div>
      </div>
    );
  };
  return (
    <div className="h-[140px] flex items-center justify-between border-t-[1px] border-[#494848] px-2 md:px-8 ">
      <Badge />
      <div className="flex gap-[14px]">
        <Image
          alt="git lab book"
          src={"/images/git-book-icon-light.svg"}
          width={0}
          height={0}
          className="w-6 h-6 relative"
        />
        <Image
          alt="x_icon"
          src={"/images/x_icon.svg"}
          width={0}
          height={0}
          className="w-6 h-6 relative"
        />
        <Image
          alt="telegram_icon"
          src={"/images/telegram.svg"}
          width={0}
          height={0}
          className="w-6 h-6 relative"
        />
      </div>
    </div>
  );
};

export default Footer;
