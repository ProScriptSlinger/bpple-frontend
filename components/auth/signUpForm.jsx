"use client";
import Image from "next/image";
import PhoneNumber from "./phoneNumber";
import { useRouter } from "next/navigation";

import ImageComponent from "../shared/ImageComponent/demo";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useEffect } from "react";

const SignUpForm = ({
  touched,
  handleChange,
  handleBlur,
  values,
  handleSubmit,
  disable,
  errors,
  serverErrors,
  setServerErrors,
  registering,
  userDetail,
  page,
  handleChangePage
}) => {
  const router = useRouter();

  useEffect(() => {
    setServerErrors(null);
  }, [values]);
  useEffect( () => {
    if (userDetail) {
      handleChangePage(1)
    }
  }, [userDetail, page])
  return (
    <>
      <div className="flex items-center relative">
        <div className="w-[20px] absolute color-white ml-[25px]">
          <ImageComponent src={"/icon/person_borderwhite.svg"} height={20} />
        </div>
        <input
          className="w-full bg-[#191919] text-[14px] text-white placeholder:font-ttfirs placeholder-[#4C4C4C] outline-none py-[15px] rounded-[15px] pl-[55px]"
          type="text"
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={`Type your full name`}
        />
      </div>
      {touched.username && errors?.username && (
        <span className=" p-2 text-red-500 text-[12px] flex">
          {errors.username}
        </span>
      )}

      <div className="flex items-center relative mt-[20px]">
        <div className="w-[20px] absolute color-white ml-[25px]">
          <ImageComponent src={"/icon/email.svg"} height={20} />
        </div>
        <input
          className="w-full bg-[#191919] text-[14px] text-white placeholder:font-ttfirs placeholder-[#4C4C4C] outline-none py-[15px] rounded-[15px] pl-[55px]"
          placeholder={`Type your email`}
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      {touched.email && errors?.email && (
        <span className=" p-2 text-red-500 text-[12px] flex">
          {errors.email}
        </span>
      )}
      <PhoneNumber
        value={values.phoneNumber}
        touched={touched}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched.phoneNumber && errors?.phoneNumber && (
        <span className=" p-2 text-red-500 text-[12px] flex">
          {errors.phoneNumber}
        </span>
      )}

      <div className="flex items-center mt-[20px] relative">
        <div className="w-[15px] absolute ml-[29px]">
          <ImageComponent src={"/icon/lock.svg"} height={15} />
        </div>
        <input
          className="w-full bg-[#191919] text-white text-[14px] placeholder-[#4C4C4C] outline-none py-[15px] rounded-[15px] pl-[55px] pr-[55px]"
          placeholder={`Type your password`}
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className="absolute right-[25px] w-[15px]">
          <ImageComponent src={"/icon/eye.svg"} height={15} />
        </div>
      </div>
      {touched.password && errors?.password && (
        <span className=" p-2 text-red-500 text-[12px] flex">
          {errors.password}
        </span>
      )}
      {serverErrors && (
        <span className=" desktop:w-[65%] w-[90%] p-2 text-red-500 text-[12px] flex">
          {serverErrors}
        </span>
      )}
      <button
        disabled={disable}
        className={`w-full mx-auto  flex items-center justify-center font-abeezeeItalic disabled:bg-[#282828] bg-[#50FFFF] disabled:text-[#6D6D6D] text-black mt-[20px] text-[15px] rounded-[15px] font-bold py-[15px] relative transition-all duration-300 hover:bg-opacity-[70%]`}
        onClick={handleSubmit}
      >
        {registering ? (
          <AiOutlineLoading3Quarters size={24} className=" animate-spin" />
        ) : (
          `Create account`
        )}
      </button>
      <button
        className="w-full inline-flex justify-center mt-[80px] text-[13px] font-ttfirs"
        onClick={() => {
          router.push("/auth/signin");
        }}
      >
        <Image
          src={"/icon/back.svg"}
          alt={"refresh"}
          width={20}
          height={20}
          className="mr-[10px] mt-[-1px]"
        />
        Back to <div className="text-[#53FAFB] ml-[5px]">Sign In</div>
      </button>
    </>
  );
};
export default SignUpForm;
