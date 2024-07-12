"use client";
import React, { useState, useEffect } from "react";
import MessageLoader from "../../components/notification/message";
import dynamic from "next/dynamic";
import { useUser } from "../../context/appContext";
import { timeSince } from "../../utils/functions/timeSince";
const Message = dynamic(() => import("../../components/notification/message"), {
  ssr: false,
  loading: () => <MessageLoader />,
});
const Notification = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const { requestsSent, requestsReceived } = useUser();
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    if (requestsReceived.length > 0 || requestsSent.length > 0) {
      let bucket = [];
      requestsReceived
        .concat(requestsSent)
        .sort((a, b) => a.createdAt - b.createdAt)
        .map((item) => {
          const { sender, recipient } = item;
          const isSender = sender?.username ? true : false;
          bucket.push({
            type: "Request",
            isSender: isSender,
            date: timeSince(item.createdAt),
            who: isSender ? sender.username : recipient.username,
            onlineStatus: true,
            avatar: isSender ? sender.avatar : recipient.avatar,
            where: item.group.name,
            groupId: item.group._id,
            des: !isSender ? " is invited to " : "invite you to",
            context: "",
          });
        });
      console.log("Bucket------>", bucket);
      setNotifications(bucket);
      // setNotifications([
      //   {
      //     type: "Request",
      //     date: timeSince(item.createdAt),
      //     who: "",
      //     onlineStatus: true,
      //     avatar: "/avatar/3.svg",
      //     where: "Test",
      //     context: "",
      //   },
      // ]);
    }
  }, [requestsReceived, requestsSent]);
  const [currentCategory, setCurrentCategory] = useState("All");
  const categories = [
    { title: "All", counter: 0 },
    { title: "Unread", counter: 0 },
    { title: "Mentions", counter: 213 },
    { title: "Requests", counter: 10 },
    { title: "Newest", counter: 0 },
  ];
  // const notifications = [
  //   {
  //     type: "Request",
  //     date: "2 Days ago",
  //     who: "@Brondon",
  //     onlineStatus: true,
  //     avatar: "/avatar/3.svg",
  //     where: "Test",
  //     context: "",
  //   },
  //   {
  //     type: "Shared",
  //     image: "/notification/1.svg",
  //     context:
  //       "The terms and conditions contained in this Agreement shall constitute the entire agreement between ...",
  //     onlineStatus: false,
  //     avatar: "/avatar/3.svg",
  //     who: "@KitshunaFowyu",
  //     where: "Community",
  //     date: "8 min ago",
  //   },
  //   {
  //     type: "Mentioned",
  //     date: "3 Days ago",
  //     who: "@KitshunaFowyu",
  //     onlineStatus: true,
  //     avatar: "/avatar/3.svg",
  //     where: "comment",
  //     context: "",
  //   },
  //   {
  //     type: "Shared",
  //     image: "/notification/1.svg",
  //     context:
  //       "The terms and conditions contained in this Agreement shall constitute the entire agreement between ...",
  //     onlineStatus: false,
  //     avatar: "/avatar/3.svg",
  //     who: "@KitshunaFowyu",
  //     where: "Community",
  //     date: "8 min ago",
  //   },
  //   {
  //     type: "Mentioned",
  //     date: "3 Days ago",
  //     who: "@KitshunaFowyu",
  //     onlineStatus: true,
  //     avatar: "/avatar/3.svg",
  //     where: "comment",
  //     context: "",
  //   },
  // ];
  const handleChangeCategory = (title) => {
    setCurrentCategory(title);
  };
  const _filterName = (counter, title) => {
    return (
      <>
        <button
          className={`${
            currentCategory === title
              ? "bg-[#3772FF] text-black"
              : "bg-[#1E1E1E] text-[#6D6D6D]"
          } items-center justify-center px-[20px] py-[10px] text-[12px] rounded-full font-ttfirs font-[600] inline-flex`}
          onClick={() => {
            handleChangeCategory(title);
          }}
        >
          {title}{" "}
          {counter ? (
            <div
              className={`${
                currentCategory === title
                  ? "bg-black text-black"
                  : "bg-[#3772FF] text-[#3772FF]"
              } bg-opacity-10 text-[10px] px-[10px] py-[2px] rounded-full ml-[5px] font-thin`}
            >
              {counter}
            </div>
          ) : null}
        </button>
      </>
    );
  };
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
  return (
    <>
      <div className="h-full overflow-auto mt-[20px]">
        <div className="px-[22px]">
          <div className="w-full inline-flex gap-[10px] overflow-auto mb-[5px] prevent-select">
            {categories.map((items, index) => {
              return (
                <div key={index}>{_filterName(items.counter, items.title)}</div>
              );
            })}
          </div>
          <div className="text-white font-ttfirs text-[15px] mt-[30px] inline-flex relative w-full mb-[5px] prevent-select">
            Today
            <button className="text-[#3772FF] absolute right-0">
              Mark all as read
            </button>
          </div>
          <div className="overflow-auto">
            <div className="mb-[10px]">
              {notifications.map((item, index) => (
                <div key={index}>
                  <Message item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Notification;
