"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useUser } from "../../../../context/appContext";
import { useParams, usePathname } from "next/navigation";
import { getNameInitials } from "../../../../utils/functions/getNameInitials";
import { handleEndpoint } from "../../../../utils/api/handleEndpoint";
import { useSocket } from "../../../../context/socketContext";
import MessageComponent from "../../../../components/community/Message";

const Group = () => {
  let messageCounter = true;
  const { groupId } = useParams();
  const [loading, setLoading] = useState(true);
  const [chatsMessages, setChatsMessages] = useState([]);

  const [group, setGroup] = useState(null);
  const [stored_messages, setStored_Messages] = useState([]);
  const { userDetail } = useUser();
  const { user_group_messages } = useSocket();
  const [messages, setMessages] = useState([]);
  const pathName = usePathname();

  const Message = (index) => {
    if (index === 0) {
      return (
        <div className="w-full mt-[20px]">
          <div className="inline-flex items-start">
            <button
              className="mr-[20px]"
              onClick={() => setFriendProfileModal(!friendProfileModal)}
            >
              {chatsMessages[index]?.senderId.avater ? (
                <Image
                  src={chatsMessages[index]?.senderId.avater}
                  width={50}
                  height={50}
                  alt=""
                  className=" max-w-[45px] w-[45px] object-center rounded-full h-[45px]"
                />
              ) : (
                <div
                  className="w-[45px] aspect-square rounded-full
             bg-[#191919] flex items-center justify-center
              text-[#4C4C4C] text-[22px]"
                >
                  {getNameInitials(
                    chatsMessages[index]?.senderId.username ?? "B"
                  )}
                </div>
              )}
            </button>
            <div>
              <p className="text-[#2770FF] mt-[5px] mb-[5px] text-[14px]">
                {chatsMessages[index]?.senderId.username}
              </p>
              {MessageComponent(chatsMessages[index], messageCounter)}
            </div>
          </div>
        </div>
      );
    } else {
      if (
        chatsMessages[index].senderId._id ===
        chatsMessages[index - 1].senderId._id
      ) {
        if (messageCounter === true) {
          return (
            <div className="w-full mt-[10px]">
              <div className="inline-flex">
                <div className="ml-[60px]">
                  {MessageComponent(chatsMessages[index], messageCounter)}
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div className="w-full mobile:text-right text-left mt-[10px]">
              <div className="inline-flex text-left mobile:mr-[60px] mobile:ml-0 ml-[60px] mr-0">
                <div className="w-full">
                  {MessageComponent(chatsMessages[index], messageCounter)}
                </div>
              </div>
            </div>
          );
        }
      } else {
        messageCounter = !messageCounter;
        if (messageCounter === false) {
          return (
            <div className="w-full mobile:text-right text-left mt-[10px]">
              <div className="mobile:text-right flex mobile:flex-row-reverse items-start">
                <button
                  className="mobile:ml-[20px] mobile:mr-0 mr-[20px]"
                  onClick={() => setFriendProfileModal(!friendProfileModal)}
                >
                  <div className="w-[40px] flex flex-none">
                    {chatsMessages[index]?.senderId.avater ? (
                      <Image
                        src={chatsMessages[index]?.senderId.avater}
                        width={50}
                        height={50}
                        alt=""
                        className=" max-w-[45px] w-[45px] object-center rounded-full h-[45px]"
                      />
                    ) : (
                      <div
                        className="w-[45px] aspect-square rounded-full
             bg-[#191919] flex items-center justify-center
              text-[#4C4C4C] text-[22px]"
                      >
                        {getNameInitials(
                          chatsMessages[index]?.senderId.username ?? "B"
                        )}
                      </div>
                    )}
                  </div>
                </button>
                <div>
                  <p className="text-[#2770FF] mt-[5px] mb-[5px] text-[14px]">
                    {chatsMessages[index].senderId.username}
                  </p>
                  {MessageComponent(chatsMessages[index], messageCounter)}
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div className="w-full mt-[10px]">
              <div className="inline-flex text-left items-start">
                <button
                  className="mr-[20px]"
                  onClick={() => setFriendProfileModal(!friendProfileModal)}
                >
                  <div className="w-[40px] flex flex-none">
                    {chatsMessages[index]?.senderId.avater ? (
                      <Image
                        src={chatsMessages[index]?.senderId.avater}
                        width={50}
                        height={50}
                        alt=""
                        className=" max-w-[45px] w-[45px] object-center rounded-full h-[45px]"
                      />
                    ) : (
                      <div
                        className="w-[45px] aspect-square rounded-full
             bg-[#191919] flex items-center justify-center
              text-[#4C4C4C] text-[22px]"
                      >
                        {getNameInitials(
                          chatsMessages[index]?.senderId.username ?? "B"
                        )}
                      </div>
                    )}
                  </div>
                </button>
                <div>
                  <p className="text-[#2770FF] mt-[5px] mb-[5px] text-[14px]">
                    {chatsMessages[index].senderId.username}
                  </p>
                  {MessageComponent(chatsMessages[index], messageCounter)}
                </div>
              </div>
            </div>
          );
        }
      }
    }
  };

  useEffect(() => {
    const handleFindGroup = () => {
      if (!userDetail?.groups) return;
      const groupById = userDetail?.groups.find(
        (group) => group.groupId._id == groupId
      );
      setGroup(groupById.groupId);
    };

    handleFindGroup();
  }, [groupId, userDetail]);

  function copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Link copied to clipboard");
      })
      .catch((err) => {});
  }

  useEffect(() => {
    const getGroupMessages = async () => {
      const response = await handleEndpoint(
        null,
        `groups/${groupId}/messages`,
        "get",
        null
      );

      if (response) {
        console.log("messages++++?", response);
        setStored_Messages(response);
      }
    };

    getGroupMessages();
  }, [groupId, userDetail]);

  const chatContainerRef = useRef(null);
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

  useEffect(() => {
    if (user_group_messages[groupId]) {
      setMessages(user_group_messages[groupId]);
    }
  }, [user_group_messages]);

  useEffect(() => {
    if (stored_messages && messages)
      setChatsMessages([...stored_messages, ...messages]);
    else if (stored_messages && !messages)
      setChatsMessages([...stored_messages]);
    else if (!stored_messages && messages) setChatsMessages([...messages]);
  }, [stored_messages, messages]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({
        block: "center",
      });
    }
  }, [chatsMessages]);

  return (
    <>
      <div className="w-full h-full relative">
        <div className="w-full h-full absolute overflow-auto">
          <div className="w-full justify-center inline-flex mt-[30px]">
            {loading && (
              <div className="w-[100px] aspect-square rounded-full bg-[#121212] animate-pulse opacity-100"></div>
            )}

            <Image
              src={group?.avatar ?? "/avatar/2.svg"}
              className={` w-[100px] aspect-square rounded-full ${
                !group?.avatar && "hidden"
              }   object-cover bg-[#191919] flex items-center justify-center `}
              width={100}
              height={100}
              alt={"YC EC"}
              priority={true}
              onLoad={() => {
                setLoading(false);
              }}
            />

            {group?.avatar == null && (
              <div
                className="w-[100px] aspect-square rounded-full
             bg-[#191919] flex items-center justify-center
              text-[#4C4C4C] text-[22px]"
              >
                {getNameInitials(group?.name ?? "B")}
              </div>
            )}
          </div>
          <p className="w-full text-center text-[20px] mt-[10px]">
            {group?.name}
          </p>
          <p className="w-full  max-w-[80%] justify-center flex items-center mx-auto text-center text-[14px] mt-[10px] text-[#5D5D5D]">
            The terms and conditions contained in this Agreement and
            understandings, whether oral or written.
          </p>
          <p className="w-full text-center text-[16px] mt-[30px] text-[#5D5D5D]">
            Samit is created the Group of : {group?.name}
          </p>
          <button
            onClick={() =>
              copyToClipboard(
                `${window?.location.origin}/chats/groups/join/${groupId}`
              )
            }
            className="w-full text-center text-[#50FFFF] mt-[20px]"
          >
            Click to Invite People
          </button>

          <div className="w-full h-full relative">
            <div
              ref={chatContainerRef}
              className={`flex-row px-[40px] overflow-auto w-full flex-initial h-full absolute`}
            >
              {chatsMessages.map((item, index) => (
                <div key={index} className="w-full">
                  {Message(index)}
                </div>
              ))}
              <div className="w-full h-[20px]"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Group;
