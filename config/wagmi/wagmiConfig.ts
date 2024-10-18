import { 
    createConfig, 
    http, 
    cookieStorage,
    createStorage 
  } from 'wagmi'
  import { mainnet, polygon, optimism, arbitrum, base, sepolia, zora } from 'wagmi/chains'
  
  export const config = createConfig({
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