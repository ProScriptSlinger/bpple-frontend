"use client";
import React from "react";
import SettingModalProvider from "../../context/communitysetting";
import { SideBarProvider } from "../../context/siderbar";
import { AuthProvider } from "../../context/appContext";
import { PeerConnectionProvider } from "../../context/peerContext";
import WithAuthProvider from "../../app/auth/AuthProvider";
import { SocketIoProvider } from "../../context/socketContext";
import { ShyftProvider } from "@/context/shyftContext";

const Provider = ({ children }) => {
  return (
    <AuthProvider>
      <WithAuthProvider>
        <SocketIoProvider>
          <PeerConnectionProvider>
            <ShyftProvider>
              <SideBarProvider>
                <SettingModalProvider>{children}</SettingModalProvider>
              </SideBarProvider>
            </ShyftProvider>
          </PeerConnectionProvider>
        </SocketIoProvider>
      </WithAuthProvider>
    </AuthProvider>
  );
};

export default Provider;
