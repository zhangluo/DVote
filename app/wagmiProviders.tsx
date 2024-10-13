'use client'

import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'
import { type State, WagmiProvider } from 'wagmi'
import HeadNav from "@/components/HeadNav/HeadNav";

import { usePathname } from 'next/navigation'; // 使用新的 navigation 包
import { getConfig } from './wagmiConfig';

type Props = {
  children: ReactNode,   
  initialState: State | undefined,
}

export function Providers({ children, initialState }: Props) {
  const [config] = useState(() => getConfig())
  const [queryClient] = useState(() => new QueryClient())
  const pathname = usePathname();
  return (

    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider coolMode>
            <HeadNav />
            <div className={pathname == '/login'? '' : 'container'}>
            {children}
            </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}