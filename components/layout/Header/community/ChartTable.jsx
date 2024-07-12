import { useState } from "react";
import Image from "next/image";
const ChartTable = (props) => {
  const Label = (props) => {
    const { label, isActivated } = props;
    return (
      <p
        className={`${
          isActivated
            ? "text-white rounded-full bg-[#353945]"
            : "text-[#777E90]"
        } px-4 cursor-pointer`}
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
  const [tableType, setTableType] = useState(0);
  return (
    <div className="flex py-4">
      <div className="flex flex-col">
        <div className="flex flex-wrap justify-around gap-2 items-center">
          <div className="flex gap-4">
            {labels.map((item) => (
              <Label {...item} />
            ))}
          </div>
          <div className="flex gap-1">
            <p className="text-[#FF6838] text-[10px]">65.254K</p>
            <p className="text-[#777E90] text-[10px]">Vol(USDT):</p>
            <p className="text-[#FF6838] text-[10px]">2.418B</p>
          </div>
          <div className="flex gap-2">
            <Label label="Trading view" isActivated={true} />
            <Label label="Depth" isActivated={false} />
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
      <div className="flex flex-col mx-2">
        <div className="flex flex-wrap justify-around mx-4 pb-2">
          {tableLabels.map((item, index) => (
            <Label
              label={item}
              isActivated={index == tableType}
              onClick={() => setTableType(index)}
            />
          ))}
        </div>
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
