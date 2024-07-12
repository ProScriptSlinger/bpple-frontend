"use client";
import React, { useState } from "react";
import Image from "next/image";
import { AiFillFilePdf } from "react-icons/ai";
import { isURL } from "../../utils/functions/isUrl";
const MessageComponent = (message, rightFlag) => {
  if (message?.type === "context") {
    return (
      <>
        <div className="flex gap-4 items-center">
          <div
            className={`max-w-[455px] rounded-[20px] bg-[#232323] py-[15px] px-[20px] font-thin text-[13px] opacity-80 text-left break-all`}
          >
            {isURL(message?.content) ? (
              <a href={message?.content ?? "#"}>{message?.content}</a>
            ) : (
              message?.content
            )}
          </div>
          <Image
            src={"/community/icons/reply.svg"}
            width={0}
            height={0}
            className="w-[30px] cursor-pointer"
            alt="reply icon"
          />
        </div>
        <div
          className={`inline-flex mt-[10px]  items-center ${
            rightFlag === false ? "text-right mr-[20px]" : "ml-[20px]"
          } w-full relative`}
        >
          <div
            className={`absolute ${
              rightFlag === false ? "mobile:right-0 left-0" : "left-0"
            }`}
          >
            {message?.emoji?.length > 0 ? (
              <div className="inline-flex gap-[5px] px-[5px] py-[3px] bg-[#3772FF] bg-opacity-10 rounded-full items-center justify-center">
                {message.emoji.map((item, index) => (
                  <div key={index}>
                    <Image
                      src={`/emoji/${item}.png`}
                      width={0}
                      height={0}
                      alt=""
                      className="w-[12px] h-auto"
                    />
                  </div>
                ))}
                <p className="text-[12px] ml-[5px] text-[#979797]">
                  {message.emoji.length}
                </p>
              </div>
            ) : null}
            {message.readStatus ? (
              <div className="ml-[20px] inline-flex items-center">
                <div>
                  <Image
                    src="/icon/read.svg"
                    width={0}
                    height={0}
                    alt=""
                    className="w-[15px] h-auto"
                  />
                </div>
                <p className="text-[#797C7B] text-[10px] ml-[5px]">
                  {message?.when}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </>
    );
  } else if (message?.type === "voice") {
    return (
      <div className="bg-[#3772FF] px-[5px] py-[5px] inline-flex items-center rounded-full mt-[5px]">
        <button>
          {message.isPlaying ? (
            <Image
              src={`/icon/pause-circle.svg`}
              width={0}
              height={0}
              alt="pause"
              className="w-[20px] h-[20px]"
            />
          ) : (
            <Image
              src={`/icon/play.svg`}
              width={0}
              height={0}
              alt="play"
              className="w-[20px] h-[20px]"
            />
          )}
        </button>
        <div className="ml-[5px]">
          <Image
            src={`/icon/playStatus.svg`}
            width={0}
            height={0}
            alt=""
            className="w-[60px] h-auto"
          />
        </div>
        <p className="text-[10px] ml-4 text-black">{message.length}</p>
      </div>
    );
  } else if (message?.type === "file") {
    return (
      <div className="p-[20px] bg-[#3772FF] bg-opacity-5 inline-flex items-center text-[#979797] rounded-[12px]">
        <div className=" flex w-[100px]  text-white items-center justify-center">
          {message.img_uri ? (
            <Image
              src={message.img_uri}
              alt="file_image"
              width={0}
              height={0}
              className="w-[100px]"
            />
          ) : (
            <AiFillFilePdf size={50} />
          )}
        </div>
        <div className="text-left ml-[20px]">
          <p>{message.fileName}</p>
          <div className="text-[10px] inline-flex">
            {message?.size} - <span className="text-[#3772FF]">Download</span>
          </div>
        </div>
      </div>
    );
  } else if (message?.type === "image") {
    return (
      <div className="flex flex-col">
        <div className="p-[20px] bg-[#232323] inline-flex items-center text-[#979797] rounded-[12px]">
          <Image
            src={message.link}
            width={300}
            height={300}
            alt=""
            className="w-[200px] max-h-[200px] object-cover object-top  h-auto"
          />
        </div>
        {message.readStatus ? (
          <div className="ml-[20px] inline-flex items-center mt-[10px]">
            <div>
              <Image
                src="/icon/read.svg"
                width={0}
                height={0}
                alt=""
                className="w-[15px] h-auto"
              />
            </div>
            <p className="text-[#797C7B] text-[10px] ml-[5px]">
              {message.when}
            </p>
          </div>
        ) : null}
      </div>
    );
  } else if (message?.type === "audio") {
    return (
      <div className="flex flex-col">
        <div className="p-[20px] bg-[#232323] inline-flex items-center text-[#979797] rounded-[12px]">
          <audio src={message.link} controls />
        </div>
        {message.readStatus ? (
          <div className="ml-[20px] inline-flex items-center mt-[10px]">
            <div>
              <Image
                src="/icon/read.svg"
                width={0}
                height={0}
                alt=""
                className="w-[15px] h-auto"
              />
            </div>
            <p className="text-[#797C7B] text-[10px] ml-[5px]">
              {message.when}
            </p>
          </div>
        ) : null}
      </div>
    );
  }
};
export default MessageComponent;
