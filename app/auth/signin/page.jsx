"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ImageComponent from "../../../components/shared/ImageComponent/demo";
import { useFormik } from "formik";
import { signinValidationSchema } from "../../../validations/auth";
import { useHandleDisabledButton } from "../../../hooks/useHandleDisabledButton";
import { useUser } from "../../../context/appContext";
import LoadingPage from "../../../components/loader/LoadingPage";
import { handleEndpoint } from "../../../utils/api/handleEndpoint";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Register = () => {
  const [signupType, setSignupType] = useState("email");
  const [disable, setDisable] = useState(true);
  const [signedin, setSignedin] = useState(false);
  const [isSigning, setIsSignining] = useState(false);
  const router = useRouter();
  const [iconLoading, setIconLoading] = useState(true);
  const { setUserDetail } = useUser();
  const [serverErrors, setServerErrors] = useState(null);

  const onSubmit = async (values) => {
    try {
      setDisable(true);
      setIsSignining(true);
      const response = await handleEndpoint(values, "auth/signin", "post");
      if (response) {
        setSignedin(true);
        localStorage.setItem("bipple_token", response.token);
        const responseCopy = { ...response };
        delete responseCopy.token;
        setUserDetail((prev) => responseCopy._doc);
        router.push("/home");
      }
    } catch (error) {
      setServerErrors(error.message);
    } finally {
      setDisable(false);
      setIsSignining(false);
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
      validationSchema: signinValidationSchema,
      onSubmit,
    });

  useHandleDisabledButton(setDisable, values, errors, touched, signedin);

  useEffect(() => {
    setServerErrors(null);
  }, [values]);

  if (signedin) return <LoadingPage />;

  return (
    <div className={`inline-flex absolute w-full h-full`}>
      <div className="desktop:w-[55%] desktop:block hidden bg-cover bg-center bg-[url('/bg.svg')]"></div>
      <div className="desktop:w-[45%] w-full bg-[#131313] overflow-auto">
        <div className="w-full bg-[#131313]">
          <div className="inline-flex w-full justify-center mt-[70px]">
            {iconLoading && (
              <div
                className={`w-[200px] h-[53px] animate-pulse bg-[#171717] rounded-[12px]`}
              ></div>
            )}
            <Image
              width={0}
              height={0}
              src="/icon/logo_whole.svg"
              alt=""
              className={`w-[200px] h-auto ${iconLoading && "hidden"}`}
              priority={true}
              onLoad={() => {
                setIconLoading(false);
              }}
            />
          </div>
          <div className="text-white font-abeezeeItalic text-center text-[20px] mt-[60px]">
            Welcome, <br />
            Login or Signup.
          </div>
          <div className="w-full flex items-center justify-center mt-[60px]">
            <div className="relative desktop:w-[65%] w-[90%] flex justify-center text-[14px]">
              <button
                className={`py-[9px] w-[50%] transition-all duration-100 hover:bg-opacity-[7%] hover:bg-[#3772FF] ${
                  signupType == "email" ? "bg-[#3772FF]" : ""
                } font-ttfirs bg-opacity-[5%] text-white rounded-full`}
                onClick={() => {
                  setSignupType("email");
                }}
              >
                Email Address
              </button>
              <button
                className={`py-[9px] w-[50%] transition-all duration-100 hover:bg-opacity-[7%] hover:bg-[#3772FF] ${
                  signupType == "email" ? "" : "bg-[#3772FF]"
                } font-ttfirs bg-opacity-[5%] text-white rounded-full`}
                onClick={() => {
                  setSignupType("phone");
                }}
              >
                Phone Number
              </button>
            </div>
          </div>
          <div className="w-full flex flex-wrap justify-center mx-auto">
            <div className="desktop:w-[65%] w-[90%] flex items-center mt-[40px] relative">
              <Image
                src={"/icon/email.svg"}
                alt={"refresh"}
                width={0}
                height={0}
                className="absolute color-white ml-[25px] w-[20px] h-auto"
              />
              <input
                className="w-full bg-[#191919] text-white placeholder-[#4C4C4C] outline-none py-[15px] rounded-[15px] pl-[55px]"
                placeholder={`Type your Email`}
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {touched.email && errors?.email && (
              <span className=" desktop:w-[65%] w-[90%] p-2 text-red-500 text-[12px] flex">
                {errors.email}
              </span>
            )}
            <div className="desktop:w-[65%] w-[90%] flex items-center mt-[40px] relative">
              <Image
                src={"/icon/key.svg"}
                alt={"refresh"}
                width={0}
                height={0}
                className="absolute color-white ml-[25px] w-[20px] h-auto"
              />
              <input
                className="w-full bg-[#191919] text-white placeholder-[#4C4C4C] outline-none py-[15px] rounded-[15px] pl-[55px]"
                placeholder={`Type your Password`}
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {touched.password && errors?.password && (
              <span className=" desktop:w-[65%] w-[90%] p-2 text-red-500 text-[12px] flex">
                {errors.password}
              </span>
            )}
            {serverErrors && (
              <span className=" desktop:w-[65%] w-[90%] p-2 text-red-500 text-[12px] flex">
                {serverErrors}
              </span>
            )}
          </div>
          <div className="w-full flex justify-center mt-[20px]">
            <button
              type="submit"
              className={`desktop:w-[65%] w-[90%] flex items-center justify-center font-abeezeeItalic disabled:bg-[#282828] bg-[#3772FF] disabled:text-[#6D6D6D] text-black mt-[20px] text-[15px] rounded-[15px] font-bold py-[15px] relative transition-all duration-300 hover:bg-opacity-[70%]`}
              disabled={disable}
              onClick={handleSubmit}
            >
              {isSigning ? (
                <AiOutlineLoading3Quarters
                  size={24}
                  className=" animate-spin"
                />
              ) : (
                `Sign in`
              )}
            </button>
          </div>

          <button
            className="w-full inline-flex justify-center mt-[80px] text-[13px] font-ttfirs"
            onClick={() => {
              router.push("/auth/register");
            }}
          >
            <Image
              src={"/icon/back.svg"}
              alt={"refresh"}
              width={20}
              height={20}
              className="mr-[10px] mt-[-1px]"
            />
            Back to <div className="text-[#3772FF] ml-[5px]">Register</div>
          </button>
          <div
            className={`w-full flex justify-center font-ttfirs text-[12px] mt-[80px]`}
          >
            Or continue with
          </div>
          <div className={`w-full flex justify-center font-ttfirs mt-[40px]`}>
            <div className="inline-flex">
              <button
                className="w-[50px] h-[50px] rounded-[12px] bg-[#191919] items-center justify-center flex"
                onClick={() => router.push("/auth/register/wallet")}
              >
                <div className="w-[30px]">
                  <ImageComponent src={"/icon/phantom.svg"} height={30} />
                </div>
              </button>
              <button
                className="w-[50px] h-[50px] rounded-[12px] bg-[#191919] items-center justify-center flex ml-[10px]"
                onClick={() => router.push("/auth/register/wallet")}
              >
                <div className="w-[30px]">
                  <ImageComponent src={"/icon/backpack.svg"} height={30} />
                </div>
              </button>
              <button
                className="w-[50px] h-[50px] rounded-[12px] bg-[#191919] items-center justify-center flex ml-[10px]"
                onClick={() => router.push("/auth/register/wallet")}
              >
                <div className="w-[30px]">
                  <ImageComponent src={"/icon/bitrock.svg"} height={30} />
                </div>
              </button>
              <button
                className="w-[50px] h-[50px] rounded-[12px] bg-[#191919] items-center justify-center flex ml-[10px]"
                onClick={() => router.push("/auth/register/wallet")}
              >
                <div className="w-[30px]">
                  <ImageComponent src={"/icon/metamask.svg"} height={30} />
                </div>
              </button>
            </div>
          </div>
          <div
            className={`w-full flex justify-center font-ttfirs mt-[60px] text-[12px] text-[#565656] text-wrap`}
          >
            By creating your account, you agree in the Biples
          </div>
          <div
            className={`w-full justify-center font-ttfirs text-[12px] inline-flex mb-[50px]`}
          >
            Privacy policy{" "}
            <div className="ml-[5px] mr-[5px] text-[#565656]">and</div> Termes &
            Conditions
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
