import { useState } from "react";
import Image from "next/image";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { handleEndpoint } from "@/utils/api/handleEndpoint";
import { useUser } from "@/context/appContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getNameInitials } from "../../../utils/functions/getNameInitials";
import { useSocket } from "@/context/socketContext";

const SearchMember = (props) => {
  const [search, setSearch] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeUser, setActiveUser] = useState();
  const { userDetail, getUserData } = useUser();
  const { siderWidth } = props;
  const router = useRouter();
  const { socket } = useSocket();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await handleEndpoint(
        null,
        `user/fetch-users?search=${search}`,
        "get",
        null
      );
      setLoading(false);
      setFoundUsers(response);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleAddChart = async (_id, user_id) => {
    setLoading(true);
    const res = await handleEndpoint(
      null,
      `chat/add-chat/${userDetail._id}-${_id}`,
      "post",
      null
    );
    await getUserData();
    props.setVisibleSearch(false);
    socket.current.emit("friend-start-chat", {
      dmId: res.dmID,
      senderId: user_id,
    });
    setLoading(false);
    router.push(`/chats/${res.dmID}`);
  };

  const UserItem = (props) => {
    const { username, avatar, onClick, _id, user_id } = props;
    return (
      <>
        <button
          onClick={() => onClick(_id, user_id)}
          className={`w-full h-[60px] inline-flex justify-between bg-[#3772FF] mb-[5px] px-[12px] py-[5px] hover:bg-opacity-5 focus:bg-opacity-5 ${
            activeUser == _id ? "border-[#9D9D9D] border-[1px]" : ""
          }  bg-opacity-5 rounded-[10px] items-center`}
        >
          <div className="inline-flex items-center">
            {avatar ? (
              <Image
                src={avatar}
                className="w-[50px] aspect-square rounded-xl
                 object-cover bg-[#191919] flex items-center justify-center "
                width={200}
                height={200}
                alt={username}
              />
            ) : (
              <div
                className="w-[40px] aspect-square rounded-full
             bg-[#191919] flex items-center justify-center
              text-[#4C4C4C] text-[22px] side-item-icon"
              >
                {getNameInitials(username ?? "B I")}
                <div
                  className={`capitalize font-ttfirs  items-center flex rounded-lg  fixed left-[70px] px-2 h-[40px] side-item-des bg-[#3772FF] bg-opacity-35 `}
                >
                  <div className="text-[14px]">{username}</div>
                </div>
              </div>
            )}
            <div className={`ml-[10px] ${siderWidth < 250 && "hidden"}`}>
              <p className="text-left capitalize">{username}</p>
            </div>
          </div>
          <div
            className={`relative text-right ${siderWidth < 250 && "hidden"}`}
          >
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

  return (
    <>
      <div
        className={`flex-1 relative w-full justify-center mt-[30px] ${
          siderWidth < 250 && "hidden"
        }`}
      >
        <Image
          src="/icon/search_grey.svg"
          width={0}
          height={0}
          alt="logo"
          className={`w-[14px] h-auto absolute left-[25px] top-[13px]`}
        />
        <input
          className={`py-[10px] w-full outline-none bg-[#181818] px-[50px] text-[14px] rounded-[12px] placeholder:text-[#4C4C4C] placeholder:text-[12px]`}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Friends"
          value={search}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              console.log("Enter key pressed!", search);
              fetchUsers();
              // Add your logic here, e.g., trigger a search function
            }
          }}
        />
      </div>
      <div className="w-full flex justify-center">
        <div className="w-full flex flex-col items-center gap-4 mt-[30px]">
          {loading ? (
            <AiOutlineLoading3Quarters size={24} className=" animate-spin" />
          ) : foundUsers.length > 0 ? (
            foundUsers.map(
              (item, index) =>
                userDetail._id !== item._id && (
                  <UserItem onClick={handleAddChart} key={index} {...item} />
                )
            )
          ) : (
            "No users"
          )}
        </div>
      </div>
    </>
  );
};

export default SearchMember;
