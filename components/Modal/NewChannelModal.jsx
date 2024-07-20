"use client";
import React, { useState, useEffect } from "react";
import { useSettingModal } from "../../context/communitysetting";
import { useParams, usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { handleEndpoint } from "../../utils/api/handleEndpoint";
import { useUser } from "../../context/appContext";
import ImageComponent from "../shared/ImageComponent/demo";

const NewChannelModal = () => {
  const { newChannelModal, setNewChannelModal } = useSettingModal();
  const [marketPlaceStatus, setMarketPlaceStatus] = useState(false);
  const [page, setPage] = useState(0);
  const [disable, setDisable] = useState(true);
  const { communityId } = useParams();
  const router = useRouter();
  const { getCommunities } = useUser();
  const [formInput, setFormInput] = useState({
    type: "text",
    description: "",
    name: "",
  });

  const handleMarketPlaceStatus = () => {
    setMarketPlaceStatus(!marketPlaceStatus);
  };

  const pathName = usePathname();

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleCreate = async () => {
    try {
      const response = await handleEndpoint(
        { ...formInput },
        `community/${communityId}/channel/create`,
        "post",
        null
      );
      if (response.ok) {
        await getCommunities();
        router.push(`/community/${communityId}/${formInput.name}`);
        if (formInput.type === "text") setNewChannelModal(false);
        else {
          if (page === 0) setPage(1);
          else {
            setNewChannelModal(false);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (formInput.name && formInput.description) {
      setDisable(false);
    }
  }, [formInput]);

  function formatChannelName(channelName) {
    return channelName.replace(/\s+/g, "-").toLowerCase();
  }
  const [preview, setPreview] = useState("");

  return (
    <>
      <div
        className={`${
          newChannelModal &&
          (pathName.includes("/community/") || pathName === "/community")
            ? "w-[400px]"
            : "w-0"
        } flex flex-none h-full bg-[#1C1C1C] transition-all duration-500 modalWidth:static absolute right-0 z-20 prevent-select`}
      >
        <div className="w-[400px] h-full relative px-[30px] pb-[50px]">
          {page === 0 ? (
            <div className="w-[340px] h-full relative flex flex-col">
              <div className="w-full inline-flex justify-between mt-[50px] items-center">
                <button
                  className="inline-flex items-center"
                  onClick={() => setNewChannelModal(!newChannelModal)}
                >
                  <Image
                    className="w-[30px] h-auto"
                    src="/icon/back_bgwhite.svg"
                    width={0}
                    height={0}
                    alt=""
                  />
                </button>
                <p>Create Community</p>
              </div>
              <div className="w-[340px] h-full overflow-auto">
                <p className="text-[20px] mt-[20px]">Create New Channel</p>
                <p className="text-[12px] text-[#707070] mt-[15px]">
                  The terms and conditions contained in this Agreement shall
                  constitute the entir
                </p>
                <p className="text-[12px] text-[#707070] mt-[25px]">
                  Add Channel’s Name
                </p>
                <input
                  className="w-full border-b border-[#9D9D9D] bg-transparent pt-[10px] pb-1.5 text-white outline outline-0 placeholder:font-ttfirs focus:border-[#3772FF] focus:outline-0 placeholder-[#9D9D9D] placeholder:text-[14px]"
                  placeholder="Name is here"
                  onChange={(e) =>
                    setFormInput((prev) => ({
                      ...prev,
                      name: formatChannelName(e.target.value),
                    }))
                  }
                  value={formInput.name}
                />
                <p className="text-[#707070] text-[13px] mt-[20px]">
                  The terms and conditions contained in.
                </p>
                <div className="w-full grid grid-cols-2 gap-[10px] h-[130px] mt-[20px]">
                  <button
                    onClick={() =>
                      setFormInput((prev) => ({
                        ...prev,
                        type: "text",
                      }))
                    }
                    className={`${
                      formInput.type == "text"
                        ? " border-[#3772FF]"
                        : "border-[#252525] hover:border-[#3772FF]"
                    }  border-[1px]  rounded-[20px] flex justify-center  flex-col w-full items-center`}
                  >
                    <div className="w-full flex justify-center mt-[20px]">
                      <Image
                        src="/icon/text.svg"
                        width={0}
                        height={0}
                        alt=""
                        className="w-[50px] h-auto mb-[10px]"
                      />
                    </div>
                    Text
                  </button>
                  <button
                    className={`${
                      formInput.type == "voice"
                        ? "border-[#3772FF]"
                        : "border-[#252525]"
                    } border-[1px]  rounded-[20px] flex justify-center focus:border-[#3772FF] flex-col w-full items-center`}
                    onClick={() =>
                      setFormInput((prev) => ({
                        ...prev,
                        type: "voice",
                      }))
                    }
                  >
                    <div className="w-full flex justify-center mt-[10px]">
                      <Image
                        src="/icon/record.svg"
                        width={0}
                        height={0}
                        alt=""
                        className="w-[70px] h-auto mb-[15px]"
                      />
                    </div>
                    Voice
                  </button>
                </div>
                <input
                  className="mt-[20px] w-full border-b border-[#9D9D9D] bg-transparent pt-4 pb-1.5 text-white outline outline-0 placeholder:font-ttfirs focus:border-[#3772FF] focus:outline-0 placeholder-[#9D9D9D] placeholder:text-[14px]"
                  placeholder="Description is here"
                  onChange={(e) =>
                    setFormInput((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  value={formInput.description}
                />
                <p className="text-[#707070] text-[13px] mt-[20px]">
                  The terms and conditions contained in.
                </p>
                <button className="inline-flex w-full items-center px-[20px] bg-[#131313] h-[55px] rounded-[12px] justify-between mt-[20px]">
                  <div className="inline-flex items-center">
                    <div>
                      <Image
                        src="/icon/key.svg"
                        width={0}
                        height={0}
                        alt=""
                        className="w-[23px] h-auto"
                      />
                    </div>
                    <p className="text-[14px] ml-[10px]">Private Channel</p>
                  </div>
                  <Image
                    src="/icon/right.svg"
                    width={0}
                    height={0}
                    alt=""
                    className="w-[8px] h-auto"
                  />
                </button>
                <p className="text-[#707070] text-[13px] mt-[20px]">
                  Only people have an access to see this Channel
                </p>
                <div className="inline-flex w-full items-center px-[20px] bg-[#131313] h-[55px] rounded-[12px] justify-between mt-[20px]">
                  <div className="inline-flex items-center">
                    <div>
                      <Image
                        src="/icon/bookmark.svg"
                        width={0}
                        height={0}
                        alt=""
                        className="w-[18px] h-auto"
                      />
                    </div>
                    <p className="text-[14px] ml-[10px]">Marketplace Statue</p>
                  </div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      onClick={handleMarketPlaceStatus}
                    />
                    <div className="relative w-9 h-5 rounded-full ring-[#3772FF] ring-1 peer peer-focus:ring-1 dark:peer-focus:ring-[#3772FF] dark:bg-transparent peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-[#3772FF] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-transparent"></div>
                  </label>
                </div>
                <p className="text-[#707070] text-[13px] mt-[20px]">
                  Add link’s NFTs
                </p>
                <div className="w-full relative">
                  <input
                    className="mt-[10px] w-full border-b border-[#9D9D9D] bg-transparent pt-4 pb-1.5 pr-[30px] text-white outline outline-0 placeholder:font-ttfirs focus:border-[#3772FF] focus:outline-0 placeholder-[#9D9D9D] placeholder:text-[14px]"
                    placeholder="Link is here"
                    onChange={(e) =>
                      setFormInput((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                  <button className="absolute right-[2px] top-[30px]">
                    <Image
                      src="/icon/copy.svg"
                      width={0}
                      height={0}
                      alt=""
                      className="w-[18px] h-auto"
                    />
                  </button>
                </div>
                <div className="inline-flex items-center">
                  <p className="text-[#707070] text-[13px] mt-[20px]">
                    Powored by
                  </p>
                  <div>
                    <Image
                      className="mt-[16px] ml-[5px] w-[60px] h-auto"
                      src="/icon/tensor_whole.svg"
                      width={0}
                      height={0}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <button
                className="w-full h-[40px] rounded-[12px] bg-[#3772FF] text-white mt-[20px] mb-[30px] bottom-0 flex-none"
                onClick={handleCreate}
              >
                Create
              </button>
            </div>
          ) : (
            <div className="w-[340px] h-full relative flex flex-col">
              <div className="w-full">
                <div className="w-full mt-[50px]">
                  <button
                    onClick={() => {
                      setPage(0);
                    }}
                  >
                    <Image
                      src="/icon/back_bgwhite.svg"
                      width={0}
                      height={0}
                      alt=""
                      className="w-[30px] h-auto"
                    />
                  </button>
                </div>
                <div className="mt-[50px] text-[20px]">
                  Create New Community
                </div>
              </div>
              <div className="w-full h-full overflow-auto">
                <p className="text-[12px] text-[#707070] mt-[15px]">
                  The terms and conditions contained in this Agreement shall
                  constitute the entir
                </p>
                <p className="text-[#9D9D9D] text-[12px] mt-[70px]">
                  Add Voice Name
                </p>
                <input
                  className="w-full border-b border-[#9D9D9D] bg-transparent pt-2 pb-1.5 text-white outline outline-0 placeholder:font-ttfirs focus:border-[#3772FF] focus:outline-0 placeholder-[#9D9D9D] placeholder:text-[14px]"
                  placeholder="Name is here"
                  onChange={handleName}
                />
                <p className="text-[#707070] text-[13px] mt-[20px]">
                  The terms and conditions contained in.
                </p>
                <p className="text-[#9D9D9D] text-[12px] mt-[50px]">
                  Add Date here
                </p>
                <input
                  className="w-full border-b border-[#9D9D9D] bg-transparent pt-2 pb-1.5 text-white outline outline-0 placeholder:font-ttfirs focus:border-[#3772FF] focus:outline-0 placeholder-[#9D9D9D] placeholder:text-[14px]"
                  placeholder="Description is here"
                  onChange={handleDescription}
                />
                <p className="text-[#707070] text-[13px] mt-[20px]">
                  The terms and conditions contained in.
                </p>
              </div>
              <button
                className="w-full h-[40px] rounded-[12px] bg-[#3772FF] text-white mt-[20px] mb-[30px] disabled:bg-[#212121] disabled:text-[#878787] bottom-0 flex-none"
                onClick={handleCreate}
                disabled={disable}
              >
                Create
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default NewChannelModal;
