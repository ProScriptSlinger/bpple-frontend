"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "../../context/appContext";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { handleEndpoint } from "../../utils/api/handleEndpoint";
import Link from "next/link";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const pathname = usePathname();
    const { isConnected, getUserByAddress, address, userDetail, disconnect } =
      useUser();
    const [newModal, setModal] = useState(false);
    const { wallets, ready } = useWallets();
    const wallet = wallets[0];
    useLayoutEffect(() => {
      if (pathname.includes("/home") && wallet?.address && !userDetail) {
        setModal(true);
      } else {
        setModal(false);
      }

      if (wallet?.address) {
        if (pathname.includes("/auth")) {
          // router.push("/home");
        }
      } else {
        if (!pathname.includes("/auth")) {
          // router.push("/auth");
          router.push(`/auth?returnUrl=${encodeURIComponent(pathname)}`);
          console.log('!pathname.includes("/auth"', wallet?.address, pathname);
        }
      }

      if (!ready && !address) {
        if (!pathname.includes("/auth")) {
          router.push(`/auth?returnUrl=${encodeURIComponent(pathname)}`);
          console.log("ready && !wallet", ready, wallet);
        }
      }
    }, [wallet, router, pathname]);

    return (
      <>
        <WrappedComponent {...props} />
        {(isConnected || (isConnected && address && !userDetail)) && (
          <Modal
            newModal={newModal}
            setModal={setModal}
            address={address}
            getUserByAddress={getUserByAddress}
            router={router}
            disconnect={disconnect}
          />
        )}
      </>
    );
  };

  return Wrapper;
};

export default withAuth;

const Modal = ({ newModal, setModal, address, router }) => {
  const [username, setUsername] = useState("");
  const [updating, setUpdating] = useState(false);
  const { getUser, setUserDetail } = useUser();
  const handleName = (e) => {
    setUsername(e.target.value);
  };

  const handleCreate = async () => {
    try {
      setUpdating(true);
      const response = await handleEndpoint(
        { address, username },
        `auth/register-with-address`,
        "post",
        null
      );
      if (response.ok) {
        await getUser();
        setModal(false);
        router.push("/home");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = async () => {
    setUserDetail(null);
    // router.push("/auth");
    disconnect();
    setLogout(false);
    setModal(false);
    localStorage.clear();
  };

  return (
    <>
      {newModal && (
        <div className=" flex items-center justify-center fixed top-0 right-0 w-full h-screen bg-[#171717]/50 z-20" />
      )}

      <div
        className={`${
          newModal ? "max-w-[400px] w-full z-30 fixed  right-0" : "w-0"
        } flex flex-none h-full bg-[#171717] transition-all duration-500 right-0 z-20 prevent-select`}
      >
        <div className="w-[400px] h-full relative overflow-auto px-[30px] pb-[50px]">
          <div className="w-[340px] flex flex-col h-full">
            <div className="w-full">
              <p className="mt-[50px] text-[20px]">Update Profile</p>
              <p className="mt-[15px] text-[12px] text-[#707070]">
                The terms and conditions contained in this Agreement shall
                constitute the entir
              </p>
            </div>
            <div className="w-full h-full overflow-auto">
              <p className="text-[#9D9D9D] text-[12px] mt-[50px]">
                Add a username
              </p>
              <input
                className="w-full border-b border-[#9D9D9D] bg-transparent
                 pt-2 pb-1.5 text-white outline outline-0 placeholder:font-ttfirs 
                 focus:border-[#3772FF] focus:outline-0 placeholder-[#9D9D9D] placeholder:text-[14px]"
                placeholder="Name is here"
                onChange={handleName}
                value={username}
              />
              <p className="text-[#707070] text-[13px] mt-[20px]">
                The terms and conditions contained in.
              </p>
            </div>
            <div className=" grid w-full gap-4 bottom-0 ">
              <button
                className="w-full h-[40px] rounded-[12px] bg-[#3772FF] text-white mt-[20px] flex-none"
                onClick={handleCreate}
                disabled={updating}
              >
                {updating ? (
                  <AiOutlineLoading3Quarters
                    size={24}
                    className=" animate-spin "
                  />
                ) : (
                  "Done"
                )}
              </button>
              <Link href={"/auth"}>
                <button
                  className="w-full h-[40px] rounded-[12px] border-[#3772FF] text-[#3772FF] mt-[20px]  flex-none"
                  onClick={handleLogout}
                  disabled={updating}
                >
                  Logout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// "use client";
// import React, { useLayoutEffect } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import LoadingPage from "../../components/loader/LoadingPage";
// import { useUser } from "../../context/appContext";

// const { address, isConnecting, isDisconnected } = useAccount();

// const withAuth = (WrappedComponent) => {
//   const Wrapper = (props) => {
//     const router = useRouter();
//     const pathname = usePathname();
//     const { pending, userDetail } = useUser();

//     useLayoutEffect(() => {
//       if (!pending && !userDetail && !pathname.includes("/auth"))
//         router.push("/auth");
//       if (
//         !pending &&
//         pathname == "/auth" &&
//         userDetail &&
//         userDetail.email_verified
//       )
//         router.push("/home");
//       if (
//         !pending &&
//         pathname == "/auth" &&
//         userDetail &&
//         !userDetail?.email_verified
//       )
//         router.push("/auth/signin");
//     }, [pending, userDetail, router]);

//     return (
//       (userDetail || pathname.includes("/auth")) && (
//         <WrappedComponent {...props} />
//       )
//     );
//   };

//   return Wrapper;
// };

// export default withAuth;
