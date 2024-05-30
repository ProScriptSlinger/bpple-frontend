"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useState } from "react";

const SiderBarContext = createContext();

export function useSiderBar() {
  return useContext(SiderBarContext);
}

export function SideBarProvider({ children }) {
  const [sideBarCloseButton, setSideBarCloseButton] = useState(true);
  const [siderWidth, setSiderWidth] = useState(300);
  const pathname = usePathname();
  
  const handleCloseSiderBar = () => {
    if (pathname.includes(`/join/`)) return;
    setSiderWidth(80);
    const sidebar = document.querySelector(".resize-sidebar-current");
    sidebar.style.width = `${80}px`;
    setSideBarCloseButton(false);
  };

  const value = {
    handleCloseSiderBar,
    siderWidth,
    sideBarCloseButton,
  };

  return (
    <SiderBarContext.Provider value={value}>
      {children}
    </SiderBarContext.Provider>
  );
}
