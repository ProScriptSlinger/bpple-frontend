"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { useUser } from "../../../../../context/appContext";
import { getNameInitials } from "../../../../../utils/functions/getNameInitials";
import { toast } from "react-toastify";
// menu data, custom hooks and module
import useClickOutside from "../../../../../hooks/useClickOutside";

// sibebar data and modules
import Sidebar from "../../../../../components/common/Sidebar";
import { sidebarData } from "./data";

import { handleEndpoint } from "../../../../../utils/api/handleEndpoint";
import { useSocket } from "../../../../../context/socketContext";

const GroupHeader = ({ router }) => {
  const { socket } = useSocket();
  const [loading, setLoading] = useState(true);
  const { groupId } = useParams();
  const { userDetail } = useUser();
  const pathname = usePathname();
  const [group, setGroup] = useState(null);

  const ref = useRef(null);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const [username, setUsername] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);
  const [activeUser, setActiveUser] = useState();

  useEffect(() => {
    const handleFindGroup = () => {
      if (!userDetail?.groups) return;
      const groupById = userDetail.groups.find(
        (group) => group.groupId._id == groupId
      );
      setGroup(groupById?.groupId);
    };

    handleFindGroup();
  }, [groupId, userDetail]);
  useEffect(() => {
    username.length > 2 && fetchUsers();
  }, [username]);

  useClickOutside(ref, () => {
    setMenuVisible(false);
    setSidebarVisible(false);
    setUsername("");
  });

  if (pathname.includes(`/chats/groups/join`)) return null;

  const fetchUsers = async () => {
    try {
      const response = await handleEndpoint(
        null,
        `user/fetch-users?search=${username}`,
        "get",
        null
      );
      console.log("Fetch Users Func Response------>", response);
      setFoundUsers(response);
    } catch (err) {
      console.log(err);
    }
  };

  const inviteUser2Channel = async () => {
    try {
      const response = await handleEndpoint(
        null,
        `request/${activeUser}/${groupId}`,
        "post",
        null
      );
      if (response.ok) {
        toast.success("Invitation successufully sent");
        if (socket.current) {
          socket.current.emit("sent-invite-group-request", response);
          setStatus((prev) => ({ ...prev, sent: true }));
        } else {
          toast.error("Socket is not connected or initialized.");
        }
      }
      setActiveUser();
      setSidebarVisible(false);
      setMenuVisible(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddMember = (id) => {
    console.log("Clicked User Id------>", activeUser);
    inviteUser2Channel();
  };

  const UserItem = (props) => {
    const { username, avatar, onClick, user_id } = props;
    return (
      <>
        <button
          onClick={() => onClick(user_id)}
          className={`w-full h-[60px] inline-flex justify-between bg-[#50FFFF] mb-[5px] px-[12px] py-[5px] hover:bg-opacity-5 focus:bg-opacity-5 ${
            activeUser == user_id ? "border-white border-2" : ""
          }  bg-opacity-5 rounded-[10px] items-center`}
        >
          <div className="inline-flex items-center">
            <Image
              src={avatar ?? "/avatar/2.svg"}
              className="w-[50px] aspect-square rounded-xl
               object-cover bg-[#191919] flex items-center justify-center "
              width={200}
              height={200}
              alt={username}
            />
            <div className={`ml-[10px] ${props.siderWidth < 390 && "hidden"}`}>
              <p className="text-left capitalize">{username}</p>
            </div>
          </div>
          <div className="relative text-right">
            <p className="text-[#797C7B] text-[12px]">5 mins ago</p>
            {/* <div className="inline-flex">
              <Image
                src="/icon/ring_mute.svg"
                width={0}
                height={0}
                alt=""
                className="w-[15px] h-auto flex flex-none mr-[5px]"
              />
            </div> */}
          </div>
        </button>
      </>
    );
  };

  useEffect(() => {
    setUsername("");
    setFoundUsers([]);
  }, [isSidebarVisible]);

  return (
    pathname.includes(`/chats/groups/`) && (
      <>
        <div
          className="w-full gap-2 inline-flex justify-between mt-[40px]"
          ref={ref}
        >
          {loading && (
            <div className={`inline-flex items-center`}>
              <div className="w-[45px] aspect-square rounded-full bg-[#171717] animate-pulse"></div>
              <div className="ml-[10px]">
                <div className="w-[100px] h-[20px] rounded-[10px] bg-[#171717] animate-pulse mb-[3px]"></div>
                <div className="w-[150px] h-[20px] rounded-[10px] bg-[#171717] animate-pulse"></div>
              </div>
            </div>
          )}
          <button
            className={`inline-flex items-center hover:opacity-70 ${
              loading && "hidden"
            }`}
          >
            <Image
              src={group?.avatar ?? "/avatar/2.svg"}
              className={` w-[45px] aspect-square rounded-full ${
                !group?.avatar && "hidden"
              }   object-cover bg-[#191919] flex items-center justify-center `}
              width={45}
              height={45}
              alt={group?.name}
              priority={true}
              onLoad={() => {
                setLoading(false);
              }}
            />
            {group?.avatar == null && (
              <div
                className="w-[45px] aspect-square rounded-full
             bg-[#191919] flex items-center justify-center
              text-[#4C4C4C] text-[22px]"
              >
                {getNameInitials(group?.name ?? "B")}
              </div>
            )}

            <div className="ml-[20px] text-left w-[161px]">
              <p className="">{group?.name}</p>
              <p className="text-[12px] text-[#7A7A7A]">
                {group && Object.keys(group?.members)?.length} Members – 0
                Active
              </p>
            </div>
          </button>
          <div className=" flex-1 relative">
            {loading && (
              <div className="w-full rounded-[10px] bg-[#171717] animate-pulse h-[40px]"></div>
            )}

            <Image
              src="/icon/search_grey.svg"
              width={0}
              height={0}
              alt="logo"
              className={`w-[14px] h-auto absolute left-[25px] top-[13px] ${
                loading && "hidden"
              }`}
            />
            <input
              className={`py-[10px] w-full outline-none bg-[#181818] px-[50px] text-[14px] rounded-[12px] placeholder:text-[#4C4C4C] placeholder:text-[12px] ${
                loading && "hidden"
              }`}
              placeholder="Search Group"
            />
          </div>
          <div className="inline-flex">
            {loading && (
              <div className="w-[40px] rounded-[10px] aspect-square bg-[#171717] animate-pulse mr-[20px]"></div>
            )}
            <Image
              width={0}
              height={0}
              src="/icon/phone.svg"
              alt=""
              className={`w-[20px] h-auto mr-[20px] ${loading && "hidden"}`}
            />
            {loading && (
              <div className="w-[40px] rounded-[10px] aspect-square bg-[#171717] animate-pulse mr-[20px]"></div>
            )}
            <Image
              width={0}
              height={0}
              src="/icon/camera_white.svg"
              alt=""
              className={`w-[27px] h-auto mr-[20px] ${loading && "hidden"}`}
            />
            {loading && (
              <div className="w-[40px] rounded-[10px] aspect-square bg-[#171717] animate-pulse mr-[20px]"></div>
            )}
            <Image
              width={0}
              height={0}
              src="/icon/detail.svg"
              id="dropdownHoverButton"
              data-dropdown-toggle="dropdownHover"
              alt=""
              className={`w-[5px] h-auto ${loading && "hidden"} cursor-pointer`}
              onClick={() => setMenuVisible(!isMenuVisible)}
            />
            <div
              id="dropdownHover"
              className={`z-10 mt-12 right-4 ${
                !isMenuVisible ? "hidden" : ""
              } bg-[#434343] bg-opacity-[36%]  divide-y divide-gray-100 rounded-lg shadow w-44 backdrop-blur dark:bg-gray-700 absolute`}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200 text-[13px]"
                aria-labelledby="dropdownHoverButton"
              >
                <li key="add-member">
                  <div
                    onClick={() => setSidebarVisible(true)}
                    className="block px-4 py-2 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                  >
                    Add members
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <Sidebar
            {...sidebarData}
            visible={isSidebarVisible}
            setVisible={setSidebarVisible}
          >
            <>
              <div className="w-full h-full overflow-auto">
                <p className="text-[#9D9D9D] text-[12px] mt-[50px]">
                  Please input username or email
                </p>
                <input
                  className="w-full border-b border-[#9D9D9D] bg-transparent pt-2 pb-1.5 text-white outline outline-0 placeholder:font-ttfirs focus:border-[#53FAFB] focus:outline-0 placeholder-[#9D9D9D] placeholder:text-[14px]"
                  placeholder="Name is here"
                  onChange={(event) => setUsername(event.target.value)}
                  value={username}
                />
              </div>
              <div className="w-full flex flex-col items-center gap-4">
                {foundUsers.length > 0
                  ? foundUsers.map((item, index) => (
                      <UserItem onClick={setActiveUser} key={index} {...item} />
                    ))
                  : "No users"}
              </div>
              <button
                className="w-full h-[40px] disabled:bg-[#282828] disabled:text-[#6D6D6D] rounded-[12px] bg-[#53FAFB] text-black mt-[20px] bottom-0 flex-none"
                onClick={handleAddMember}
                disabled={!activeUser}
              >
                Add Member
              </button>
            </>
          </Sidebar>
        </div>
      </>
    )
  );
};
export default GroupHeader;
