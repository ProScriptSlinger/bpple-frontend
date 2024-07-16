"use client";
import React, { useState, useEffect } from "react";
import { useSettingModal } from "../../context/communitysetting";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { handleEndpoint } from "../../utils/api/handleEndpoint";
import { useUser } from "../../context/appContext";
import { getNameInitials } from "../../utils/functions/getNameInitials";
import { handleUploadFiles } from "../../utils/functions/handleUploadFiles";
import ImageComponent from "../shared/ImageComponent/demo";
import { SpinBox } from "../home/NewLaunch";
import { white } from "colorette";

export const RangePicker = (props) => {
  const [rangeValue, setRangeValue] = useState(0);
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <div className="relative w-full h-[24px] flex items-center">
        <input
          style={{ accentColor: "white" }}
          id="default-range"
          type="range"
          onChange={(e) => setRangeValue(e.target.value)}
          value={rangeValue}
          className="w-full h-1 bg-[#353945] rounded-[16px] appearance-none cursor-pointer dark:bg-gray-700"
        />
        <div className="absolute top-[8px] w-full flex justify-between">
          <div className="border-l-2 border-white h-[8px]" />
          <div className="border-l-2 border-white h-[8px]" />
          <div className="border-l-2 border-white h-[8px]" />
          <div className="border-l-2 border-white h-[8px]" />
        </div>
      </div>
      <label
        for="default-range"
        class="block mb-2 text-sm font-medium text-white dark:text-white"
      >
        {props.label ? props.label : "10 SOL (480,000 $WIF)"}
      </label>
    </div>
  );
};

const NewCommunityModal = () => {
  const { newCommunityModal, setNewCommunityModal } = useSettingModal();
  const pathName = usePathname();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [disable, setDisable] = useState(true);
  const [page, setPage] = useState(0);
  const { userDetail, getUser, getCommunities } = useUser();
  const [creating, setCreating] = useState(false);
  const router = useRouter();
  const [avatar, setAvatar] = useState(null);

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handlePage = () => {
    setPage(page + 1);
  };

  const handleCreate = async () => {
    if (page < 2) handlePage();
    else
      try {
        setCreating(true);

        const ImageResponse = await handleUploadFiles(avatar, userDetail._id);

        const data = {
          description,
          name,
          owner: userDetail,
          ...(avatar && { avatar: ImageResponse?.downloadURL }),
        };
        const response = await handleEndpoint(data, "community", "post", null);

        if (response.ok) {
          await getUser();
          await getCommunities();
          router.push(`/community/${response._id}`);
          console.log(response);
          setNewCommunityModal(false);
          setAvatar(null);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setCreating(false);
      }
  };

  const handlePreviousPage = () => {
    if (page !== 0) {
      setPage(page - 1);
      setDescription("");
      setName("");
    } else {
      setNewCommunityModal(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (
        !(
          newCommunityModal &&
          (pathName.includes("/community/") || pathName === "/community")
        )
      ) {
        setPage(0);
      }
    }, 1000);
  }, [newCommunityModal]);
  useEffect(() => {
    if (name && description) setDisable(false);
    else setDisable(true);
  }, [name, description]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const IconSpinlCmp = (props) => {
    const { icon } = props;
    return (
      <div className="p-2 flex gap-2 items-center rounded-full bg-[#2A2A2A]">
        <Image
          className="w-[20px] h-auto"
          src={
            icon == "guard" ? "/home/icons/guard.svg" : "/home/icons/fire 1.svg"
          }
          width={0}
          height={0}
          alt=""
        />
        <SpinBox />
      </div>
    );
  };

  const IconDesCmp = (props) => {
    const { icon, des } = props;
    return (
      <div className="p-2 flex items-start gap-2 w-full">
        <Image
          className="w-[15px] mt-2 h-auto"
          src={
            icon == "guard" ? "/home/icons/guard.svg" : "/home/icons/fire 1.svg"
          }
          width={0}
          height={0}
          alt=""
        />
        <p className="text-[#9D9D9D] text-[13px] ">{des}</p>
      </div>
    );
  };

  const LabelValueCmp = (props) => {
    const { label, value } = props;
    return (
      <div className="flex justify-between mx-2">
        <p className="text-[15px] text-[#707070]">{label}</p>
        <p className="text-[15px] text-white">{value}</p>
      </div>
    );
  };

  return (
    <>
      <div
        className={`${
          newCommunityModal &&
          (pathName.includes("/community/") || pathName === "/community")
            ? "w-[400px]"
            : "w-0"
        } flex flex-none h-full bg-[#171717] transition-all duration-500 overflow-hidden modalWidth:static absolute right-0 z-20 prevent-select font-poppins`}
      >
        <div className="w-[400px] h-full relative px-[30px] pb-[50px] flex flex-col">
          <button
            className="w-[340px] inline-flex items-center mt-[30px]"
            onClick={handlePreviousPage}
          >
            <Image
              className="mr-[30px] w-[30px] h-auto"
              src="/icon/back_bgwhite.svg"
              width={0}
              height={0}
              alt=""
            />
            <p className="text-[22px]">Create New Community</p>
          </button>
          <div className="h-fit overflow-auto">
            {page == 0 ? (
              <div className="w-[340px] h-fit overflow-auto">
                <div className="w-full flex justify-center mt-10">
                  <div>
                    <div className="w-[180px] h-[180px] rounded-full flex-1">
                      <label htmlFor="file" className="cursor-pointer">
                        {file ? (
                          <ImageComponent src={preview} />
                        ) : (
                          <div className="flex items-center justify-center gap-[20px] w-full h-full duration-700 opacity-100  bg-[#212121] rounded-full">
                            <Image
                              width="100"
                              height="100"
                              src={
                                avatar
                                  ? URL.createObjectURL(avatar)
                                  : "/community/icons/camera-plus.svg"
                              }
                              alt={avatar}
                            />
                          </div>
                        )}
                      </label>
                      <input
                        id="file"
                        name="file"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          setAvatar(e.target.files[0]);
                          setPreview(URL.createObjectURL(e.target.files[0]));
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 h-fit mt-[45px]">
                  <p className="text-[#7D8E98] text-[15.5px] z-50 ">
                    COMMUNITY
                  </p>
                  <p className="text-red-600">*</p>
                </div>

                <input
                  className="w-full border-b border-[#9D9D9D] bg-transparent pt-2 pb-1.5 text-white outline outline-0 placeholder:font-ttfirs focus:border-[#3772FF] focus:outline-0 placeholder-[#9D9D9D] placeholder:text-[14px]"
                  placeholder="Name is here"
                  onChange={handleName}
                />
                <p className="text-[#9D9D9D] text-[13px] mt-[10px]">
                  The terms and conditions contained in.
                </p>
                <input
                  className="mt-[10px] w-full border-b border-[#9D9D9D] bg-transparent pt-4 pb-1.5 text-white outline outline-0 placeholder:font-ttfirs focus:border-[#3772FF] focus:outline-0 placeholder-[#9D9D9D] placeholder:text-[14px]"
                  placeholder="Description is here"
                  onChange={handleDescription}
                />
                <p className="text-[#9D9D9D] text-[13px] mt-[10px] mb-[20px]">
                  The terms and conditions contained in.
                </p>
                <div className="flex gap-1 h-fit mt-[45px]">
                  <p className="text-[#7D8E98] text-[15.5px] z-50 ">SOCIAL</p>
                </div>

                <input
                  className="w-full border-b border-[#9D9D9D] bg-transparent pt-2 pb-1.5 text-white outline outline-0 placeholder:font-ttfirs focus:border-[#3772FF] focus:outline-0 placeholder-[#9D9D9D] placeholder:text-[14px]"
                  placeholder="X Account"
                  // onChange={handleName}
                />
                <p className="text-[#9D9D9D] text-[13px] mt-[10px]">
                  Enter the project&apos;s X account
                </p>
                <input
                  className="mt-[10px] w-full border-b border-[#9D9D9D] bg-transparent pt-4 pb-1.5 text-white outline outline-0 placeholder:font-ttfirs focus:border-[#3772FF] focus:outline-0 placeholder-[#9D9D9D] placeholder:text-[14px]"
                  placeholder="Telegram Link"
                  // onChange={handleDescription}
                />
                <p className="text-[#9D9D9D] text-[13px] mt-[10px] mb-[10px]">
                  Describe your community Enter the project&apos;s Telegram link
                </p>
              </div>
            ) : page == 1 ? (
              <div className="flex flex-col gap-4 overflow-auto">
                <div className="w-full mt-8 flex justify-center">
                  <Image
                    src="/community/icons/Diamond.svg"
                    width="112"
                    height="112"
                    alt="icon"
                  />
                </div>
                <div className="w-full flex justify-between items-center mt-[40px]">
                  <p className="text-[#7D8E98] text-[15px] ">Token</p>
                  <div className="flex gap-1 items-center">
                    <SpinBox />
                    <Image
                      src="/community/icons/warn_icon.svg"
                      width="20"
                      height="20"
                      alt="icon"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <input
                    className="w-full border-b border-[#9D9D9D] bg-transparent pt-2 pb-1.5 text-white outline outline-0 placeholder:font-ttfirs focus:border-[#3772FF] focus:outline-0 placeholder-[#9D9D9D] placeholder:text-[14px]"
                    placeholder="$NAME"
                    // onChange={handleName}
                  />
                  <p className="text-[#9D9D9D] text-[13px] mt-[10px]">
                    Choose the name of your token
                  </p>
                </div>
                <div className="flex justify-around w-full mt-[30px]">
                  <IconSpinlCmp icon="fire" />
                  <IconSpinlCmp icon="guard" />
                </div>
                <div className="flex flex-col">
                  <IconDesCmp
                    icon="fire"
                    des="Tokens burn if selected market cap not reached"
                  />
                  <IconDesCmp
                    icon="guard"
                    des={
                      <>
                        <>1. No sales until market cap target</>
                        <br />
                        <>2. 2% max buy per person</>
                      </>
                    }
                  />
                </div>
                <div className="mt-4">
                  <div className="relative">
                    <input
                      className="w-full h-[50px] px-4 pr-6 bg-black bg-opacity-30 rounded-full pt-2 pb-1.5 text-white outline outline-0 placeholder:font-ttfirs focus:border-[#3772FF] focus:outline-0 placeholder-[#9D9D9D] placeholder:text-[14px]"
                      placeholder="Choose Duration"
                      // onChange={handleName}
                    ></input>
                    <Image
                      className="w-[15px] mt-2 h-auto absolute right-4 top-2"
                      src={"/community/icons/swap-verticle.svg"}
                      width={0}
                      height={0}
                      alt="swap"
                    />
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <input
                      className="w-full h-[50px] px-4 pr-6 bg-black bg-opacity-30 rounded-full pt-2 pb-1.5 text-white outline outline-0 placeholder:font-ttfirs focus:border-[#3772FF] focus:outline-0 placeholder-[#9D9D9D] placeholder:text-[14px]"
                      placeholder="Set the market cap target"
                      onChange={handleName}
                    ></input>
                    <Image
                      className="w-[15px] mt-2 h-auto absolute right-4 top-2"
                      src={"/community/icons/swap-verticle.svg"}
                      width={0}
                      height={0}
                      alt="swap"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2 overflow-auto">
                <div className="w-full mt-8 flex justify-center">
                  <Image
                    src="/community/icons/Frame 1704.svg"
                    width="112"
                    height="112"
                    alt="icon"
                  />
                </div>
                <p className="text-[#FCFCF9] text-[20px] bold text-center">
                  Choose how many $WIF you want to buy
                </p>
                <div className="mt-4">
                  <div className="relative">
                    <input
                      className="w-full h-[50px] px-4 pr-6 bg-black bg-opacity-30 rounded-lg border-2 border-[#2A2A2A] pt-2 pb-1.5 text-white outline outline-0 placeholder:font-ttfirs focus:border-[#3772FF] focus:outline-0 placeholder-[#9D9D9D] placeholder:text-[14px]"
                      placeholder="Amount"
                      onChange={handleName}
                    ></input>
                    <p className="absolute text-[#FCFCF9] text-[15px] bold text-center right-2 top-4">
                      SOL
                    </p>
                  </div>
                </div>
                <RangePicker />
                <p className="text-[#707070] text-[13px]">
                  Buying your own token is optional but advised to deter bots.
                </p>
                <div className="border-b-2 border-[#353945] w-full  mt-[-5px]" />
                <div className="flex flex-col gap-1">
                  <LabelValueCmp label={"Deployment cost"} value={"0.02 SOL"} />
                  <LabelValueCmp label={"480,000 $WIF"} value={"0.05 SOL"} />
                  <LabelValueCmp label={"You will pay"} value={"0.07 SOL"} />
                </div>
                <div className="w-full mt-2 flex justify-center">
                  <Image
                    src="/community/icons/Warning.svg"
                    width="112"
                    height="112"
                    alt="icon"
                  />
                </div>
                <p className="text-[#9D9D9D] text-[13px] mt-2">
                  The Shield mode is active, limiting purchases to a maximum of
                  2% of the total supply.
                </p>
                <div className="border-b-2 border-[#353945] w-full  my-2" />
              </div>
            )}
            <div className="h-fit flex flex-col items-center">
              <p className="text-[#9D9D9D] text-[13px] mt-4 mb-[10px]">
                By creating a temporary token, you agree to our terms of use and
                acknowledge that we hold no liability.
              </p>
            </div>
            <div className="h-[85px] w-full" />
          </div>
          <div className="h-fit flex flex-col items-center absolute bottom-0 left-0 px-8 w-full bg-[#171717]">
            <button
              className="w-full mt-4 h-[40px] flex-none text-black disabled:bg-[#212121] disabled:text-[#878787] rounded-[10px] bg-[#3772FF] mb-[20px] bottom-0"
              // disabled={disable || creating}
              onClick={handleCreate}
            >
              {page == 2 ? "Create" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default NewCommunityModal;
