import { 
    createConfig, 
    http, 
    cookieStorage,
    createStorage 
  } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum, base, sepolia, zora } from 'wagmi/chains'
import { abi } from '@/config/contract/abi';


interface ABIConfigType {
  address: `0x${string}`;
  abi: readonly any[];
}

const ABIConfig: ABIConfigType = {
  address: '0x30380246b8e09551665395f9bb31a796d565061d',
  abi,
};

const config = createConfig({
  chains: [mainnet, sepolia, polygon, optimism, arbitrum, base, zora ],
  ssr: false,
  storage: createStorage({
    key: 'DVote',
    storage: cookieStorage,
  }),
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [optimism.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
    [zora.id]: http(),
  },
})
export {
  config,
  ABIConfig
}