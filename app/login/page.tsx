// AuthPage.tsx
"use client";

import React,{useEffect}from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation'; // 使用新的 navigation 包
import { setConnectionStatus } from '@/config/wagmi/wagmiCookies';
import { useSignMessage } from 'wagmi'

const AuthPage = React.memo(() => {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const account = useAccount();
  const { signMessage, isSuccess, isError, data, error } = useSignMessage();
  // useEffect( () =>{
  //   // 如果没有钱包，直接返回
  //   if(!account) return;
  //   (async()=>{
  //     // const token =localStorage.getItem("token")
  //     // if(token) return;
  //     const signature = await signMessage(getConfig(), { message: 'hello world' })
  //     console.log(signature)
  //   })();
  // },[account]);
  

  useEffect(()=> {
    if (isConnected) {
      setConnectionStatus('connected');
      (async()=>{
        // const token =localStorage.getItem("token")
        // if(token) return;
        const signature= await signMessage({
          message: `hello world ${address}`,
         })
        //  localStorage.setItem('signature', signature)
        console.log('signature', signature)
      })();
      // router.push('/');
    }
  }, [isConnected, address]);

  useEffect(() => {
    if (isSuccess && data) {
      console.log('Signature successful:', data);
      router.push('/');
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      console.error('Signature failed:', error);
    }
  }, [isError, error]);

  return (
    <>
      <div style={styles.pageBackground}>
        <div style={styles.container}>
          <h1 style={styles.title}>Welcome to DVote System</h1>
          {/* <p style={styles.subtitle}>Secure and stylish login experience.</p> */}
          <ConnectButton />
        </div>
      </div>
    </>
  );
});

const styles: { [key: string]: React.CSSProperties } = {
  pageBackground: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    backgroundSize: "200% 200%",
    animation: "gradient 15s ease infinite",
    overflow: "hidden",
    padding: "0 15px",
  },
  container: {
    width: "100%",
    maxWidth: 450,
    padding: "2rem",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "12px",
    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
    textAlign: "center",
    animation: "containerFadeIn 2s ease-out",
    display: 'Flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    fontSize: "2rem",
    color: "#333",
    margin: "0 0 1rem",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#666",
    marginBottom: "2rem",
  },
};

const globalStyles = `
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes containerFadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export default AuthPage;
