"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import SiderList from "./sider";
import { useUser } from "../../../context/appContext";
import { getNameInitials } from "../../../utils/functions/getNameInitials";
// import { useWalletInfo, useWeb3Modal } from "@web3modal/wagmi/react";
import { useSiderBar } from "../../../context/siderbar";
import { updateGreeting } from "../../../utils/functions/userFunctions";
import { usePrivy, useWallets } from "@privy-io/react-auth";

const Sider = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { wallets } = useWallets();

  // const wallet = wallets[0]?.meta?.icon ? wallets[0] : wallets[1];
  const wallet = wallets[0];
  // const [siderWidth, setSiderWidth] = useState(300);
  const [logout, setLogout] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [closeButton, setCloseButton] = useState(true);
  const [transition, setTransition] = useState(true);

  const { setUserDetail, userDetail, address, disconnect, setWalletConnected } =
    useUser();

  // const { walletInfo } = useWalletInfo();

  const { sideBarCloseButton, siderWidth, handleCloseSiderBar } = useSiderBar();
  const handleOpenLogout = () => {
    setLogout(!logout);
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error("Error copying text to clipboard:", error);
    }
  };

  const handleLogout = async () => {
    wallet.disconnect();
    setWalletConnected(false);
    setUserDetail(null);
    router.push("/auth");
    setLogout(false);
    localStorage.clear();
  };

  const [loading, setLoading] = useState(true);
  if (pathname.includes(`/join/`)) return;
  if (pathname.includes(`/auth`)) return;

  return (
    <>
      <div
        className={`desktop:flex-none prevent-select desktop:flex hidden justify-center bg-[#171717] h-full relative resize-sidebar-current w-[80px] overflow-auto ${
          transition ? "transition-[width] duration-200" : "transition-none"
        }`}
      >
        <div
          className="resize-sidebar-handle"
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "1px",
            cursor: "ew-resize",
          }}
        ></div>
        <div className="w-[80%] flex flex-col h-full">
          <div
            className={`mt-[65px]
                flex justify-center mb-[40px]
            }`}
          >
            <div className={`h-auto w-[40px]`}>
              {loading && (
                <div className="w-full aspect-square bg-[#121212] rounded-[10px]"></div>
              )}
              <Image
                src="/icon/logo.svg"
                width={0}
                height={0}
                alt=""
                className={`w-full h-auto ${loading && "hidden"}`}
                priority={true}
                onLoad={() => setLoading(false)}
              />
            </div>
          </div>

          <SiderList pathname={pathname} siderWidth={siderWidth} />

          <div className="bottom-0 z-10">
            <ul className="text-white text-md mt-5">
              <button
                className={`mt-[35px] inline-flex w-full transition-all duration-100 justify-center
                `}
                // onClick={() => router.push("/setting")}
              >
                <div className="w-[40px]">
                  {loading1 && (
                    <div className="w-[40px] h-[40px] bg-[#181818] rounded-full animate-pulse"></div>
                  )}
                  {userDetail?.avatar ? (
                    <Image
                      src={userDetail?.avatar ?? "/avatar/2.svg"}
                      className={`w-[40px] aspect-square rounded-full
                      object-cover bg-[#191919] flex items-center justify-center ${
                        loading1 && "hidden"
                      }`}
                      width={200}
                      height={200}
                      alt={"YC EC"}
                      onLoad={() => setLoading1(false)}
                    />
                  ) : (
                    <div
                      className="w-[40px] aspect-square rounded-full
             bg-[#191919] flex items-center justify-center
              text-[#4C4C4C] text-[22px] side-item-icon"
                    >
                      {getNameInitials(userDetail?.username ?? "B I")}
                      <div
                        className={`capitalize font-ttfirs  items-center flex rounded-lg  fixed left-[70px] px-2 h-[40px] side-item-des bg-[#3772FF] bg-opacity-35 `}
                      >
                        <div className="text-[14px]">
                          {userDetail?.username}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </button>
              {/* {siderWidth > 250 ? (
                <div className="w-full flex justify-center mt-[15px]">
                  <div className="w-[200px] h-[70px] bg-[#4F4F4F] bg-opacity-10 rounded-[20px] flex-col justify-center hover:opacity-70 transition-all duration-100">
                    <p className="text-[#A9A9A9] text-[14px] mt-[7px] text-center">
                      {userDetail?.xp >= 150 && userDetail?.xp >= 300
                        ? " Level 1"
                        : " Level 1"}
                    </p>
                    <div className="w-full  flex-col items-center flex justify-center mt-[5px]">
                      <div className=" flex relative items-center justify-center w-[150px]  ">
                        <span
                          className={` bg-[#6C6C6C] w-full h-[7px] rounded-xl relative`}
                        />
                        <span
                          className={` left-0 w-[20%] bg-[#3772FF]  duration-700 h-[7px] rounded-xl  absolute`}
                        />
                      </div>
                    </div>
                    <p className="text-[#A9A9A9] text-[10px] mt-[7px] text-center">
                      XP. {userDetail?.xp ?? 150}/1500 XP
                    </p>
                  </div>
                </div>
              ) : null} */}

              <div className="w-full inline-flex items-center justify-center side-item-icon">
                <button
                  onClick={() => handleCopy(address)}
                  className={`px-[7px] mb-[20px] h-[40px] rounded-full border border-[#535353] inline-flex items-center justify-center font-ttfirs text-[12px] mt-[15px] transition-all duration-100`}
                >
                  {wallet && (
                    <img
                      src={wallet?.meta?.icon}
                      alt={"wallet icon"}
                      className="w-[25px] h-auto"
                    />
                  )}
                  <div className="fixed p-2 px-2 h-[40px] flex items-center rounded-lg left-[70px] side-item-des bg-[#3772FF] bg-opacity-35 ">
                    {/* {isConnecting && (
                      <div className="ml-[7px] mr-[7px]">Connecting…</div>
                    )}
                    {isDisconnected && (
                      <div className="ml-[7px] mr-[7px]">Connect Wallet</div>
                    )} */}
                    {wallet && (
                      <div className="ml-[7px] mr-[7px]">
                        {`${wallet.address.slice(
                          0,
                          5
                        )}...${wallet.address.slice(-5)}`}
                      </div>
                    )}

                    {wallet && (
                      <Image
                        src="/icon/copy.svg"
                        width={0}
                        height={0}
                        alt={"logo"}
                        priority={true}
                        className="w-[15px] h-auto"
                      />
                    )}
                  </div>
                </button>
              </div>
              <button
                className="w-full inline-flex items-center justify-center text-white font-ttfirs font-thin text-[13px] mt-[30px] mb-[30px] side-item-icon"
                onClick={handleOpenLogout}
              >
                <Image
                  className="w-[20px] h-auto"
                  src="/icon/logout.svg"
                  width={0}
                  height={0}
                  alt={"logo"}
                  priority={true}
                />
                <div
                  className={`capitalize font-ttfirs  items-center flex rounded-lg  fixed left-[70px] px-2 h-[40px] side-item-des bg-[#3772FF] bg-opacity-35 `}
                >
                  <div className="text-[14px]">Log out</div>
                </div>
              </button>
            </ul>
          </div>
        </div>
      </div>
      {logout === true ? (
        <>
          <div
            className="fixed right-0 left-0 top-0 bottom-0 z-10"
            onClick={handleOpenLogout}
          ></div>
          <div className="w-[350px] fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[220px] bg-[#181818] border border-[#393939] rounded-[20px]">
            <p className="w-full flex justify-center text-[20px] font-bold mt-[30px]">
              Logout
            </p>
            <p className="w-full flex justify-center mt-[20px]">
              Are you sure, you want to log out?
            </p>
            <div className="w-full flex justify-center mt-[30px]">
              <button
                className="w-[120px] h-[45px] border border-[#3772FF] rounded-full text-[#3772FF] text-[14px] mr-[15px] hover:opacity-70"
                onClick={handleOpenLogout}
              >
                Cancel
              </button>
              <button
                className="w-[120px] h-[45px] bg-[#3772FF] rounded-full text-white text-[14px] font-bold hover:opacity-70"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
export default Sider;
