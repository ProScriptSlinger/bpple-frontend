"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import formatAddress from "@/lib/formatAddress";
import Header from "@/components/auth/Header";
import Content from "@/components/auth/Content";
import Footer from "@/components/auth/Footer";
import { useSearchParams } from "next/navigation";

const Auth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");
  useEffect(() => {
    console.log("returnUrl query ----->", returnUrl);
  }, [returnUrl]);
  return (
    <div className="overflow-hidden bg-cover bg-no-repeat bg-[url('/images/gradient_bg.svg')] bg-right-bottom min-h-[100vh] p-1 sm:p-[30px] sm:px-[60px] flex items-center justify-center relative">
      <div className="bg-stone-950 rounded-[32px] shadow-inner border border-neutral-500 backdrop-blur-[100px] h-full w-full max-w-[2000px]">
        <Header returnUrl={returnUrl} />
        <Content />
        <Footer />
      </div>
      <Image
        alt="blue light"
        width={0}
        height={0}
        src={"/images/01.png"}
        className="w-[80vw] lg:w-[70vw] h-[900px] absolute top-[40px] left-[200px] lg:left-[100px] opacity-30"
      />
    </div>
  );
};
export default Auth;
