"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import HomeLoader from "./home/loader";
import NotificationLoader from "./notification/loader";
import CommunityHeaderLoader from "./community/loading";
import CommunitySettingHeader from "./communitySetting";
import CommunityOverviewHeader from "./communityOverview";
import MarketplaceHeaderLoader from "./marketplace/loading";
import FriendLoader from "./friends/loading";
import NFTHeader from "./nft";
const MarketplaceHeader = dynamic(() => import("./marketplace"), {
  ssr: false,
  loading: () => <MarketplaceHeaderLoader />,
});
// const HomeHeader = dynamic(() => import("./home"), {
//   ssr: false,
//   loading: () => <HomeLoader />,
// });
const CommunityHeader = dynamic(() => import("./community"), {
  ssr: false,
  loading: () => <CommunityHeaderLoader />,
});
const NotificationHeader = dynamic(() => import("./notification"), {
  ssr: false,
  loading: () => <NotificationLoader />,
});
const ChatHeader = dynamic(() => import("./chats"));
const FriendsHeader = dynamic(() => import("./friends"), {
  ssr: false,
  loading: () => <FriendLoader />,
});
const Header = () => {
  const pathname = usePathname();

  if (pathname == ("/chats" || "/chats/")) return null;
  if (
    pathname.includes(`/join/`) ||
    pathname == ("/community" || "/community/")
  )
    return;
  return (
    <>
      <div className="w-full py-2 flex-none prevent-select bg-[#111111]">
        {pathname === "/notification" ? (
          <NotificationHeader />
        ) : pathname.includes("/community/") || pathname === "/community" ? (
          <CommunityHeader />
        ) : pathname === "/communitySetting" ? (
          <CommunitySettingHeader />
        ) : pathname === "/communityOverview" ? (
          <CommunityOverviewHeader />
        ) : pathname === "/marketplace" ? (
          <MarketplaceHeader />
        ) : pathname === "/nfts" || pathname.includes("/nfts/") ? (
          <NFTHeader />
        ) : pathname.includes("/chats/") || pathname === "/chats" ? (
          <ChatHeader />
        ) : pathname === "/friends" ? (
          <FriendsHeader />
        ) : null}
      </div>
    </>
  );
};
export default Header;
