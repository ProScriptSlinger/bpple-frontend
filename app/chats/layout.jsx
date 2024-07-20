import React from "react";
import dynamic from "next/dynamic";
const Footer = dynamic(() =>
  import("../../components/layout/Footer/community/Footer")
);
const Layout = ({ children }) => {
  return (
    <>
      <div className="w-full h-full  flex flex-col justify-center">
        {children}
        <Footer />
      </div>
    </>
  );
};
export default Layout;
