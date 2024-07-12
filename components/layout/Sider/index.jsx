"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import SiderList from "./sider";
import { useUser } from "../../../context/appContext";
import { getNameInitials } from "../../../utils/functions/getNameInitials";
import { useWalletInfo, useWeb3Modal } from "@web3modal/wagmi/react";
import { useSiderBar } from "../../../context/siderbar";
import { updateGreeting } from "../../../utils/functions/userFunctions";

const Sider = () => {
  const router = useRouter();
  const pathname = usePathname();
  // const [siderWidth, setSiderWidth] = useState(300);
  const [logout, setLogout] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [closeButton, setCloseButton] = useState(true);
  const [transition, setTransition] = useState(true);
  const { setUserDetail, userDetail, address, isConnecting, isDisconnected } =
    useUser();

  const { walletInfo } = useWalletInfo();

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
    setUserDetail(null);
    router.push("/auth");
    setLogout(false);
    localStorage.clear();
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pathname.includes(`/join/`)) return;
    const handle = document.querySelector(".resize-sidebar-handle");
    const sidebar = document.querySelector(".resize-sidebar-current");

    if (!handle || !sidebar) {
      return;
    }

    let isResizing = false;
    let lastDownX = 0;

    handle.addEventListener("mousedown", (e) => {
      isResizing = true;
      lastDownX = e.clientX || 0;
      setTransition(false);
    });

    document.addEventListener("mousemove", (e) => {
      if (!isResizing) return;

      const width = e.clientX;
      if (width > 300) {
        setSiderWidth(300);
        sidebar.style.width = `${300}px`;
      } else if (width > 80) {
        setSiderWidth(width);
        sidebar.style.width = `${width}px`;
      } else {
        setSiderWidth(80);
        sidebar.style.width = `${80}px`;
      }
    });

    document.addEventListener("mouseup", () => {
      isResizing = false;
      setTransition(true);
    });

    return () => {
      document.removeEventListener("mousemove", () => {});
      document.removeEventListener("mouseup", () => {});
    };
  }, []);

  if (pathname.includes(`/join/`)) return;

  return (
    <>
      <div
        className={`desktop:flex-none prevent-select desktop:flex hidden justify-center bg-[#171717] h-full relative resize-sidebar-current w-[300px] overflow-auto ${
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
        <button
          className={`absolute right-[40px] top-[60px] ${
            siderWidth > 250 ? "block" : "hidden"
          }`}
          onClick={() => handleCloseSiderBar()}
        >
          <Image
            src="/icon/close.svg"
            width={0}
            height={0}
            alt=""
            className="w-[15px] h-auto"
          />
        </button>
        <div className="w-[80%] flex flex-col h-full">
          <div
            className={`mt-[65px]  ${
              siderWidth > 250
                ? "inline-flex ml-[20px] mb-[30px]"
                : `flex justify-center mb-[40px]`
            }`}
          >
            <div
              className={`h-auto ${siderWidth > 250 ? "w-[50px]" : "w-[40px]"}`}
            >
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

          <div className="bottom-0">
            <ul className="text-white text-md mt-5">
              <button
                className={`mt-[35px] inline-flex w-full hover:opacity-70 transition-all duration-100 ${
                  siderWidth > 250 ? "ml-[22px]" : "justify-center"
                }`}
                onClick={() => router.push("/setting")}
              >
                <div className="w-[40px]">
                  {loading1 && (
                    <div className="w-[40px] h-[40px] bg-[#181818] rounded-full animate-pulse"></div>
                  )}
                  {userDetail?.avatar ? (
                    <Image
                      src={userDetail?.avatar ?? "/avatar/2.svg"}
                      className={`w-[50px] aspect-square rounded-xl
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
                      className="w-[50px] aspect-square rounded-xl
             bg-[#191919] flex items-center justify-center
              text-[#4C4C4C] text-[22px]"
                    >
                      {getNameInitials(userDetail?.username ?? "B I")}
                    </div>
                  )}
                </div>
                {siderWidth > 250 ? (
                  <div
                    className={`ml-[10px]  capitalize font-ttfirs  items-start flex flex-col`}
                  >
                    <div className="text-[#575757] text-[12px]">
                      {updateGreeting()}
                    </div>
                    <div className="text-[14px]">{userDetail?.username}</div>
                  </div>
                ) : null}
              </button>
              {siderWidth > 250 ? (
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
              ) : null}

              <div className="w-full inline-flex items-center justify-center">
                <button
                  onClick={() => handleCopy(address)}
                  className={`${
                    siderWidth > 250 ? "w-[200px]" : "px-[7px] mb-[20px]"
                  } h-[40px] rounded-full border border-[#535353] inline-flex items-center justify-center font-ttfirs text-[12px] mt-[15px] hover:opacity-70 transition-all duration-100`}
                >
                  {walletInfo?.icon && (
                    <img
                      src={walletInfo.icon}
                      alt={"logo"}
                      className="w-[25px] h-auto"
                    />
                  )}
                  {siderWidth > 250 ? (
                    <>
                      {isConnecting && (
                        <div className="ml-[7px] mr-[7px]">Connecting…</div>
                      )}
                      {isDisconnected && (
                        <div className="ml-[7px] mr-[7px]">Connect Wallet</div>
                      )}
                      {address && (
                        <div className="ml-[7px] mr-[7px]">
                          {`${address.slice(0, 5)}...${address.slice(-5)}`}
                        </div>
                      )}

                      {address && (
                        <Image
                          src="/icon/copy.svg"
                          width={0}
                          height={0}
                          alt={"logo"}
                          priority={true}
                          className="w-[15px] h-auto"
                        />
                      )}
                    </>
                  ) : null}
                </button>
              </div>
              {siderWidth > 250 ? (
                <button
                  className="w-full inline-flex items-center justify-center text-[#FF5252] font-ttfirs font-thin text-[13px] mt-[30px] mb-[30px] hover:opacity-70"
                  onClick={handleOpenLogout}
                >
                  Logout{" "}
                  <Image
                    className="ml-[10px] w-[14px] h-auto"
                    src="/icon/logout.svg"
                    width={0}
                    height={0}
                    alt={"logo"}
                    priority={true}
                  />
                </button>
              ) : null}
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
                className="w-[120px] h-[45px] bg-[#3772FF] rounded-full text-black text-[14px] font-bold hover:opacity-70"
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
