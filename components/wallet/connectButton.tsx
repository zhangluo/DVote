import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider, useAccount } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, sepolia, zora } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';

//for users without bitget wallet
const projectId = 'my_dvote'

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: projectId,
  chains: [mainnet, polygon, optimism, arbitrum, base, zora, sepolia],
  ssr: false, // If your dApp uses server side rendering (SSR)
});
const queryClient = new QueryClient();

export default function RainbowConnect() {
  const { address, connector, isConnected } = useAccount();
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ConnectButton 
            accountStatus={{
              smallScreen: 'avatar',
              largeScreen: 'full',
            }}
            showBalance={{
              smallScreen: false,
              largeScreen: true,
            }}
          />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};