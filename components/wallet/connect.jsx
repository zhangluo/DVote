'use client';
import React, { useState, useEffect } from 'react';
import { Web3Provider } from '@ethersproject/providers'; 
import { Button} from 'antd';
import { useRouter } from 'next/navigation'; // 使用新的 navigation 包
// '@ethersproject/providers' ethers v6版本后web3Provider需要单独导入 其他的provider不需要
const ConnectWallet = () => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      try {
        const web3Provider = new Web3Provider(window.ethereum);
        setProvider(web3Provider);
      } catch (error) {
        console.error('Failed to initialize Web3Provider:', error);
      }
    } else {
      console.error("MetaMask is not installed.");
    }
  }, []);

  useEffect(() => {
    const walletAddress = localStorage.getItem('walletAddress')
    if (!walletAddress) {
      getCurrentWalletConnected();
      addWalletListener();
    }
  }, [account]);

  const connectWallet = async () => {
    if (!provider) {
      alert("MetaMask is not detected. Please install MetaMask extension.");
      return;
    }

    try {
      // 请求用户授权
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      localStorage.setItem('walletAddress', address)
      setAccount(address);
      router.push(`/`);
      console.log(`Connected: ${address}`);
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  const getCurrentWalletConnected = async () => {
    if (!provider) {
      alert("MetaMask is not detected. Please install MetaMask extension.");
      return;
    }
    try {
      /* get account*/
      const accounts = await provider.send("eth_requestAccounts", []) 
     if (accounts.length > 0) {
        /* get signer */
       setSinger(provider.getSigner()); 
       /*get contract local instance*/ 
       setFcContract(faucetContract(provider));
       setAccount(accounts[0]);
       console.log(accounts[0]);
     } else {
       console.log("Connect to MetaMask using the Connect button");
     }
   } catch (err) {
     console.error(err.message);
   }
  };

  const addWalletListener = async () => {
    if (provider) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setAccount("");
      console.log("Please install MetaMask");
    }
  };
  return (
    <div>
      <Button type="primary" onClick={connectWallet}>
        连接MetaMask
      </Button>
    </div>
  );
};

export default ConnectWallet;
