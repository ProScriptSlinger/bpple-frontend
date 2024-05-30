import Image from "next/image";
import ImageComponent from "../../.././../components/shared/ImageComponent/demo";
import { getNameInitials } from "../../../../utils/functions/getNameInitials";
import { uploadProfileImage } from "../../../../utils/api/uploadProfileImage";
import { useState } from "react";
import { useUser } from "../../../../context/appContext";
import { handleEndpoint } from "../../../../utils/api/handleEndpoint";
import { handleUploadFiles } from "../../../../utils/functions/handleUploadFiles";

const Page1 = ({
  handleChangePage,
  avatar,
  setAvatar,
  userDetail,
  handleOtpSender,
  setUserData,
  userData,
}) => {
  const handleFileChange = (e) => setAvatar(e.target.files[0]);

  const [uploading, setUploading] = useState(false);

  const upload = async () => {
    try {
      setUploading(true);

      const ImageResponse = await handleUploadFiles(avatar, userData._id);

      if (ImageResponse) {
        const newuserDetails = {
          ...userData,
          avatar: ImageResponse?.downloadURL,
        };
        const token = localStorage.getItem("bipple_token");

        const response = await handleEndpoint(
          newuserDetails,
          "user/update-details",
          "patch",
          token
        );
        if (response.ok) {
          setUserData({ ...newuserDetails });
          await handleOtpSender();
          handleChangePage(2);
        }
      }
    } catch (error) {
      console.log("error========>", error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    userData && (
      <div className="fixed right-0 top-0 left-0 bottom-0 prevent-select bg-[#101010] mobile:px-[100px] px-[50px] overflow-auto">
        <div className="w-full h-full">
          <div className="mobile:mt-[100px] mt-[50px] inline-flex w-full justify-between items-center">
            <button onClick={() => handleChangePage(0)}>
              <div className="w-[40px] hover:opacity-80 transition-all duration-100">
                <ImageComponent src="/icon/back_bgwhite.svg" height={40} />
              </div>
            </button>

            <button
              className="inline-flex items-center"
              onClick={async () => {
                handleChangePage(2);
                handleOtpSender();
              }}
            >
              Skip
              <Image
                src="/icon/arrow_right.svg"
                width={0}
                height={0}
                alt=""
                className="w-[20px] h-auto ml-[10px]"
              />
            </button>
          </div>
          <div className="w-full justify-center inline-flex mobile:mt-[150px] mt-[50px]">
            {avatar ? (
              <Image
                src={avatar ? URL.createObjectURL(avatar) : ""}
                className="w-[200px] aspect-square rounded-full object-cover bg-[#191919] flex items-center justify-center "
                width={200}
                height={200}
                alt={userDetail?.username}
              />
            ) : (
              <div
                className="w-[200px] aspect-square rounded-full
             bg-[#191919] flex items-center justify-center
              text-[#4C4C4C] text-[60px]"
              >
                {getNameInitials(userDetail?.username ?? "B")}
              </div>
            )}
          </div>
          <div className="w-full flex justify-center">
            <button className="w-[300px] overflow-hidden relative h-[50px] rounded-[12px] inline-flex items-center justify-center bg-[#131313] mt-[30px] text-[13px] hover:opacity-70 transition-all duration-100">
              <div className="w-[20px] mr-[10px]">
                <ImageComponent src="/icon/upload.svg" height={20} />
              </div>
              Add Profile Picture
              <input
                onChange={handleFileChange}
                type="file"
                accept="image/*"
                className="  border right-0 top-0 h-full absolute opacity-0 w-full  flex"
              />
            </button>
          </div>
          <div className="w-full flex justify-center">
            <button
              className="w-[300px] h-[50px] rounded-[12px] inline-flex items-center justify-center bg-[#1B1B1B] mt-[15px] text-[13px] font-abeezeeItalic hover:opacity-70 transition-all duration-100"
              onClick={upload}
              disabled={uploading}
            >
              {uploading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Page1;
