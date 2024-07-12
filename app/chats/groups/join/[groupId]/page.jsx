"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getNameInitials } from "../../../../../utils/functions/getNameInitials";
import Image from "next/image";
import { handleEndpoint } from "../../../../../utils/api/handleEndpoint";
import { useUser } from "../../../../../context/appContext";
import { useSocket } from "../../../../../context/socketContext";
import Loading from "../../../../loading";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const JoinGroup = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const { userDetail, getUser } = useUser();
  const { socket } = useSocket();

  const [joining, setJoining] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleGetGroup = async () => {
      if (!userDetail) return;
      setLoading(true);
      try {
        const response = await handleEndpoint(
          null,
          `groups/${groupId}/group`,
          "get",
          null
        );
        if (response) {
          setGroup(response);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    handleGetGroup();
  }, [groupId, userDetail]);

  const handleJoinGroup = async () => {
    if (!userDetail) return;
    try {
      setJoining(true);
      const response = await handleEndpoint(
        { user: userDetail },
        `groups/${groupId}/join/${userDetail._id}`,
        "put",
        null
      );
      if (response.ok) {
        console.log(response);
        await getUser();
        router.push(`/chats/groups/${groupId}`);
        if (socket.current) {
          socket.current.emit("joined-via-invitation-group", {
            groupId,
            user_id: userDetail._id,
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setJoining(false);
    }
  };

  if (loading) return <Loading />;
  return (
    group && (
      <div className=" text-[14px] w-full flex items-center justify-center h-full">
        <div className=" w-full z-2 relative py-20 max-w-[350px] p-10 mx-auto bg-[#181818]/50 backdrop-blur-xl items-center  rounded-3xl  border  border-[#393939]">
          <Image
            src={group?.avatar ?? "/avatar/2.svg"}
            className={` w-[70px] aspect-square rounded-full ${
              !group?.avatar && "hidden"
            }   object-cover bg-[#4C4C4C] mx-auto flex items-center justify-center `}
            width={100}
            height={100}
            alt={group?.name}
            priority={true}
          />

          {group?.avatar == null && (
            <div
              className="w-[70px] aspect-square rounded-full
             text-[#4C4C4C] flex items-center justify-center
              bg-[#4C4C4C]/20 text-[22px]"
            >
              {getNameInitials(group?.name ?? "B")}
            </div>
          )}
          <div className=" m-2 pb-3 text-[#575656] gap-1  flex flex-col  items-center justify-center text-center">
            <span>You&rsquo;ve been invited to join</span>
            <span className=" text-white text-2xl">{group?.name}</span>
            <div className=" flex  items-center gap-4">
              <div className=" flex items-center gap-2">
                <span className=" bg-green-600  w-[10px] h-[10px] relative flex rounded-full"></span>
                {Object.keys(group.members).length} Online
              </div>
              <div className=" flex items-center gap-2">
                <span className=" bg-[#4C4C4C]  w-[10px] h-[10px] relative flex rounded-full"></span>
                {`${Object.keys(group.members).length} Members`}
              </div>
            </div>
          </div>
          <button
            onClick={handleJoinGroup}
            disabled={joining}
            className={`w-full  flex items-center justify-center font-abeezeeItalic disabled:bg-[#282828] bg-[#3772FF] disabled:text-[#6D6D6D] text-black mt-[20px] text-[15px] rounded-[15px] font-bold py-[15px] relative transition-all duration-300 hover:bg-opacity-[70%]`}
          >
            {joining ? (
              <AiOutlineLoading3Quarters size={24} className=" animate-spin " />
            ) : (
              `Accept Invite`
            )}
          </button>
        </div>
      </div>
    )
  );
};

export default JoinGroup;
