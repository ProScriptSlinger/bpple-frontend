"use client";
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../../../public/register/check_animation.json";
import { useRouter } from "next/navigation";
import SignUpForm from "../../../components/auth/signUpForm";
import { useFormik } from "formik";
import { signupValidationSchema } from "../../../validations/auth";
import Page1 from "./_conponents/page1";
import Page2 from "./_conponents/page2";
import VerifyOtpPage from "./_conponents/VerifyOtpPage";

import { handleEndpoint } from "../../../utils/api/handleEndpoint";
import { useHandleDisabledButton } from "../../../hooks/useHandleDisabledButton";
import { useUser } from "../../../context/appContext";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Signup = () => {
  const router = useRouter();

  const [page, setPage] = useState(0);
  const handleChangePage = (number) => setPage(number);
  const [avatar, setAvatar] = useState(null);
  const [disable, setDisable] = useState(true);
  const [registering, setRegistering] = useState(false);
  const { setUserDetail, userDetail, getUser } = useUser();
  const [serverErrors, setServerErrors] = useState(null);
  const [disableOtpBtn, setDisableOtpBtn] = useState(true);
  const [otpsent, setOtpsent] = useState(false);
  const [isSendingotp, setisSendingOtp] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);

  const [verificationValue, setVerificationValue] = useState("");
  const [userData, setUserData] = useState(null);

  const {} = useUser();
  const handleVerificationChange = (value) => {
    setVerificationValue(value);
    if (value.length === 5) setDisableOtpBtn(false);
    else setDisableOtpBtn(true);
    console.log("Updated Verification Value:", value);
  };

  const onSubmit = async (values) => {
    try {
      setRegistering(true);
      const response = await handleEndpoint(values, "auth/register", "post");
      if (response) {
        localStorage.setItem("bipple_token", response.token);

        const responseCopy = { ...response };
        delete responseCopy.token;
        setUserData({ ...responseCopy });
        handleChangePage(1);
      }
    } catch (error) {
      console.log("error========>", error.message);
    } finally {
      setRegistering(false);
    }
  };

  const { errors, touched, handleChange, handleBlur, values, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
      },
      validationSchema: signupValidationSchema,
      onSubmit,
    });

  const handleOtpSender = async (email) => {
    console.log("called", userData);

    try {
      if (!userData) return;
      setisSendingOtp(true);
      startTimer();

      const response = await handleEndpoint({ email }, "auth/send-otp", "post");
      if (response) {
        setOtpsent(true);
      }
    } catch (error) {
      console.log("error========>", error.message);
    } finally {
      setisSendingOtp(false);
    }
  };

  useEffect(() => {
    let intervalId;

    if (timerStarted && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timerStarted, timeLeft]);

  const startTimer = () => {
    setTimeLeft(59); // Set initial time to 59 seconds
    setTimerStarted(true);
  };

  // Format the time left into minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const [isLoading, setLoading] = useState(false);

  useHandleDisabledButton(setDisable, values, errors, touched);

  return (
    <div className={`inline-flex absolute w-full h-full bg-[#101010]`}>
      <div className="w-[50%] desktop:flex hidden mt-[220px] justify-center relative">
        <div>
          {page === 0 ? (
            <>
              <div className="text-white text-[35px] font-abeezeeItalic mt-[100px]">
                Create your account, <br />
                Signup Now!
              </div>

              {touched.email && !errors?.email && (
                <div className="text-[#4C4C4C] font-ttfirs mt-[30px] text-[20px]">
                  We have sent the verification OTP
                  <br /> to {values.email}
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
      {page === 0 || page === 1 ? (
        <div className="desktop:w-[45%] w-full">
          <div className="w-full flex justify-center items-center h-full">
            <div className="desktop:w-[65%] w-[90%]">
              {page === 0 ? (
                <SignUpForm
                  handleChangePage={handleChangePage}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  values={values}
                  handleSubmit={handleSubmit}
                  disable={disable}
                  serverErrors={serverErrors}
                  registering={registering}
                  setServerErrors={setServerErrors}
                  userDetail={userDetail}
                  page={page}
                />
              ) : (
                page === 1 && (
                  <>
                    <Page1
                      handleChangePage={handleChangePage}
                      avatar={avatar}
                      setAvatar={setAvatar}
                      handleOtpSender={() => handleOtpSender(userData?.email)}
                      userDetail={userDetail}
                      userData={userData}
                      setUserData={setUserData}
                    />
                  </>
                )
              )}
            </div>
          </div>
        </div>
      ) : null}
      {page === 33 ? (
        <>
          <Page2
            avatar={avatar}
            handleChangePage={handleChangePage}
            onLogin={() => {}}
            userDetail={userDetail}
          />
        </>
      ) : page === 2 ? (
        <>
          <VerifyOtpPage
            setPage={setPage}
            handleOtpSender={() => handleOtpSender(userData?.email)}
            seconds={seconds}
            minutes={minutes}
            isSendingotp={isSendingotp}
            userData={userData}
          />
        </>
      ) : page === 3 ? (
        <></>
      ) : page === 4 ? (
        <>
          <div className="fixed right-0 left-0 top-0 bottom-0 px-[10px] flex justify-center overflow-auto">
            <div className="mobile:w-[40%] w-full">
              <p className="text-center text-[30px] mt-[200px] font-abeezeeItalic">
                Verification Completed, <br />
                Click continue
              </p>

              <p className="text-center text-[15px] mt-[20px] text-[#4C4C4C]">
                We have sent the verification OTP <br /> to
                yazidelkherrati@gmail.com
              </p>
              <div className="w-full flex justify-center">
                <Lottie
                  animationData={animationData}
                  className="flex justify-center items-center w-[300px]"
                  loop={false}
                />
              </div>
              <div className="w-full flex justify-center">
                <button
                  className="w-[300px] flex justify-center items-center h-[40px] bg-[#3772FF] rounded-[12px] text-black font-abeezeeItalic hover:bg-opacity-70 transition-all duration-100"
                  onClick={async () => {
                    setLoading(true);
                    await getUser();
                    router.push("/home");
                  }}
                >
                  {isLoading ? (
                    <AiOutlineLoading3Quarters
                      size={24}
                      className=" animate-spin"
                    />
                  ) : (
                    "Continue"
                  )}
                </button>
              </div>
              <div className="w-full h-[50px]"></div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
export default Signup;
