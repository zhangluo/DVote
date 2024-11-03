import { 
    createConfig, 
    http, 
    cookieStorage,
    createStorage 
  } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum, base, sepolia, zora } from 'wagmi/chains'
import { abi } from '@/config/contract/abi';
import { tokenAbi } from '@/config/contract/tokenAbi';


interface ABIConfigType {
  address: `0x${string}`;
  abi: readonly any[];
}
const ABIConfig: ABIConfigType = {
  address: '0x94a55B1194aB49Bba27C96E2AB7537603DE9b2a3',
  abi,
};
const ABITokenConfig: ABIConfigType = {
  address: '0x63fb73576ae693dB4df9b0733F5826d71Ae9eEa1',
  abi: tokenAbi,
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
  ABIConfig,
  ABITokenConfig
}