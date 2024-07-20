"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSettingModal } from "../../context/communitysetting";
import { useUser } from "../../context/appContext";
import { handleEndpoint } from "../../utils/api/handleEndpoint";
import { handleUploadFiles } from "../../utils/functions/handleUploadFiles";

import Image from "next/image";

const NewRoomModal = () => {
  const pathName = usePathname();
  const { newGroupModal, setNewGroupModal } = useSettingModal();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [enable, setEnable] = useState(false);
  const { userDetail, getUser } = useUser();
  const [avatar, setAvatar] = useState(null);
  const [creating, setCreating] = useState(false);
  const [group, setGroup] = useState({
    name: "",
    description: "",
  });

  const router = useRouter();

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleCreate = async () => {
    try {
      if (!group.name && !group.description) return;
      setCreating(true);
      const ImageResponse = await handleUploadFiles(avatar, userDetail._id);

      const response = await handleEndpoint(
        {
          ...group,
          owner: userDetail,
          ...(avatar && { avatar: ImageResponse?.downloadURL }),
        },
        `groups`,
        "post",
        null
      );
      if (response.ok) {
        setNewGroupModal(!newGroupModal);
        await getUser();
        router.push(`/chats/groups/${response._id}`);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setCreating(false);
    }
  };
  return (
    <>
      <div
        className={`${
          newGroupModal &&
          (pathName.includes("/chats/") || pathName === "/chats")
            ? "w-[400px]"
            : "w-0"
        } flex flex-none h-full bg-[#171717] transition-all duration-500 right-0 z-20 prevent-select`}
      >
        <div className="w-[400px] h-full relative overflow-auto px-[30px] pb-[50px]">
          <div className="w-[340px] flex flex-col h-full">
            <div className="w-full">
              <button
                className="inline-flex items-center mt-[60px]"
                onClick={() => setNewGroupModal(!newGroupModal)}
              >
                <Image
                  className="mr-[30px] w-[30px] h-auto"
                  src="/icon/back_bgwhite.svg"
                  width={0}
                  height={0}
                  alt=""
                />
              </button>

              <p className="mt-[50px] text-[20px]">Create New Group</p>
              <p className="mt-[15px] text-[12px] text-[#707070]">
                The terms and conditions contained in this Agreement shall
                constitute the entir
              </p>
            </div>
            <div className="w-full h-full overflow-auto">
              <div className="w-full flex justify-center mt-[40px]">
                <div className="w-[150px] relative overflow-hidden aspect-square rounded-full bg-[#222222] flex items-center justify-center">
                  <img
                    src={
                      avatar
                        ? URL.createObjectURL(avatar)
                        : "/icon/camera_outline.svg"
                    }
                    alt={avatar?.name}
                    width={150}
                    height={150}
                    className={`${
                      avatar
                        ? " w-[150px] h-[150px] object-cover"
                        : "w-[40px]   h-auto"
                    } duration-1000`}
                    // priority
                  />
                  <input
                    onChange={(e) => setAvatar(e.target.files[0])}
                    type="file"
                    accept="image/*"
                    className="right-0 top-0 h-full absolute opacity-0 w-full flex"
                  />
                </div>
              </div>
              <p className="text-[#9D9D9D] text-[12px] mt-[50px]">
                Add name of Group
              </p>
              <input
                className="w-full border-b border-[#9D9D9D] bg-transparent pt-2 pb-1.5 text-white outline outline-0 placeholder:font-ttfirs focus:border-[#3772FF] focus:outline-0 placeholder-[#9D9D9D] placeholder:text-[14px]"
                placeholder="Name is here"
                onChange={(event) =>
                  setGroup((prev) => ({
                    ...prev,
                    name: event.target.value,
                  }))
                }
                value={group.name}
              />
              <p className="text-[#707070] text-[13px] mt-[20px]">
                The terms and conditions contained in.
              </p>
              <input
                className="mt-[20px] w-full border-b border-[#9D9D9D] bg-transparent pt-4 pb-1.5 text-white outline outline-0 placeholder:font-ttfirs focus:border-[#3772FF] focus:outline-0 placeholder-[#9D9D9D] placeholder:text-[14px]"
                placeholder="Description is here"
                onChange={(event) =>
                  setGroup((prev) => ({
                    ...prev,
                    description: event.target.value,
                  }))
                }
                value={description.name}
              />
              <p className="text-[#707070] text-[13px] mt-[20px]">
                The terms and conditions contained in.
              </p>
            </div>
            <button
              className="w-full h-[40px] disabled:bg-[#282828] disabled:text-[#6D6D6D] rounded-[12px] bg-[#3772FF] text-white mt-[20px] bottom-0 flex-none"
              onClick={handleCreate}
              disabled={creating}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default NewRoomModal;
