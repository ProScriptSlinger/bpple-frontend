import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useUser } from "../../../../context/appContext";
import { useEffect, useState } from "react";
import { handleEndpoint } from "../../../../utils/api/handleEndpoint";
import VerificationInput from "react-verification-input";
import ImageComponent from "../../../../components/shared/ImageComponent/demo";
import { RiMailSendLine } from "react-icons/ri";
import Image from "next/image";

const VerifyOtpPage = ({
  setPage,
  handleOtpSender,
  isSendingotp,
  seconds,
  userData,
  minutes,
}) => {
  const [serverErrors, setServerErrors] = useState(null);
  const [isVerifingOtp, setIsVerifingOtp] = useState(false);
  const [disableOtpBtn, setDisableOtpBtn] = useState(true);

  const [verificationValue, setVerificationValue] = useState("");

  const handleVerificationChange = (value) => {
    setVerificationValue(value);
    if (value.length === 5) setDisableOtpBtn(false);
    else setDisableOtpBtn(true);
    console.log("Updated Verification Value:", value);
  };
  const handleOtpVerify = async () => {
    setIsVerifingOtp(true);
    try {
      console.log(userData);

      const response = await handleEndpoint(
        { otp: verificationValue, email: userData.email },
        "auth/verify-otp",
        "post"
      );
      if (response.ok) {
        setPage(4);
      }
    } catch (error) {
      console.log("error========>", error.message);
      setServerErrors(error.message);
    } finally {
      setIsVerifingOtp(false);
    }
  };

  return (
    <div className="fixed right-0 left-0 top-0 bottom-0 mobile:px-[100px] px-[20px] flex flex-row mobile:pt-[100px] pt-[40px] overflow-auto">
      <div className="desktop:block hidden desktop:w-[45%] h-full">
        <button
          onClick={() => {
            setPage(1);
          }}
        >
          <Image
            src="/icon/back_bgwhite.svg"
            className="w-[40px] h-auto hover:opacity-70"
            width={0}
            height={0}
            alt=""
          />
        </button>
        <p className="text-[30px] mt-[100px] font-abeezeeItalic">
          Check your email, Verify the OTP Codes
        </p>
        <p className="text-[17px] text-[#4C4C4C] mt-[30px]">
          We have sent the verification OTP to <br />
          {userData?.email}
        </p>
      </div>

      <div className="desktop:w-[65%] w-full">
        <div className="w-full inline-flex justify-center mobile:mt-[140px] mt-[40px]">
          <VerificationInput
            classNames={{
              character:
                "bg-[#191919] rounded-[20px] border-none outline-[1px] flex items-center justify-center outline-[#3772FF] text-white",
              container: "h-[100px] w-[400px]",
            }}
            onChange={handleVerificationChange}
            length={5}
            placeholder=""
          />
        </div>
        <div className="w-full inline-flex justify-center mt-[30px] items-center">
          <div className="w-[15px]">
            <ImageComponent src="/icon/clock.svg" height={15} />
          </div>
          <p className="text-[12px] text-[#4C4C4C] mt-[3px] ml-[5px]">
            Time of Request new OTP {minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </p>
        </div>
        <button
          disabled={isSendingotp || isVerifingOtp}
          className="w-full inline-flex items-center justify-center text-[13px] font-ttfirs"
          onClick={handleOtpSender}
        >
          <RiMailSendLine size={16} className="mr-[10px]" />
          Re send <div className="text-[#3772FF] ml-[5px]">Otp</div>
        </button>
        <div className="w-full flex justify-center mt-[150px] text-white">
          <button
            className="w-[270px] mx-auto h-[40px] rounded-[12px]  flex items-center justify-center disabled:bg-[#282828] bg-[#3772FF] disabled:text-[#6D6D6D] text-white font-abeezeeItalic hover:opacity-70 transition-all duration-100"
            onClick={handleOtpVerify}
            disabled={disableOtpBtn || isSendingotp || isVerifingOtp}
          >
            {isVerifingOtp ? (
              <AiOutlineLoading3Quarters size={24} className=" animate-spin" />
            ) : (
              `Next`
            )}
          </button>
        </div>
        <div>
          <p className="w-full text-center text-[12px] mt-[30px]">
            Don’t received email?{" "}
            <button className="text-[#3772FF]">Click to resend</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
