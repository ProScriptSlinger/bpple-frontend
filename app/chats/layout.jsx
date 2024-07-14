import React from "react";
import dynamic from "next/dynamic";
const Footer = dynamic(() =>
  import("../../components/layout/Footer/community/Footer")
);
const Layout = ({ children }) => {
  return (
    <>
      <div className="w-full h-full  bg-[#1E1E1E] flex flex-col">
        {children}
        <Footer />
      </div>
    </>
  );
};
export default Layout;
