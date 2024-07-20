"use client";
import Image from "next/image";
import { useEffect } from "react";
import { useUser } from "../../context/appContext";
import Link from "next/link";

const Page = () => {
  const { chats, userDetail } = useUser();
  useEffect(() => {
    if ((chats.length && userDetail?.groups.length) != 0) {
    }
  }, []);
  return (
    <div className="w-full">
      <div className="w-full h-full justify-center flex items-center relative px-4">
        {(chats?.length && userDetail?.groups.length) != 0 ? (
          <div className="flex w-full h-full items-center justify-center">
            <div className="flex flex-col items-center justify-center text-center">
              <div className=" bg-[#232323]  items-center justify-center  mb-5  p-5 rounded-full  inline-block">
                <Image
                  width={40}
                  height={40}
                  alt=""
                  src="/icon/nochat-Icon.png"
                />
              </div>
              <p className="text-[30px]">No Chat Found</p>
              <p className="text-[15px] max-w-[80%] mx-auto flex text-[#707070] my-[30px]">
                To start chat please select a friend to contact him and It will
                appearing chat here
              </p>

              <Link href="/friends" className="w-fit">
                <div className="flex items-center justify-center w-[350px] h-[50px] bg-[#3772FF] font-bold text-white text-[20px] rounded-[12px]  hover:opacity-70">
                  Send Friend Request
                </div>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex w-full h-full items-center justify-center">
            <div className="flex-col text-center">
              <div className=" bg-[#232323]  items-center justify-center  mb-5  p-5 rounded-full  inline-block">
                <Image
                  width={40}
                  height={40}
                  alt=""
                  src="/icon/chats.svg"
                  className=" "
                />
              </div>
              <p className="text-[30px]">Access Your Chats Here</p>
              <p className="text-[15px]   flex justify-center text-[#707070] mt-[30px]">
                Exchange messages with others.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Page;
