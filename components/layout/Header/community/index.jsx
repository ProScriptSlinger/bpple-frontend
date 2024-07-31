"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useSettingModal } from "../../../../context/communitysetting";
import { useUser } from "../../../../context/appContext";
import { getNameInitials } from "../../../../utils/functions/getNameInitials";
import ActionCoinModal from "@/components/Modal/ActionCoinModal";
import ChartTable from "./ChartTable";
const CommunityHeader = (props) => {
  const [dropdown, setDropdown] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  const [modalType, setModalType] = useState("buy");
  const [isModalOpen, setModalOpen] = useState(false);
  const {
    communityProfileModal,
    setCommunityProfileModal,
    setCommunityProfileInModal,
  } = useSettingModal();
  const {
    userSearchModal,
    setUserSearchModal,
    newChannelModal,
    setNewChannelModal,
    newRoomModal,
    setNewRoomModal,
    calling,
    setCalling,
  } = useSettingModal();
  const { communityId, channel } = useParams();

  const { userDetail, communities, setCurrentCommunity } = useUser();
  const [options, setOptions] = useState([]);
  const pathname = usePathname();
  const [community, setCommunity] = useState(null);

  const [DefaultOptions, setDefaultOptions] = useState([
    { icon: "/icon/anounce.svg", title: "Announcements" },
    { icon: "/icon/createroom.svg", title: "Create a Room" },
    { icon: "/icon/createroom.svg", title: "Create a Channel" },
    { icon: "/icon/recorder.svg", title: "Start Voice Chat" },
    { icon: "/icon/marketplace_black.svg", title: "Marketplace" },
    { icon: "/icon/camera.svg", title: "Sneak-peeks" },
    { icon: "/icon/team.svg", title: "Team" },
  ]);

  useEffect(() => {
    if (community && channel) {
      setCurrentOption({
        title: channel,
      });
    }
  }, [communityId, community, channel]);

  useEffect(() => {
    const handleFindCommunity = () => {
      const communityById = communities?.find(
        (community) => community._id == communityId
      );

      console.log("community ------>", communityById);
      setCommunity(communityById);
      setCurrentCommunity(communityById);
    };
    communityId && handleFindCommunity();
  }, [communityId, userDetail, communities]);

  const [currentOption, setCurrentOption] = useState({
    icon: "/icon/anounce.svg",
    title: "Announcements",
  });

  useEffect(() => {
    const tempOptions = DefaultOptions.filter(
      (item) => item.title !== currentOption.title
    );
    if (!tempOptions) {
      setOptions([{ title: channel }]);
    } else {
      setOptions(tempOptions);
    }
  }, [currentOption, channel]);

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setWindowWidth(windowWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial margin calculation

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [isChartOpened, setChartOpened] = useState(false);

  if (pathname.includes(`/join/`)) return;

  const CoinItem = (props) => {
    return (
      <div className="p-2 rounded-lg bg-[#2A2A2A] flex items-center gap-4 border-[#464646] border-[1px]">
        <Image
          src="/community/icons/pepe.svg"
          width={0}
          height={0}
          alt="logo"
          className="w-[50px] h-auto"
        />
        <div className="flex flex-col gap-2">
          <div className="flex gap-1 items-center ">
            <p className="text-white text-[18px] font-bold">PEPE</p>
            <Image
              src="/home/icons/guard.svg"
              width={0}
              height={0}
              alt="guard"
              className="w-[11px] h-[11px]"
            />
            <Image
              src="/home/icons/fire 1.svg"
              width={0}
              height={0}
              alt="fire"
              className="w-[12px] h-auto"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              <p className="text-white text-[11.65px]">6.5K</p>
              <Image
                src="/community/icons/user.svg"
                width={0}
                height={0}
                alt="user"
                className="w-[12px] h-auto"
              />
            </div>
            <div className="flex gap-1">
              <p className="text-white text-[11.65px]">330</p>
              <Image
                src="/community/icons/user_icon_green.svg"
                width={0}
                height={0}
                alt="user_green"
                className="w-[12px] h-auto"
              />
            </div>
            <Image
              src="/community/icons/x_icon.svg"
              width={0}
              height={0}
              alt="user_green"
              className="w-[12px] h-auto ml-4"
            />
          </div>
        </div>
      </div>
    );
  };

  const handleModal = (type) => {
    setModalOpen(!isModalOpen);
    setModalType(type);
  };
  return (
    <div className="font-poppins pt-4">
      <div className="flex flex-col relative border-b-[#2A2A2A] border-b-[1px] pb-2 bg-[#111111]">
        <div
          className={`w-full flex px-4  justify-between items-center ${
            calling ? "flex-row" : ""
          }`}
        >
          {pathName.includes("/community") &&
          pathName.includes("/marketplace") ? (
            <div className="w-[354px] inline-flex items-center">
              <div className="relative">
                <Image
                  src="/icon/search_grey.svg"
                  width={0}
                  height={0}
                  alt="logo"
                  className="w-[14px] h-auto absolute left-[25px] top-[13px]"
                />
                <input
                  className="py-[12px] mobile:w-[300px] w-[170px] outline-none bg-[#181818] px-[50px] text-[14px] rounded-[12px] placeholder:text-[#4C4C4C] placeholder:text-[12px]"
                  placeholder="Search NFT"
                />
              </div>
              <button className="flex items-center justify-center bg-[#3772FF] rounded-[10px] w-[43px] ml-[10px] h-[43px] hover:opacity-70">
                <Image
                  src="/icon/browse.svg"
                  width={0}
                  height={0}
                  className="w-[20px] h-auto"
                  alt=""
                />
              </button>
            </div>
          ) : (
            <button
              className="inline-flex flex-none hover:opacity-70 transition-all duration-100"
              onClick={() => {
                setCommunityProfileInModal(community);
                setCommunityProfileModal(!communityProfileModal);
              }}
            >
              <Image
                src={community?.avatar}
                className={` w-[50px] aspect-square rounded-xl 
              ${
                !community?.avatar && "hidden"
              }   object-cover bg-[#191919] flex items-center justify-center `}
                width={50}
                height={50}
                alt={"YC EC"}
                priority={true}
              />
              {community?.avatar == null && (
                <div
                  className="w-[50px] aspect-square rounded-xl
             bg-[#191919] flex items-center justify-center
              text-[#4C4C4C] text-[22px]"
                >
                  {getNameInitials(community?.username ?? "B")}
                </div>
              )}
              {/* <CoinItem /> */}

              {calling ? (
                windowWidth > 1220 ||
                (windowWidth < 1000 && windowWidth > 834) ||
                (windowWidth < 700 && windowWidth > 580) ? (
                  <div className="ml-[20px] text-left w-[161px]">
                    <p className="">{community?.name}</p>

                    <div className="flex gap-4">
                      <div className="flex gap-1">
                        <p className="text-white text-[11.65px]">6.5K</p>
                        <Image
                          src="/community/icons/user.svg"
                          width={0}
                          height={0}
                          alt="user"
                          className="w-[12px] h-auto"
                        />
                      </div>
                      <div className="flex gap-1">
                        <p className="text-white text-[11.65px]">
                          {channel
                            ? channel
                            : community?.members &&
                              ` ${Object.keys(community?.members).length} `}
                        </p>
                        <Image
                          src="/community/icons/user_icon_green.svg"
                          width={0}
                          height={0}
                          alt="user_green"
                          className="w-[12px] h-auto"
                        />
                      </div>
                    </div>
                  </div>
                ) : null
              ) : (
                <div className="ml-[20px] text-left w-[161px]">
                  <p className="">{community?.name}</p>
                  <div className="flex gap-4 items-center">
                    <div className="flex items-center gap-1">
                      <p className="text-[#7A7A7A] text-[11.65px]">6.5K</p>
                      <Image
                        src="/community/icons/user.svg"
                        width={0}
                        height={0}
                        alt="user"
                        className="w-[12px] h-auto"
                      />
                    </div>
                    <div className="flex gap-1">
                      <p className="text-[#7A7A7A] text-[11.65px]">
                        {community?.members &&
                          ` ${Object.keys(community?.members).length} `}
                      </p>
                      <Image
                        src="/community/icons/user_icon_green.svg"
                        width={0}
                        height={0}
                        alt="user_green"
                        className="w-[12px] h-auto"
                      />
                    </div>
                  </div>
                </div>
              )}
            </button>
          )}

          <div className={`inline-flex z-10 ${calling ? "w-full" : ""}`}>
            {pathName.includes("/community") &&
            pathName.includes("/marketplace") ? (
              <div></div>
            ) : (
              <>
                {calling ? (
                  <div className="px-[10px] py-[5px] border-[1px] border-[#393939] rounded-full items-center justify-between inline-flex w-full h-[45px] ml-[20px] mr-[20px]">
                    <div className="inline-flex">
                      <Image
                        src="/avatar/19.svg"
                        width={0}
                        height={0}
                        alt=""
                        className="w-[35px] h-auto"
                      />
                      {windowWidth > 1400 ? (
                        <div className="ml-[10px]">
                          <div className="inline-flex text-[11px]">
                            <p className="mr-[5px]">Kitshuna Fowyu</p>
                            <Image
                              src="/icon/check.svg"
                              width={0}
                              height={0}
                              alt=""
                              className="w-[10px] h-auto"
                            />
                          </div>
                          <p className="text-[10px] text-[#979797] mt-[-5px]">
                            @KitshunaFowyu
                          </p>
                        </div>
                      ) : null}
                    </div>
                    {windowWidth > 1290 ||
                    (windowWidth < 1220 && windowWidth > 1120) ||
                    (windowWidth < 1000 && windowWidth > 960) ||
                    (windowWidth < 832 && windowWidth > 740) ||
                    (windowWidth < 700 && windowWidth > 655) ||
                    (windowWidth < 580 && windowWidth > 480) ? (
                      <p className="text-[13px]">Calling 21:20</p>
                    ) : null}

                    <div className="inline-flex">
                      <Image
                        src="/icon/incoming_blue.svg"
                        width={0}
                        height={0}
                        alt=""
                        className="w-[30px] h-auto mr-[5px]"
                      />
                      <button
                        onClick={() => {
                          setCalling(false);
                        }}
                      >
                        <Image
                          src="/icon/call_off.svg"
                          width={0}
                          height={0}
                          alt=""
                          className="w-[30px] h-auto"
                        />
                      </button>
                    </div>
                  </div>
                ) : null}
                <button
                  className="w-[45px] h-[45px] bg-[#252525] rounded-[12px] flex items-center justify-center flex-none hover:opacity-70"
                  onClick={() => setUserSearchModal(!userSearchModal)}
                >
                  <Image
                    width={0}
                    height={0}
                    alt=""
                    src={"/icon/search.svg"}
                    className="w-[13px] h-auto"
                  />
                </button>
              </>
            )}

            {/* {!dropdown ? (
              <button
                className="h-[45px] inline-flex flex-none items-center justify-between bg-[#3772FF] rounded-[12px] mobile:px-[15px] mobile:mx-[15px] mx-[5px] px-[10px] mobile:w-[220px] w-[45px] text-[15px] hover:opacity-70"
                onClick={() => setDropdown(!dropdown)}
              >
                {!currentOption.icon ? (
                  <span className=" bg-black/5  text-black h-[25px] w-[25px] flex relative rounded-full items-center justify-center">
                    {getNameInitials(currentOption?.title.toLowerCase() ?? "B")}
                  </span>
                ) : (
                  <Image
                    width={0}
                    height={0}
                    alt=""
                    src={currentOption.icon}
                    className="w-[25px] h-auto"
                  />
                )}
                <p className="text-black ml-[5px] mr-[10px] mobile:flex mt-[3px] hidden">
                  {currentOption.title}
                </p>

                <Image
                  width={0}
                  height={0}
                  alt=""
                  src={`${
                    dropdown ? "/icon/dropup.svg" : "/icon/dropdown.svg"
                  }`}
                  className="mr-[5px] mobile:block hidden mt-[3px] w-[10px] h-auto"
                />
              </button>
            ) : (
              <>
                <div
                  className="fixed left-0 right-0 top-0 bottom-0"
                  onClick={() => setDropdown(false)}
                ></div>
                <div className="h-[365px] relative overflow-x-auto bg-[#3772FF] rounded-[12px] mobile:w-[220px] w-[45px] mobile:mx-[15px] mx-[5px] text-[15px] z-10">
                  <button
                    className=" z-20  sticky top-0 h-[45px] inline-flex items-center justify-between bg-[#3772FF] rounded-[12px] mobile:px-[15px] px-[10px] mobile:w-[220px] w-[45px]"
                    onClick={() => setDropdown(!dropdown)}
                  >
                    {!currentOption.icon ? (
                      <span className=" bg-black/5  text-black h-[25px] w-[25px] flex relative rounded-full items-center justify-center">
                        {getNameInitials(
                          currentOption?.title.toLowerCase() ?? "B"
                        )}
                      </span>
                    ) : (
                      <Image
                        width={0}
                        height={0}
                        alt=""
                        src={currentOption.icon}
                        className="w-[25px] h-auto"
                      />
                    )}
                    <p className="text-black ml-[10px] mr-[10px] mobile:block hidden mt-[3px]">
                      {currentOption.title}
                    </p>
                    <Image
                      width={0}
                      height={0}
                      alt=""
                      src={`${
                        dropdown ? "/icon/dropup.svg" : "/icon/dropdown.svg"
                      }`}
                      className="mr-[5px] mobile:block hidden mt-[3px] w-[10px] h-auto"
                    />
                  </button>

                  <div>
                    {community?.channels.map(
                      ({ channelId: channel }, index) => (
                        <button
                          onClick={() => {
                            router.push(
                              `/community/${communityId}/${channel.name}`
                            );
                            setDropdown(!dropdown);
                          }}
                          key={index}
                          className={` ${
                            community?.channels.length - 1 === index ? "  " : ""
                          } text-black  h-[45px] inline-flex items-center mobile:px-[15px] px-[10px] w-[210px] hover:bg-opacity-70`}
                        >
                          <span className=" bg-black/5  h-[25px] w-[25px] flex relative rounded-full items-center justify-center">
                            {getNameInitials(
                              channel?.name.toLowerCase() ?? "B"
                            )}
                          </span>
                          <p className="text-black ml-[10px] mr-[10px] mobile:block hidden mt-[3px]">
                            {channel.name}
                          </p>
                        </button>
                      )
                    )}

                    {options.map((item, index) => (
                      <button
                        key={index}
                        className="h-[45px] inline-flex items-center mobile:px-[15px] px-[10px] w-[210px] hover:bg-opacity-70"
                        onClick={() => {
                          setCurrentOption(options[index]);
                          setDropdown(!dropdown);
                          if (item.title === "Create a Channel") {
                            setNewChannelModal(!newChannelModal);
                          } else if (item.title === "Create a Room") {
                            setNewRoomModal(true);
                          } else if (item.title === "Marketplace") {
                            router.push(
                              `/community/${communityId}/marketplace`
                            );
                          } else if (item.title === "Team") {
                            router.push("/community/team");
                          }
                        }}
                      >
                        <Image
                          width={0}
                          height={0}
                          alt=""
                          src={item.icon}
                          className="w-[25px] h-auto"
                        />
                        <p className="text-black ml-[10px] mr-[10px] mobile:block hidden mt-[3px]">
                          {item.title}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )} */}

            {/* <button
              className="w-[45px] h-[45px] bg-[#252525] mx-4 rounded-[12px] flex items-center justify-center flex-none hover:opacity-70"
              onClick={() => router.push("/notification")}
            >
              <Image
                width={0}
                height={0}
                alt=""
                src={"/icon/ring.svg"}
                className="w-[20px] h-auto"
              />
            </button> */}
          </div>
        </div>
        <div className="border-b-[1px] border-b-[#2A2A2A] w-full py-1" />
        <div className="flex items-center justify-between mx-4 pt-2">
          <div className="flex items-center gap-4 justify-around">
            <div className="flex gap-1">
              <p className="text-white text-[16px] font-medium">PEPE</p>
              <p className="text-[#7B7995] text-[16px]">SOL</p>
            </div>
            <div className="flex gap-1">
              <p className="text-white text-[16px]">USD $0.004117</p>
              <p className="text-[#30E0A1] text-[16px]">62.80%</p>
            </div>
          </div>
          <div className="rounded-full bg-[#151515] border-[1px] border-[#292929] p-1 px-2 flex gap-10">
            <div className="flex gap-2 items-center">
              <div className="bg-[#FEE2E2] rounded-full p-2">
                <Image
                  width={0}
                  height={0}
                  alt="Featured"
                  src={"/home/icons/fire 1.svg"}
                  className="w-[12px] h-auto"
                />
              </div>
              <div className="text-white  text-[14px]">MKT :16K/30K$</div>
            </div>
            <div className="flex gap-2 items-center">
              <Image
                width={0}
                height={0}
                alt="clock-hour-1"
                src={"/home/icons/clock-hour-1.svg"}
                className="w-[24px] h-auto"
              />
              <div className="text-white  text-[14px]">53 mins</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="bg-[#43CD75] p-1 px-10 rounded-full text-[16px]"
              onClick={() => handleModal("buy")}
            >
              Buy
            </button>
            <button
              className="bg-[#FF3331] p-1 px-10 rounded-full text-[16px]"
              onClick={() => handleModal("sell")}
            >
              Sell
            </button>
            <div
              className="flex gap-1 cursor-pointer"
              onClick={() => setChartOpened(!isChartOpened)}
            >
              <Image
                width={0}
                height={0}
                alt="Chart"
                src={"/community/icons/Chart.svg"}
                className="w-auto h-auto"
              />
              {isChartOpened ? (
                <Image
                  width={0}
                  height={0}
                  alt="Chart"
                  src={"/community/icons/up-icon.svg"}
                  className="w-[24px] h-auto"
                />
              ) : (
                <Image
                  width={0}
                  height={0}
                  alt="Chart"
                  src={"/community/icons/drop-icon.svg"}
                  className="w-[24px] h-auto"
                />
              )}
            </div>
          </div>
        </div>
        {isChartOpened && (
          <div className="w-full h-[400px] bg-[#1C1C1C] absolute top-[110px] z-50">
            <ChartTable />
          </div>
        )}
      </div>
      {isModalOpen && (
        <ActionCoinModal setModalOpen={setModalOpen} modalType={modalType} />
      )}
    </div>
  );
};
export default CommunityHeader;
