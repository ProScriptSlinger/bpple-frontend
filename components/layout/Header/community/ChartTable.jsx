import { useState } from "react";
import { MdMenu } from "react-icons/md";
import Image from "next/image";
const ChartTable = (props) => {
  const Label = (props) => {
    const { label, isActivated, className } = props;
    return (
      <p
        className={`${
          isActivated ? "text-white bg-[#353945]" : "text-[#777E90]"
        } px-4 cursor-pointer hover:bg-[#2A2A2A] ${className}`}
        onClick={props.onClick}
      >
        {label}
      </p>
    );
  };
  const labels = [
    { label: "Time" },
    { label: "1H" },
    { label: "4H" },
    { label: "1D", isActivated: true },
    { label: "1W" },
    { label: "1M" },
  ];
  const tableLabels = [
    "Marketer Traders",
    "My trades",
    "Open orders",
    "Favorites",
  ];
  const [tableMenu, setTableMenu] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  return (
    <div className="flex py-4 justify-between w-full">
      <div className="flex flex-col w-[64%] mx-4">
        <div className="flex flex-wrap justify-between gap-2 items-center">
          <div
            className="relative"
            onClick={() => setMenuVisible(!menuVisible)}
          >
            <div className="p-1 bg-[#2A2A2A]  rounded-md">
              <MdMenu className="text-white text-[20px]" />
            </div>
            {menuVisible && (
              <div className="flex flex-col gap-2 absolute top-8 left-0 bg-[#191919] py-2 rounded-sm">
                {labels.map((item, index) => (
                  <Label key={index} {...item} />
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-1">
            <p className="text-[#FF6838] text-[10px]">65.254K</p>
            <p className="text-[#777E90] text-[10px]">Vol(USDT):</p>
            <p className="text-[#FF6838] text-[10px]">2.418B</p>
          </div>
          <div className="flex gap-2">
            <Label
              label="Trading view"
              isActivated={true}
              className={"rounded-full hover:rounded-full"}
            />
            <Label
              label="Depth"
              isActivated={false}
              className={"rounded-full hover:rounded-full"}
            />
            <Image
              src="/community/icons/Line.svg"
              width={0}
              height={0}
              alt="user_green"
              className="w-[20px] h-auto ml-4"
            />
          </div>
        </div>
        <div className="border-b-[1px] border-b-[#2A2A2A] w-full py-2" />
        <Image
          src="/community/icons/container.svg"
          width={0}
          height={0}
          className="w-full"
        />
      </div>
      <div className="flex flex-col mx-2 pr-4 w-[36%]">
        <div
          className="relative w-fit"
          onClick={() => setTableMenu(!tableMenu)}
        >
          <div className="p-1 bg-[#2A2A2A]  rounded-md">
            <MdMenu className="text-white text-[20px]" />
          </div>
          {tableMenu && (
            <div className="flex flex-col gap-2 absolute top-8 w-[180px] left-0 bg-[#191919] py-2 rounded-sm">
              {tableLabels.map((item, index) => (
                <Label key={index} label={item} />
              ))}
            </div>
          )}
        </div>
        {/* <div className="flex flex-wrap justify-around mx-4 pb-2">
          {tableLabels.map((item, index) => (
            <Label
              key={index}
              className={"rounded-full hover:rounded-full"}
              label={item}
              isActivated={index == tableType}
              onClick={() => setTableType(index)}
            />
          ))}
        </div> */}
        <Image
          src="/community/icons/table.svg"
          width={0}
          height={0}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ChartTable;
