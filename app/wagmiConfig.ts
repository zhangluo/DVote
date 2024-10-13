import { 
    createConfig, 
    http, 
    cookieStorage,
    createStorage 
  } from 'wagmi'
  import { mainnet, polygon, optimism, arbitrum, base, sepolia, zora } from 'wagmi/chains'
  
  export function getConfig() {
    return createConfig({
      chains: [mainnet, polygon, optimism, arbitrum, base, sepolia, zora ],
      ssr: true,
      storage: createStorage({
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
  }