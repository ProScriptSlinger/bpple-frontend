"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useSettingModal } from "../../../../context/communitysetting";
import { useUser } from "../../../../context/appContext";
import { getNameInitials } from "../../../../utils/functions/getNameInitials";

const CommunityHeader = (props) => {
  const [dropdown, setDropdown] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

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
  const { userDetail, communities } = useUser();
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

      console.log(communityById);
      setCommunity(communityById);
    };
    handleFindCommunity();
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

  if (pathname.includes(`/join/`)) return;
  return (
    <>
      <div
        className={`w-full flex  mt-[40px] justify-between items-start ${
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
            <button className="flex items-center justify-center bg-[#53FAFB] rounded-[10px] w-[43px] ml-[10px] h-[43px] hover:opacity-70">
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

            {calling ? (
              windowWidth > 1220 ||
              (windowWidth < 1000 && windowWidth > 834) ||
              (windowWidth < 700 && windowWidth > 580) ? (
                <div className="ml-[20px] text-left w-[161px]">
                  <p className="">{community?.name}</p>
                  <p className="text-[12px] text-[#7A7A7A]">
                    {channel
                      ? channel
                      : community?.members &&
                        ` ${
                          Object.keys(community?.members).length
                        } Members – 1 Active`}
                  </p>
                </div>
              ) : null
            ) : (
              <div className="ml-[20px] text-left w-[161px]">
                <p className="">{community?.name}</p>
                <p className="text-[12px] text-[#7A7A7A]">
                  {community?.members &&
                    ` ${
                      Object.keys(community?.members).length
                    } Members – 1 Active`}
                </p>
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
                  src={"/icon/search_grey.svg"}
                  className="w-[13px] h-auto"
                />
              </button>
            </>
          )}

          {!dropdown ? (
            <button
              className="h-[45px] inline-flex flex-none items-center justify-between bg-[#50FFFF] rounded-[12px] mobile:px-[15px] mobile:mx-[15px] mx-[5px] px-[10px] mobile:w-[220px] w-[45px] text-[15px] hover:opacity-70"
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
                src={`${dropdown ? "/icon/dropup.svg" : "/icon/dropdown.svg"}`}
                className="mr-[5px] mobile:block hidden mt-[3px] w-[10px] h-auto"
              />
            </button>
          ) : (
            <>
              <div
                className="fixed left-0 right-0 top-0 bottom-0"
                onClick={() => setDropdown(false)}
              ></div>
              <div className="h-[365px] relative overflow-x-auto bg-[#50FFFF] rounded-[12px] mobile:w-[220px] w-[45px] mobile:mx-[15px] mx-[5px] text-[15px] z-10">
                <button
                  className=" z-20  sticky top-0 h-[45px] inline-flex items-center justify-between bg-[#50FFFF] rounded-[12px] mobile:px-[15px] px-[10px] mobile:w-[220px] w-[45px]"
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
                  {community?.channels.map(({ channelId: channel }, index) => (
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
                        {getNameInitials(channel?.name.toLowerCase() ?? "B")}
                      </span>
                      <p className="text-black ml-[10px] mr-[10px] mobile:block hidden mt-[3px]">
                        {channel.name}
                      </p>
                    </button>
                  ))}

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
                          router.push(`${pathName}/marketplace`);
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
          )}

          <button
            className="w-[45px] h-[45px] bg-[#252525] rounded-[12px] flex items-center justify-center flex-none hover:opacity-70"
            onClick={() => router.push("/notification")}
          >
            <Image
              width={0}
              height={0}
              alt=""
              src={"/icon/ring.svg"}
              className="w-[20px] h-auto"
            />
          </button>
        </div>
      </div>
    </>
  );
};
export default CommunityHeader;
