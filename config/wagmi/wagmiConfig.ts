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
  address: '0x2b539555912ff9f025a16279984ca01eb2a863e0',
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