"use client";

import { usePathname } from "next/navigation";
import ChatDmFooter from "./_components/ChatDmFooter";
import GroupFooter from "./_components/GroupFooter";
import CommunityInputFooter from "./_components/CommunityInputFooter";

const CommunityFooter = () => {
  const pathname = usePathname();
  if (pathname.includes(`/join/`)) return null;
  return (
    <>
      <ChatDmFooter />
      <GroupFooter />
      <CommunityInputFooter />
    </>
  );
};
export default CommunityFooter;
