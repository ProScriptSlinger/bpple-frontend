import { Inter } from "next/font/google";
import Provider from "../components/provider";
import dynamic from "next/dynamic";
import FooterLoader from "../components/layout/Footer/loader";
import CommunityListLoader from "../components/layout/CommunityList/loader";
import CommunityRoomsLoader from "../components/layout/CommunityRooms/loader";
import SiderLoader from "../components/layout/Sider/loading";
import Web3ModalProvider from "../context/Web3ModalProvider";
import { headers } from "next/headers";
import NextTopLoader from "nextjs-toploader";
import { cookieToInitialState } from "wagmi";
import { config } from "../context/config";
// Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { shyftProvider } from "@/context/shyftContext";

export const metadata = {
  title: "Bipple",
  description: "Bipple chat",
};

import "./globals.css";
const Sider = dynamic(() => import("../components/layout/Sider"), {
  ssr: false,
  loading: () => <SiderLoader />,
});
const Header = dynamic(() => import("../components/layout/Header"));
const Footer = dynamic(() => import("../components/layout/Footer"), {
  ssr: false,
  loading: () => <FooterLoader />,
});
const CommunityList = dynamic(
  () => import("../components/layout/CommunityList"),
  {
    ssr: false,
    loading: () => <CommunityListLoader />,
  }
);
const CommunityRooms = dynamic(
  () => import("../components/layout/CommunityRooms"),
  {
    ssr: false,
    loading: () => <CommunityRoomsLoader />,
  }
);

const CommunityProfileModal = dynamic(() =>
  import("../components/Modal/CommunityProfileModal")
);
const CommunityUserModal = dynamic(() =>
  import("../components/Modal/CommunityUserModal")
);
const FriendProfileModal = dynamic(() =>
  import("../components/Modal/FriendProfileModal")
);
const UserSearchModal = dynamic(() =>
  import("../components/Modal/UserSearchModal")
);
const NewCommunityModal = dynamic(() =>
  import("../components/Modal/NewCommunityModal")
);
const NewChannelModal = dynamic(() =>
  import("../components/Modal/NewChannelModal")
);
const NewRoomModal = dynamic(() => import("../components/Modal/NewRoomModal"));
const NftBuyModal = dynamic(() => import("../components/Modal/NftBuyModal"));
const NftBuyConfirmModal = dynamic(() =>
  import("../components/Modal/NftBuyConfirmModal")
);
const CallActionModal = dynamic(() =>
  import("../components/Modal/CallActionModal")
);
const NewGroupModal = dynamic(() =>
  import("../components/Modal/NewGroupModal")
);
const NftListModal = dynamic(() => import("@/components/Modal/NftListModal"));
const NftUnListModal = dynamic(() =>
  import("@/components/Modal/NftUnListModal")
);

const RecordingModal = dynamic(() =>
  import("@/components/Modal/RecordingModal")
);

export default function RootLayout({ children }) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html lang="en">
      <body className="font-ttfirs bg-cover bg-center bg-[url('/community/bg.svg')] -z-10 bg-[#121212] fixed left-0 right-0 top-0 bottom-0 flex flex-row">
        <Web3ModalProvider initialState={initialState}>
          <Provider>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <Sider />
            <CommunityList />
            <div className="flex-col flex w-full h-full">
              <NextTopLoader color="#50FFFF" />
              <Header />
              {children}
              <Footer />
            </div>
            <CommunityProfileModal />
            <CommunityUserModal />
            <FriendProfileModal />
            <UserSearchModal />
            <NewCommunityModal />
            <NewChannelModal />
            <NewRoomModal />
            <NftBuyModal />
            <NftBuyConfirmModal />
            <CallActionModal />
            <NewGroupModal />
            <NftListModal />
            <NftUnListModal />
            <RecordingModal />
          </Provider>
        </Web3ModalProvider>
      </body>
    </html>
  );
}
