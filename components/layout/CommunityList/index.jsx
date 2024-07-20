"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useSettingModal } from "../../../context/communitysetting";
import { useUser } from "../../../context/appContext";
import { getNameInitials } from "../../../utils/functions/getNameInitials";
import { useSocket } from "../../../context/socketContext";
import Link from "next/link";
import SearchMember from "./SearchMember";

const ChatList = (props) => {
  const pathName = usePathname();

  return (
    <>
      <Link href={`/chats/${props.item.dm_messages_id}`}>
        <button
          className={`w-full h-[60px] inline-flex ${
            props.siderWidth < 188 ? "justify-center" : "justify-between"
          } mb-[5px] px-[12px] py-[5px] hover:bg-[#3772FF] hover:bg-opacity-5 focus:bg-[#3772FF] focus:bg-opacity-5 ${
            pathName === `/chats/${props.item.dm_messages_id}`
              ? "bg-[#3772FF] bg-opacity-5"
              : ""
          } rounded-[10px] items-center`}
          // onClick={() => {
          //   router.push(`/chats/${props.item.dm_messages_id}`);
          // }}
        >
          <div className="inline-flex items-center">
            {props.item.otherUser?.avatar ? (
              <Image
                src={props.item.otherUser?.avatar ?? "/avatar/2.svg"}
                className="w-[50px] aspect-square rounded-xl
               object-cover bg-[#191919] flex items-center justify-center "
                width={200}
                height={200}
                alt={props?.item?.otherUser?.username}
              />
            ) : (
              <div
                className="w-[50px] aspect-square rounded-xl
             bg-[#191919] flex items-center justify-center
              text-[#4C4C4C] text-[22px] font-bold"
              >
                {getNameInitials(props?.item?.otherUser?.username ?? "B")}
              </div>
            )}
            <div className={`ml-[10px] ${props.siderWidth < 390 && "hidden"}`}>
              <p className="text-left capitalize">
                {props?.item?.otherUser?.username}
              </p>
              <p className="text-[#3772FF] text-[12px]">
                {[...props.usersTyping]?.includes(props.item.dm_messages_id) &&
                  ` ${props?.item?.otherUser?.username} is typing ...`}
              </p>
              <p className="text-[10px] text-[#797C7B] text-left">
                {props?.item?.status}
              </p>
            </div>
          </div>
          <div
            className={`relative text-right ${
              props.siderWidth < 188 && "hidden"
            }`}
          >
            <p className="text-[#797C7B] text-[12px]">
              {props?.item?.lastseen}
            </p>
            <div className="inline-flex">
              {props.item.mute && (
                <Image
                  src="/icon/ring_mute.svg"
                  width={0}
                  height={0}
                  alt=""
                  className="w-[15px] h-auto flex flex-none mr-[5px]"
                />
              )}
              {props?.item?.unreadMessage !== 0 ? (
                <div className="px-[5px] py-[2px] rounded-full bg-[#3772FF] text-[10px] text-white">
                  {props.item.unreadMessage}
                </div>
              ) : (
                <Image
                  src="/icon/read.svg"
                  width={0}
                  height={0}
                  alt=""
                  className="w-[15px] h-auto"
                />
              )}
            </div>
          </div>
        </button>
      </Link>
    </>
  );
};

const GroupList = (props) => {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <>
      <Link
        href={`/chats/groups/${props?.group?._id}`}
        className={`w-full h-[60px] inline-flex ${
          props.siderWidth < 188 ? "justify-center" : "justify-between"
        } mb-[5px] px-[12px] py-[5px] hover:bg-[#3772FF] hover:bg-opacity-5 focus:bg-[#3772FF] focus:bg-opacity-5 ${
          pathName === `/chats/groups/${props?.group?._id}`
            ? "bg-[#3772FF] bg-opacity-5"
            : ""
        } rounded-[10px] items-center`}
      >
        <div className="inline-flex items-center">
          {props.group?.avatar ? (
            <Image
              src={props.group?.avatar ?? "/avatar/2.svg"}
              className="w-[50px] aspect-square rounded-xl
               object-cover bg-[#191919] flex items-center justify-center "
              width={200}
              height={200}
              alt={props.group?.name}
            />
          ) : (
            <div
              className="w-[50px] aspect-square rounded-xl
             bg-[#191919] flex items-center justify-center
              text-[#4C4C4C] text-[22px]"
            >
              {getNameInitials(props?.group?.name ?? "B")}
            </div>
          )}
          <div className={`ml-[10px] ${props.siderWidth < 390 && "hidden"}`}>
            <p className="text-left capitalize">{props?.group?.name}</p>

            {[...props.usersTyping]?.includes(props?.group?.name) ? (
              <p className="text-[#3772FF] text-[12px]">
                ` ${props?.group?.name} is typing ...`
              </p>
            ) : (
              <p className="text-[12px] text-[#7A7A7A]">
                {props.group?.members &&
                  Object.keys(props.group?.members).length}{" "}
                Members
              </p>
            )}
            <p className="text-[10px] text-[#797C7B] text-left">
              {props?.group?.status}
            </p>
          </div>
        </div>
        <div
          className={`relative text-right ${
            props.siderWidth < 188 && "hidden"
          }`}
        >
          <p className="text-[#797C7B] text-[12px]">{props?.group?.lastseen}</p>
          <div className="inline-flex">
            {props?.group?.mute && (
              <Image
                src="/icon/ring_mute.svg"
                width={0}
                height={0}
                alt=""
                className="w-[15px] h-auto flex flex-none mr-[5px]"
              />
            )}
            {props?.group?.unreadMessage !== (0 || null) ? (
              <div className="px-[5px] py-[2px] rounded-full bg-[#3772FF] text-[10px] text-white">
                {props?.group?.unreadMessage}
              </div>
            ) : (
              <Image
                src="/icon/read.svg"
                width={0}
                height={0}
                alt=""
                className="w-[15px] h-auto"
              />
            )}
          </div>
        </div>
      </Link>
    </>
  );
};

const CommunityList = (props) => {
  const [dropdown, setDropdown] = useState(false);
  const [category, setCategory] = useState("chat");
  const [siderWidth, setSiderWidth] = useState(400);
  const { chats, communities, userDetail } = useUser();
  const { usersTyping } = useSocket();
  const handleSider = () => {
    setSiderWidth(80);
    const sidebar = document.querySelector(".resize-current1");
    sidebar.style.width = `${80}px`;
  };

  const router = useRouter();
  const pathName = usePathname();
  const {
    newCommunityModal,
    setNewCommunityModal,
    newGroupModal,
    setNewGroupModal,
  } = useSettingModal();
  const [selectCommunityType, setSelectCommunityType] = useState(false);
  const [transition, setTransition] = useState(true);

  const Components = (props) => {
    const [hover, setHover] = useState(false);
    return (
      <>
        <div
          className="has-tooltip text-[12px]"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <span className="tooltip ml-[100px] w-[150px] mt-[-2px] h-[50px] rounded-[12px] bg-[#3772FF] backdrop-blur-xl bg-opacity-35 p-1 text-left font-normal text-white shadow-lg flex items-center justify-center text-[14px]">
            {props.item.name}
          </span>
          <Link
            href={`/community/${props.item._id}`}
            className={`w-full flex items-center justify-center mt-[17px] relative hover:opacity-70 ${
              props.item.id === "id_3"
                ? "border-r-[3px] border-r-[#3772FF] rounded-l-full"
                : ""
            } `}
          >
            <div className="relative">
              <Image
                src={props.item?.avatar}
                className={` w-[50px] aspect-square rounded-xl 
                ${
                  !props.item?.avatar && "hidden"
                }   object-cover bg-[#191919] flex items-center justify-center `}
                width={45}
                height={45}
                alt={"YC EC"}
                priority={true}
              />
              {props.item.tredingStat != "no" && (
                <Image
                  src={
                    props.item.tredingStat == "up"
                      ? "/community/icons/trending_up.svg"
                      : "/community/icons/trending_down.svg"
                  }
                  className={` w-[20px] absolute right-0 bottom-0 mr-[-5px]`}
                  width={0}
                  height={0}
                  alt={"trending_stat"}
                  priority={true}
                />
              )}
            </div>
            {props.item?.avatar == null && (
              <div
                className="w-[45px] aspect-square rounded-xl
             bg-[#1f1f1f] flex items-center justify-center
              text-[#8f8e8e] text-[22px] font-bold"
              >
                {getNameInitials(props.item?.name ?? "B")}
              </div>
            )}

            {props.item?.unReadMessage ? (
              <div className="absolute right-[10px] bottom-[-6px]">
                <div className="relative w-[20px] h-[20px]">
                  <Image
                    width={20}
                    height={20}
                    alt=""
                    src="/icon/18active.svg"
                  />
                </div>
              </div>
            ) : null}
            {pathName === `/community/${props.item._id}` || hover ? (
              <>
                <div className="absolute border-r-[3px] rounded-l-full border-r-[#3772FF] h-full right-0"></div>
              </>
            ) : null}
          </Link>
        </div>
      </>
    );
  };
  let handle = document.querySelector(".resize-handle1");
  let sidebar = document.querySelector(".resize-current1");

  const [change, setChange] = useState(true);

  useEffect(() => {
    handle = document.querySelector(".resize-handle1");
    sidebar = document.querySelector(".resize-current1");
    setChange(!change);
  }, [pathName]);

  useEffect(() => {
    handle = document.querySelector(".resize-handle1");
    sidebar = document.querySelector(".resize-current1");
    if (!handle || !sidebar) {
      return;
    }
    let isResizing = false;
    let lastDownX = 0;

    handle.addEventListener("mousedown", (e) => {
      isResizing = true;
      lastDownX = e.clientX || 0;
      setTransition(false);
    });

    document.addEventListener("mousemove", (e) => {
      if (!isResizing) return;
      const width = e.clientX - 300;
      if (width > 400) {
        setSiderWidth(400);
        sidebar.style.width = `${400}px`;
      } else if (width > 80) {
        setSiderWidth(width);
        sidebar.style.width = `${width}px`;
      } else {
        setSiderWidth(80);
        sidebar.style.width = `${80}px`;
      }
    });

    document.addEventListener("mouseup", () => {
      isResizing = false;
      setTransition(true);
    });

    return () => {
      document.removeEventListener("mousemove", () => {});
      document.removeEventListener("mouseup", () => {});
    };
  }, [change]);

  const handleSetColId = () => {
    // Split the pathName string into an array of parts
    const parts = pathName.split("/");

    // Get the last part of the array, which is the desired value
    const colId = parts[parts.length - 1];

    setColId(colId);
  };

  const [visibleSearch, setVisibleSearch] = useState(false);

  if (pathName.includes(`/join/`)) return;

  return (
    <>
      {pathName === "/chats" || pathName.includes("/chats") ? (
        <div
          className={`w-[400px] overflow-x-visible desktop:block hidden resize-current1 justify-center bg-[#1C1C1C] h-full flex-none prevent-select ${
            siderWidth < 150 ? "px-[10px]" : "px-[30px]"
          } pt-[50px] relative ${
            transition ? "transition-[width] duration-200" : "transition-none"
          }`}
        >
          <div
            className="resize-handle1"
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "10px",
              cursor: "ew-resize",
            }}
          ></div>
          <div className="w-full h-full">
            <div
              className={`w-full inline-flex items-center text-[20px] ${
                siderWidth < 188 ? "justify-center" : "justify-between"
              } relative ${siderWidth < 100 && "hidden"}`}
            >
              Chats
              <div
                className={`inline-flex items-center ${
                  siderWidth < 200 && "hidden"
                }`}
              >
                <Image
                  src="/icon/search_white.svg"
                  width={0}
                  height={0}
                  alt=""
                  className="w-[35px] h-[35px] mr-[8px] cursor-pointer hover:opacity-70"
                  onClick={() => setVisibleSearch(!visibleSearch)}
                />
                <div className="relative h-fit flex flex-col justify-center">
                  <button
                    onClick={() => {
                      setDropdown(!dropdown);
                    }}
                    className="hover:opacity-70 transition-all duration-100 w-[35px] h-[35px] flex justify-center items-center bg-[#3D3A3A] rounded-full"
                  >
                    <Image
                      src="/icon/plus.svg"
                      width={0}
                      height={0}
                      alt=""
                      className="w-[17px] h-auto"
                    />
                  </button>
                  {dropdown && (
                    <div className="absolute right-[-175px] top-[10px] w-[160px] bg-[#434343] bg-opacity-[70%] rounded-[10px] px-[20px] py-[10px] backdrop-blur z-20">
                      <button className="inline-flex items-center">
                        <div>
                          <Image
                            src="/icon/overview.svg"
                            width={0}
                            height={0}
                            alt=""
                            className="w-[15px] h-auto"
                          />
                        </div>
                        <p className="ml-[10px] text-[13px] mt-[2px]">
                          Create Chat
                        </p>
                      </button>
                      <button
                        className="inline-flex items-center"
                        onClick={() => {
                          setNewGroupModal(!newGroupModal),
                            setDropdown(!dropdown);
                          handleSider();
                        }}
                      >
                        <div>
                          <Image
                            src="/icon/setting.svg"
                            width={0}
                            height={0}
                            alt=""
                            className="w-[18px] h-auto"
                          />
                        </div>
                        <p className="ml-[6px] text-[13px] mt-[2px]">
                          Create Group
                        </p>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* <div
              className={`flex flex-col ${
                siderWidth < 100 && "justify-center w-full"
              }`}
            >
              <div
                className={`flex ${
                  siderWidth < 193 && "justify-center w-full"
                }`}
              >
                <div className="relative">
                  <button
                    className="w-[50px] aspect-square rounded-full bg-[#3772FF] bg-opacity-20 flex items-center justify-center mt-[20px] hover:opacity-70 transition-all"
                    onClick={() => setDropdown(!dropdown)}
                  >
                    <Image
                      src="/icon/plus.svg"
                      width={0}
                      height={0}
                      alt=""
                      className="w-[17px] h-auto"
                    />
                  </button>
                </div>
              </div>
              <div
                className={`flex  ${
                  siderWidth < 193 ? "justify-center w-full ml-0" : "ml-[12px]"
                }`}
              >
                <p className="text-[12px] text-[#989898] mt-[10px]">Add</p>
              </div>
            </div> */}
            {visibleSearch ? (
              <>
                <SearchMember
                  siderWidth={siderWidth}
                  setVisibleSearch={setVisibleSearch}
                />
              </>
            ) : (
              <>
                <div
                  className={`w-full grid grid-cols-3 gap-[20px] mt-[30px] ${
                    siderWidth < 250 && "hidden"
                  }`}
                >
                  <button
                    className={`rounded-full  text-[14px] font-bold py-[7px] hover:bg-[#3772FF] hover:text-white hover:bg-opacity-70 transition-all duration-100 ${
                      category === "chat"
                        ? "bg-[#3772FF] text-white"
                        : "text-[#606060]"
                    }`}
                    onClick={() => {
                      setCategory("chat");
                    }}
                  >
                    Chat
                  </button>
                  <button
                    className={`rounded-full  text-[14px] font-bold py-[7px] hover:bg-[#3772FF] hover:text-white hover:bg-opacity-70 transition-all duration-100 ${
                      category === "status"
                        ? "bg-[#3772FF] text-white"
                        : "text-[#606060]"
                    }`}
                    onClick={() => setCategory("status")}
                  >
                    Status
                  </button>
                  <button
                    className={`rounded-full  text-[14px] font-bold py-[7px] hover:bg-[#3772FF] hover:text-white hover:bg-opacity-70 transition-all duration-100 ${
                      category === "call"
                        ? "bg-[#3772FF] text-white"
                        : "text-[#606060]"
                    }`}
                    onClick={() => {
                      setCategory("call");
                    }}
                  >
                    Calls
                  </button>
                </div>
                <div
                  className={`w-full h-[40px] bg-[#393939] bg-opacity-35 rounded-full inline-flex items-center px-[15px] justify-between mt-[20px] ${
                    siderWidth < 200 && "hidden"
                  }`}
                >
                  <div className="inline-flex text-[13px] items-center">
                    <div>
                      <Image
                        src="/icon/archieve.svg"
                        width={0}
                        height={0}
                        alt=""
                        className="w-[15px] h-auto"
                      />
                    </div>
                    <p className="mt-[3px] ml-[5px]">Archived</p>
                  </div>
                  <div className="bg-[#3772FF] text-[12px] text-white px-[7px] rounded-full">
                    23
                  </div>
                </div>
                <div
                  className={`w-[140px] h-[40px] mt-[20px] rounded-full border-[1px] border-[#353535] flex items-center px-[20px] text-[12px] text-[#797C7B] ${
                    siderWidth < 200 && "hidden"
                  }`}
                >
                  <Image
                    alt=""
                    width={0}
                    height={0}
                    src="/icon/pin.svg"
                    className="w-[15px] h-auto mr-[10px]"
                  />
                  Pined Chats
                </div>
                <div className="mt-[20px]">
                  {userDetail?.groups?.map((group, index) => (
                    <GroupList
                      key={index}
                      usersTyping={usersTyping}
                      group={group.groupId}
                      siderWidth={siderWidth}
                    />
                  ))}
                  {chats?.messages?.map((item, index) => (
                    <div key={index}>
                      <ChatList
                        usersTyping={usersTyping}
                        item={item}
                        siderWidth={siderWidth}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div
          className={`!w-[80px] desktop:block hidden justify-center bg-[#191919] h-full flex-none prevent-select`}
        >
          <div className="w-full flex items-center justify-center mb-[30px] relative">
            <button
              className="h-[45px] w-[45px] mt-[60px] bg-[#3772FF] bg-opacity-10 rounded-[12px] flex items-center justify-center hover:opacity-70"
              // onClick={() => setNewCommunityModal(!newCommunityModal)}
              onClick={() => {
                setSelectCommunityType(!selectCommunityType);
              }}
            >
              {selectCommunityType ? (
                <Image width={12} height={12} alt="" src="/icon/close.svg" />
              ) : (
                <Image width={15} height={15} alt="" src="/icon/plus.svg" />
              )}
            </button>
            {selectCommunityType ? (
              <>
                <div
                  className="fixed right-0 left-0 top-0 bottom-0 z-10"
                  onClick={() => setSelectCommunityType(!selectCommunityType)}
                ></div>
                <div className="absolute right-[-210px] w-[195px] bg-white z-10 top-[60px] bg-opacity-10 backdrop-blur-[12px] rounded-[9px] transition-all duration-100">
                  <button
                    className="flex items-center py-[10px] w-full pl-[20px]"
                    onClick={() => {
                      setNewCommunityModal(!newCommunityModal);
                      setSelectCommunityType(!selectCommunityType);
                    }}
                  >
                    <div className="inline-flex items-center">
                      <Image
                        src="/icon/pencil.svg"
                        width={0}
                        height={0}
                        alt=""
                        className="w-[15px] h-auto"
                      />
                      <p className="ml-[12px] text-[14px]">Create Community</p>
                    </div>
                  </button>
                  <button className="flex items-center pb-[10px] pl-[20px] w-full">
                    <div className="inline-flex items-center">
                      <Image
                        src="/icon/join.svg"
                        width={0}
                        height={0}
                        alt=""
                        className="w-[15px] h-auto"
                      />
                      <p className="ml-[12px] text-[14px]">Join Community</p>
                    </div>
                  </button>
                  {/* {pathName.includes("/nfts") && (
                    <>
                      <Link href="/create-nft?nftType=collection">
                        <div className="flex items-center pb-[10px] pl-[20px] w-full">
                          <div className="inline-flex items-center">
                            <HiOutlineCollection color="white" size={15} />
                            <p className="ml-[12px] text-[14px]">
                              Create Collection
                            </p>
                          </div>
                        </div>
                      </Link>
                      <Link href={"/create-nft?nftType=nft"}>
                        <div className="flex items-center pb-[10px] pl-[20px] w-full">
                          <div className="inline-flex items-center">
                            <RiNftLine color="white" size={15} />
                            <p className="ml-[12px] text-[14px]">Create NFT</p>
                          </div>
                        </div>
                      </Link>
                      <Link href={"/transfer"}>
                        <div className="flex items-center pb-[10px] pl-[20px] w-full">
                          <div className="inline-flex items-center">
                            <Image
                              src={"/icon/transfer_white.svg"}
                              height={15}
                              width={15}
                              alt=""
                              className="w-[20px] h-auto"
                            />
                            <p className="ml-[12px] text-[14px]">
                              Transfer NFT
                            </p>
                          </div>
                        </div>
                      </Link>
                    </>
                  )}
                  {pathName.includes("/col-nfts") && (
                    <>
                      <Link href="/create-nft?nftType=add-nft">
                        <div
                          className="flex items-center pb-[10px] pl-[20px] w-full"
                          onClick={() => handleSetColId()}
                        >
                          <div className="inline-flex items-center">
                            <RiPlayListAddFill color="white" size={15} />
                            <p className="ml-[12px] text-[14px]">Add NFT</p>
                          </div>
                        </div>
                      </Link>
                    </>
                  )} */}
                  {/* <button
                    className="flex items-center pb-[10px] pl-[20px] w-full"
                    onClick={() => createMarketplace()}
                  >
                    <div className="inline-flex items-center">
                      <RiNftLine color="white" size={15} />

                      <p className="ml-[12px] text-[14px]">
                        Create Marketplace
                      </p>
                    </div>
                  </button> */}
                </div>
              </>
            ) : null}
          </div>
          {pathName === "/home" ||
          pathName === "/notification" ||
          pathName === "/friends" ||
          pathName === "/nfts" ||
          pathName === "/marketplace" ? null : (
            <>
              {communities?.map((item, index) => (
                <div key={index}>
                  <Components item={item} />
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default CommunityList;
