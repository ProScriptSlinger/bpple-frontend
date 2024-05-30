import Image from "next/image";

const Sidebar = (props) => {
  const { visible, setVisible, title, children, des } = props;
  return (
    <div
      className={`${
        visible ? "w-[400px]" : "w-0"
      } flex flex-none h-full bg-[#171717] transition-all duration-500 right-0 z-20 prevent-select absolute top-0`}
    >
      <div className="w-[400px] h-full relative overflow-auto px-[30px] pb-[50px]">
        <div className="w-[340px] flex flex-col h-full">
          <div className="w-full">
            <button
              className="inline-flex items-center mt-[60px]"
              onClick={() => setVisible(!visible)}
            >
              <Image
                className="mr-[30px] w-[30px] h-auto"
                src="/icon/back_bgwhite.svg"
                width={0}
                height={0}
                alt=""
              />
            </button>

            <p className="mt-[50px] text-[20px]">{title}</p>
            <p className="mt-[15px] text-[12px] text-[#707070]">{des}</p>
          </div>
          <>{children}</>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
