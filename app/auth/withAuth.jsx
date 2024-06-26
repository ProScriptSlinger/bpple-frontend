"use client";
import React, { useLayoutEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "../../context/appContext";

import { handleEndpoint } from "../../utils/api/handleEndpoint";
import Link from "next/link";

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const pathname = usePathname();
    const {
      pending,
      isDisconnected,
      userDetail,
      getUserByAddress,
      address,
      isConnected,
    } = useUser();
    const [newModal, setModal] = useState(false);

    useLayoutEffect(() => {
      console.log("user detail ------>", userDetail);
      if (!pending) {
        if (address && !userDetail) {
          setModal(true);
        } else {
          setModal(false);
        }

        if ((address && isConnected) || userDetail?.email) {
          if (pathname.includes("/auth")) {
            router.push("/home");
          }
        } else {
          if (!pathname.includes("/auth")) {
            router.push("/auth");
          }
        }

        if (isDisconnected && !userDetail?.email) {
          if (!pathname.includes("/auth")) {
            router.push("/auth");
          }
        }
      }
    }, [
      pending,
      address,
      userDetail,
      router,
      isConnected,
      isDisconnected,
      pathname,
    ]);

    return (
      <>
        <WrappedComponent {...props} />
        {((!pending && isConnected) ||
          (isConnected && address && !pending && !userDetail)) && (
          <Modal
            newModal={newModal}
            setModal={setModal}
            address={address}
            getUserByAddress={getUserByAddress}
            router={router}
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
      console.log(error);
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = async () => {
    setUserDetail(null);
    // router.push("/auth");
    setLogout(false);
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
                 focus:border-[#53FAFB] focus:outline-0 placeholder-[#9D9D9D] placeholder:text-[14px]"
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
                className="w-full h-[40px] rounded-[12px] bg-[#53FAFB] text-black mt-[20px] flex-none"
                onClick={handleCreate}
                disabled={updating}
              >
                Done
              </button>
              <Link href={"/auth"}>
                <button
                  className="w-full h-[40px] rounded-[12px] border-[#53FAFB] text-[#53FAFB] mt-[20px]  flex-none"
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
