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
// old = '0x30380246b8e09551665395f9bb31a796d565061d'
const ABIConfig: ABIConfigType = {
  address: '0xB671Ba4A1F7fDd82E183F85eDaBD1ed193264e61',
  abi,
};
const ABITokenConfig: ABIConfigType = {
  address: '0xaD8DDb92f5F6069f6809eb314C9D967B76c8d315',
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