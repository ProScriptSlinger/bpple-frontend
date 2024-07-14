"use client";
import React from "react";
import Footer from "../../components/layout/Footer/communityMarketPlace";
const Layout = ({ children }) => {
  return (
    <>
      <div className="w-full h-full  flex flex-col">
        {children}
        <Footer />
      </div>
    </>
  );
};
export default Layout;
