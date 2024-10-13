
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";
import { type ReactNode } from 'react';
import { Providers } from './wagmiProviders';
import { getConfig } from './wagmiConfig';
import { headers } from 'next/headers'
import { cookieToInitialState } from 'wagmi'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "DVote",
  description: "Welcome to the Decentralized Voting System",
};

// import { Provider } from 'react-redux';
// import store from '../store';



export default function Layout({ children }: { children: ReactNode }) {
  const initialState = cookieToInitialState(
    getConfig(),
    headers().get('cookie')
  )
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <Providers initialState={initialState}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
