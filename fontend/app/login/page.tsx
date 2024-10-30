// AuthPage.tsx
"use client";

import React, { useEffect,useState } from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { 
  setConnectionStatus,
  setIsAdminStatus,
  setIsCanditdateStatus,
  setIsSuperAdminStatus
} from '@/config/wagmi/wagmiCookies';
import { useSignMessage } from 'wagmi';
import { config, ABIConfig } from '@/config/wagmi/wagmiConfig';
import { readContract } from '@wagmi/core';

const AuthPage = React.memo(() => {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const { signMessage, isSuccess, isError, data, error } = useSignMessage();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(false); // 是否为管理员
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean | null>(false); // 是否为超级管理员
  const [isCandidate, setIsCandidate] = useState<boolean | null>(false); // 是否为候选人

  useEffect(() => {
    if (isConnected && address) {
      setConnectionStatus('connected');
      checkIsAdmin(address);
      checkIsSuperAdmin(address);
      checkIsCandidator(address);
      (async () => {
        const signature = signMessage({
          message: `hello world ${address}`,
        });
        console.log('signature', signature);
      })();
    }
  }, [isConnected, address]);


  const checkIsSuperAdmin = (address: string) => {
    readContract(config, {
      address: ABIConfig.address,
      abi: ABIConfig.abi,
      functionName: 'owner',
      args: [],
    }).then((result) => {
      const isSuper = address == result;
      setIsSuperAdminStatus(isSuper);
      setIsSuperAdmin(isSuper)
    }).catch((error) => {
      console.error("Error:", error);
    });
  }

  const checkIsAdmin = (address: string) => {
    readContract(config, {
      address: ABIConfig.address,
      abi: ABIConfig.abi,
      functionName: 'checkAdminByAddr',
      args: [[address]],
    }).then((result) => {
      const isRes = result as boolean;
      setIsAdminStatus(isRes);
      setIsAdmin(isRes)
    }).catch((error) => {
      console.error("Error:", error);
    });
  }

  const checkIsCandidator = (address: string) => {
    readContract(config, {
      address: ABIConfig.address,
      abi: ABIConfig.abi,
      functionName: 'checkIsCandidator',
      args: [address],
    }).then((result) => {
      const isResult = result as boolean;
      setIsCanditdateStatus(isResult);
      setIsCandidate(isResult)
    }).catch((error) => {
      console.error("Error:", error);
    });
  }
  // 默认调整路由
  let forwardUrl = '/'
  if (isSuperAdmin || isAdmin) {
    forwardUrl = '/'
  } else {
    if (isCandidate) {
      forwardUrl = '/candidateInfo'
    } else {
      forwardUrl = '/allCandidates'
    }
  }
  useEffect(() => {
    if (isSuccess && data) {
      console.log('Signature successful:', data);
      router.push(forwardUrl);
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
          <img src="../../static/vote_logo.png" alt="DVote Logo" style={styles.logo} />
          <h1 style={styles.title}>Welcome to DVote System</h1>
          <p style={styles.subtitle}>A secure and decentralized voting system for the future.</p>
          <ConnectButton showBalance={{
              smallScreen: false,
              largeScreen: false,
            }} />
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
    background: "linear-gradient(135deg, #6D83F2, #856DFF)",
    backgroundSize: "200% 200%",
    animation: "gradient 15s ease infinite",
    padding: "0 20px",
  },
  logo: {
    width: "150px",
    height: "auto",
    marginBottom: "20px",
  },
  container: {
    width: "100%",
    maxWidth: 400,
    padding: "2.5rem",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: "15px",
    boxShadow: "0px 12px 35px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    animation: "containerFadeIn 1.5s ease-out",
  },
  title: {
    fontSize: "2.5rem",
    color: "#333",
    margin: "0 0 1rem",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#555",
    marginBottom: "2rem",
    maxWidth: "300px",
    lineHeight: "1.5",
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
