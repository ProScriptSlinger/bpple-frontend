import { ImCross } from "react-icons/im";
import Image from "next/image";
import { RangePicker } from "./NewCommunityModal";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { handleEndpoint } from "@/utils/api/handleEndpoint";
import { toast } from "react-toastify";
import { useUser } from "@/context/appContext";
import { useRouter } from "next/navigation";
import { TfiNewWindow } from "react-icons/tfi";
import { LuFileCheck } from "react-icons/lu";

const SignUp = (props) => {
  const { setModalOpen, modalOpen } = props;
  const { address, getUser } = useUser();
  const [updating, setUpdating] = useState(false);
  const [username, setUsername] = useState("");
  const handleName = (e) => {
    setUsername(e.target.value);
  };
  const router = useRouter();

  const handleCreate = async () => {
    if (username == "") toast.warning("Please input user name.");
    else
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
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    let timer;
    if (setModalOpen)
      timer = setTimeout(() => {
        setOpen(true);
      }, 1500);
    else clearTimeout(timer); // Clear the timer if conditions change
  }, [modalOpen]);

  return (
    <div>
      <div className=" z-50 text-[14px] bg-[] w-full font-ttfirs fixed  top-0 right-0 h-screen flex items-center justify-center">
        <div className=" bg-[#22252D]/90  z-0 text-[14px] w-full font-ttfirs fixed  top-0 right-0 h-screen flex items-center justify-center " />
        <div
          className={`transition-all ${
            isOpen ? "opacity-100" : "opacity-0"
          } w-full z-2 max-w-[350px]  p-4 mx-auto bg-[#171717] backdrop-blur-xl  rounded-3xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.4)] `}
        >
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
            <LuFileCheck color="#3772FF" className="w-[50px] h-[50px]" />
            <div className="text-[#9D9D9D] text-[20px] mt-4">One last step</div>
            <div className="text-[#9D9D9D] text-[15px] w-fit text-center mt-2">
              By signing up, you agree to our terms and privacy policy.
            </div>
            <div className="w-full h-full overflow-auto">
              <p className="text-[#9D9D9D] text-[12px] mt-[30px]">
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
            </div>
            <div className="relative w-full mt-4 cursor-pointer">
              <div
                className="flex items-center w-full h-[50px] px-4 pr-6 border-[1px] border-[#9d9d9db4]  hover:bg-black/40 bg-opacity-30 rounded-2xl pt-2 pb-1.5 text-[#9D9D9D] outline outline-0 placeholder:font-ttfirs focus:border-[#3772FF] focus:outline-0 placeholder-[#9D9D9D] placeholder:text-[14px]"

                // onChange={handleName}
              >
                View Terms
              </div>
              <TfiNewWindow
                color="#9D9D9D"
                className="w-[20px] mt-[5px] h-auto absolute right-4 top-2 text-[#9D9D9D]"
              />
            </div>
            <div className="relative w-full mt-4 cursor-pointer">
              <div
                className="flex items-center w-full h-[50px] px-4 pr-6 border-[1px] text-[#9D9D9D] border-[#9d9d9db4]  hover:bg-black/40 bg-opacity-30 rounded-2xl pt-2 pb-1.5 outline outline-0 placeholder:font-ttfirs focus:border-[#3772FF] focus:outline-0 placeholder-[#9D9D9D] placeholder:text-[14px]"
                // onChange={handleName}
              >
                View Privacy Policy
              </div>
              <TfiNewWindow
                color="#9D9D9D"
                className="w-[20px] mt-[5px] h-auto absolute right-4 top-2"
              />
            </div>
            <div className="flex justify-between w-full gap-4 bottom-0 ">
              <button
                className="w-[150px] h-[40px] border-[1px] rounded-[12px] border-[#3772FF] hover:bg-black/40 text-[#3772FF] mt-[20px]  flex-none"
                onClick={() => {
                  setModalOpen(false);
                }}
                disabled={updating}
              >
                No thanks
              </button>
              <button
                className="w-[150px] h-[40px] rounded-[12px] bg-[#3772FF] hover:bg-[#3864cc] text-white mt-[20px] flex-none"
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
                  "Accept"
                )}
              </button>
            </div>
            <div className="flex gap-2 items-center mt-4">
              <Image
                width={0}
                height={0}
                className="w-[15px]"
                src={"/icon/logo_gray.svg"}
              />
              <p className="text-[#9D9D9D] text-[15px]">Protected by Bipple</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
