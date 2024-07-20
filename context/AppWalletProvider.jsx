"use client";

import React, { useMemo } from "react";
import { PrivyProvider } from "@privy-io/react-auth";

export default function AppWalletProvider({ children }) {
  return (
    <PrivyProvider
      appId="clysjap5t00yhrfqdc998wpia"
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: "dark",
          accentColor: "#676FFF",
          logo: "https://bpple.vercel.app/images/logo.svg",
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
