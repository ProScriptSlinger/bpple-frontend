"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useSiderBar } from "../../../context/siderbar";
import { useUser } from "../../../context/appContext";
import { IoChevronDownOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { HiHashtag } from "react-icons/hi2";
import { AiOutlineSound } from "react-icons/ai";

const CommunityRooms = (props) => {
  const [communityRoomsSiderWidth, setCommunityRoomsSiderWidth] = useState(200);
  const { communityId } = useParams();
  const { handleCloseSiderBar } = useSiderBar();
  const { communities, userDetail } = useUser();
  const [community, setCommunity] = useState(null);
  const router = useRouter();
  const pathName = usePathname();
  const handleCommunityRoomsSiderWidthSider = () => {
    setCommunityRoomsSiderWidth(80);
    const sidebar = document.querySelector(".resize-community-chat-current");
    sidebar.style.width = `${80}px`;
  };

  const [transition, setTransition] = useState(true);

  if (pathName.includes(`/join/`)) return;

  if (!communityId || !pathName.includes(`/community/${communityId}`)) return;
  return (
    <>
      <div
        className={`w-[300px] desktop:block hidden resize-community-chat-current justify-center bg-[#1C1C1C] h-full flex-none prevent-select ${
          communityRoomsSiderWidth < 150 ? "px-[10px]" : "px-[30px]"
        } pt-[20px] relative ${
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
            className={`w-full justify-between inline-flex items-center text-[14px] `}
          >
            <span> {community?.name}</span>

            <IoChevronDownOutline size={24} />
          </div>
          <div className=" flex flex-col flex-1 h-full overflow-x-auto ">
            <section>
              <div className=" mt-10 text-[12px] text-[#7A7A7A]">
                <div
                  className={`w-full border-t  border-[#7A7A7A] pt-4 justify-between inline-flex items-center  `}
                >
                  <div className=" flex items-center gap-2">
                    <IoChevronDownOutline size={16} />
                    <span>TEXT CHANNELS</span>
                  </div>
                  <FiPlus size={16} />
                </div>
              </div>
              <div className=" px-2">
                {community?.channels.map(({ channelId }, index) => {
                  return (
                    channelId.type === "text" && (
                      <button
                        onClick={() =>
                          router.push(
                            `/community/${communityId}/${channelId.name}`
                          )
                        }
                        key={index}
                        className=" p-2 rounded-[10px] w-full hover:bg-[#3772FF] hover:bg-opacity-5 focus:bg-[#3772FF] focus:bg-opacity-5 text-[#7A7A7A] flex items-center gap-2 "
                      >
                        <HiHashtag size={16} />
                        {channelId.name}
                      </button>
                    )
                  );
                })}
              </div>
            </section>

            <section>
              <div className=" mt-10 text-[12px] text-[#7A7A7A]">
                <div
                  className={`w-full pb-4 border-t  border-[#7A7A7A] pt-4 justify-between inline-flex items-center  `}
                >
                  <div className=" flex items-center gap-2">
                    <IoChevronDownOutline size={16} />
                    <span>VOICE CHANNELS</span>
                  </div>
                  <FiPlus size={16} />
                </div>
              </div>
              <div className=" px-2">
                {community?.channels.map(({ channelId }, index) => {
                  return (
                    channelId.type === "voice" && (
                      <button
                        key={index}
                        onClick={() =>
                          router.push(
                            `/community/${communityId}/${channelId.name}`
                          )
                        }
                        className=" p-2 rounded-[10px] w-full hover:bg-[#3772FF] hover:bg-opacity-5 focus:bg-[#3772FF] focus:bg-opacity-5 text-[#7A7A7A] flex items-center gap-2 "
                      >
                        <AiOutlineSound size={16} />
                        {channelId.name}
                      </button>
                    )
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityRooms;
