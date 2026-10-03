"use client";

import { connectorsForWallets, RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { metaMaskWallet, rainbowWallet, walletConnectWallet } from "@rainbow-me/rainbowkit/wallets";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";
import "@rainbow-me/rainbowkit/styles.css";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "pfc-unconfigured";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [metaMaskWallet, rainbowWallet, walletConnectWallet],
    },
  ],
  { appName: "PFC Console", projectId },
);

const wagmiConfig = createConfig({
  connectors,
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  ssr: true,
});

export function Web3Provider({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();
  return (
    <WagmiProvider config={wagmiConfig}>
      <RainbowKitProvider
        theme={resolvedTheme === "light" ? lightTheme() : darkTheme()}
        modalSize="compact"
      >
        {children}
      </RainbowKitProvider>
    </WagmiProvider>
  );
}
