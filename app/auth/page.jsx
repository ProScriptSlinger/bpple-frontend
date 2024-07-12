"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ImageComponent from "../../components/shared/ImageComponent/demo";
import { useUser } from "../../context/appContext";
import { useWalletInfo, useWeb3Modal } from "@web3modal/wagmi/react";
import Link from "next/link";
import formatAddress from "@/lib/formatAddress";

const Auth = () => {
  const router = useRouter();
  const [iconLoading, setIconLoading] = useState(true);

  const { address, pending, isConnecting, isConnected, isDisconnected, open } =
    useUser();

  const { walletInfo } = useWalletInfo();

  const handlenavigation = (to) => router.push(to);

  // const handleClick = () => {
  //   if (!isConnected) {
  //     solanaConnect();
  //   }
  // };

  return (
    <div className={`absolute w-full h-full overflow-auto`}>
      <div className="w-full h-full bg-cover bg-center bg-[url('/bg.svg')] flex items-center justify-center">
        <div className="mobile:w-[450px] mobile:h-[400px] w-full h-full bg-gradient-to-br from-[#292929] to-black mobile:rounded-[20px] mobile:border mobile:border-[#3b3b3b]">
          <div className="inline-flex w-full justify-center mt-[60px]">
            {iconLoading && (
              <div
                className={`w-[200px] h-[53px] animate-pulse bg-[#171717] rounded-[12px]`}
              ></div>
            )}
            <Image
              width={0}
              height={0}
              src="/icon/logo_whole.svg"
              alt=""
              className={`w-[200px] h-auto ${iconLoading && "hidden"}`}
              priority={true}
              onLoad={() => {
                setIconLoading(false);
              }}
            />
          </div>
          <div className="text-[20px] mt-[40px] font-abeezeeItalic w-full justify-center flex">
            Let&apos;s get started
          </div>
          <div
            className={`text-[10px] mt-[40px] w-full justify-center text-center flex font-ttfirs`}
          >
            Our goal is to ensure that you have everything you need to feel{" "}
            <br /> comfortable, confident, and ready to make an impact.
          </div>
          {/* <div className="w-full h-[50px] flex justify-center mt-[45px]">
            <div className="w-[280px] h-[45px] bg-[#222222] rounded-full border border-[#666666]">
              <Link href={"/auth/register"}>
                <button
                  className={
                    "w-[50%] h-full rounded-full bg-[#3772FF] text-black font-abeezeeItalic text-[13px] hover:bg-opacity-70 transition-all duration-100"
                  }
                >
                  Register
                </button>
              </Link>
              <Link href={"/auth/signin"}>
                <button
                  className={
                    "w-[50%] h-full rounded-full font-abeezeeItalic text-[12px]"
                  }
                >
                  Sign In
                </button>
              </Link>
            </div>
          </div> */}
          {/* <div className="text-[12px] mt-[40px] w-full justify-center flex font-ttfirs">
            Or continue with
          </div> */}
          <div className="w-full inline-flex justify-center mt-[40px]">
            <button
              onClick={() => open({ view: address ? "Account" : "Networks" })}
              className={
                "w-[50%] bg-[#222222] rounded-full text-white border border-[#666666]  h-[45px] flex items-center justify-center gap-2 font-abeezeeItalic text-[13px] hover:bg-opacity-70 transition-all duration-100"
              }
            >
              {walletInfo?.icon && (
                <img
                  src={walletInfo.icon}
                  alt={"logo"}
                  className="w-[25px] h-auto"
                />
              )}
              {/* {isConnecting && (
                <div className="ml-[7px] mr-[7px]">Connecting…</div>
              )} */}
              {pending && <div className="ml-[7px] mr-[7px]">Loading...</div>}
              {isDisconnected && (
                <div className="ml-[7px] mr-[7px]">Connect Wallet</div>
              )}
              {!pending && isConnected && address && (
                <div className="ml-[7px] mr-[7px]">
                  {`${address.slice(0, 5)}...${address.slice(-5)}`}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Auth;
