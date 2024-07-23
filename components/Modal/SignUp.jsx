import { ImCross } from "react-icons/im";
import Image from "next/image";
import { RangePicker } from "./NewCommunityModal";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { handleEndpoint } from "@/utils/api/handleEndpoint";
import { toast } from "react-toastify";
import { useUser } from "@/context/appContext";
import { useRouter } from "next/navigation";

const SignUp = (props) => {
  const { setModalOpen } = props;
  const { address, getUser } = useUser();
  const [updating, setUpdating] = useState(false);
  const [username, setUsername] = useState("");
  const handleName = (e) => {
    setUsername(e.target.value);
  };
  const router = useRouter();

  const handleCreate = async () => {
    try {
      setUpdating(true);
      const response = await handleEndpoint(
        { address: address, username: username },
        `auth/register-with-address`,
        "post",
        null
      );
      if (response && response.ok) {
        await getUser();
        setModalOpen(false);
        router.push("/home");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div>
      <div className=" z-50 text-[14px] bg-[] w-full font-ttfirs fixed  top-0 right-0 h-screen flex items-center justify-center">
        <div className=" bg-[#22252D]/90  z-0 text-[14px] w-full font-ttfirs fixed  top-0 right-0 h-screen flex items-center justify-center " />
        <div className=" w-full z-2 max-w-[350px] p-4 mx-auto bg-[#171717] backdrop-blur-xl  rounded-3xl ">
          <div className="w-full flex justify-end">
            <button
              onClick={() => {
                setModalOpen(false);
              }}
            >
              <Image
                width={0}
                height={0}
                className="w-[20px]"
                src={"/community/icons/close-modal.svg"}
              />
            </button>
          </div>
          <div className="flex flex-col w-full items-center">
            <Image
              width={0}
              height={0}
              className="w-[50px]"
              src={"/icon/logo.svg"}
              alt="logo"
            />
            <div className="text-[#9D9D9D] text-[20px]">One last step</div>
            <div className="text-[#9D9D9D] text-[15px] w-fit text-center mt-2">
              By signing up, you agree to our terms and privacy policy.
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
            <div className="flex justify-between w-full gap-4 bottom-0 ">
              <button
                className="w-[150px] h-[40px] border-[1px] rounded-[12px] border-[#3772FF] text-[#3772FF] mt-[20px]  flex-none"
                onClick={() => {
                  setModalOpen(false);
                }}
                disabled={updating}
              >
                Cancel
              </button>
              <button
                className="w-[150px] h-[40px] rounded-[12px] bg-[#3772FF] text-white mt-[20px] flex-none"
                onClick={handleCreate}
                disabled={updating}
              >
                {updating ? (
                  <div className="flex justify-center items-center w-full">
                    <AiOutlineLoading3Quarters
                      size={24}
                      className=" animate-spin "
                    />
                  </div>
                ) : (
                  "Done"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
