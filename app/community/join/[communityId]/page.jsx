"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getNameInitials } from "../../../../utils/functions/getNameInitials";
import Image from "next/image";
import { handleEndpoint } from "../../../../utils/api/handleEndpoint";
import { useUser } from "../../../../context/appContext";
import Loading from "../../../loading";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSocket } from "../../../../context/socketContext";
import { IoMdLogIn } from "react-icons/io";

const JoinCommunity = () => {
  const { communityId } = useParams();
  const [community, setcommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userDetail, getUser } = useUser();
  const { socket } = useSocket();

  const [joining, setJoining] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleGetcommunity = async () => {
      if (!userDetail) return;
      setLoading(true);
      try {
        const response = await handleEndpoint(
          null,
          `community/${communityId}/community`,
          "get",
          null
        );
        if (response) {
          setcommunity(response);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    handleGetcommunity();
  }, [communityId, userDetail]);

  const handleJoinCommunity = async () => {
    if (!userDetail) return;
    try {
      setJoining(true);
      const response = await handleEndpoint(
        { user: userDetail },
        `community/${communityId}/join/${userDetail._id}`,
        "put",
        null
      );
      if (response.ok) {
        console.log(response);
        await getUser();
        router.push(`/community/${communityId}`);
        if (socket.current) {
          socket.current.emit("joined-via-invitation-community", {
            communityId,
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
    community && (
      <div className=" text-[14px] w-full flex items-center justify-center h-full">
        <div className=" w-full z-2 relative py-20 max-w-[350px] p-10 mx-auto bg-[#181818]/50 backdrop-blur-xl items-center  rounded-3xl  border  border-[#393939]">
          <Image
            src={community?.avatar}
            className={` w-[70px] aspect-square rounded-full ${
              !community?.avatar && "hidden"
            }   object-cover bg-[#4C4C4C] mx-auto flex items-center justify-center `}
            width={100}
            height={100}
            alt={community.name}
            priority={true}
          />

          {community?.avatar == null && (
            <div
              className="w-[70px] aspect-square rounded-full
             text-[#4C4C4C] flex items-center justify-center
              bg-[#4C4C4C]/20 text-[22px]"
            >
              {getNameInitials(community?.name ?? "B")}
            </div>
          )}
          <div className=" m-2 pb-3 text-[#575656] gap-1  flex flex-col  items-center justify-center text-center">
            <span>You&rsquo;ve been invited to join</span>
            <span className=" text-white text-2xl">
              {community?.name} Community
            </span>
            <div className=" flex  items-center gap-2">
              <div className=" flex items-center gap-2">
                <span className=" bg-green-600  w-[10px] h-[10px] relative flex rounded-full"></span>
                {Object.keys(community.members).length} Online
              </div>
              <div className=" flex items-center gap-2">
                <span className="   relative flex rounded-full">-</span>
                {`${Object.keys(community.members).length} Members`}
              </div>
            </div>
          </div>
          <button
            onClick={handleJoinCommunity}
            disabled={joining}
            className={`w-full gap-2 flex items-center justify-center font-abeezeeItalic disabled:bg-[#282828] bg-[#3772FF] disabled:text-[#6D6D6D] text-white mt-[20px] text-[15px] rounded-[15px] font-bold py-[15px] relative transition-all duration-300 hover:bg-opacity-[70%]`}
          >
            {joining ? (
              <AiOutlineLoading3Quarters size={24} className=" animate-spin " />
            ) : (
              <IoMdLogIn size={24} />
            )}
            Accept & Join Community
          </button>
        </div>
      </div>
    )
  );
};

export default JoinCommunity;
