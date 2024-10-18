'use client';
import { useEffect, useState } from "react";
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import faucetContract from "@/app/ethereum/faucet";

function WalletInfos() {
  const { address, isConnected } = useAccount();
  const [walletAddress, setWalletAddress] = useState(address);
  const [signer, setSinger] = useState();
  const [DvoteContract, setDvoteContract] = useState();
  const [withdrawError, setWithdrawError] = useState("");
  const [withdrawSuceess, setWithdrawSuccess] = useState("");
  const [transactionData, setTransationData] = useState("");
  const [provider, setProvider] = useState(null);

  // useEffect(() => {
  //   getCurrentWalletConnected();
  //   addWalletListener();
  // }, [walletAddress]);

  // useEffect(() => {
  //   if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  //     const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
  //     setProvider(web3Provider);
  //   } else {
  //     console.error("MetaMask is not installed. Please install it to use this application.");
  //   }
  // }, []);

  // const connectWallet = async () => {
  //   if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
  //     try {
  //       /* get account*/
  //       const accounts = await provider.send("eth_requestAccounts", []) 
  //       /* get signer */
  //       setSinger(provider.getSigner()); 
  //       /*get contract local instance*/ 
  //       setFcContract(faucetContract(provider));
  //       setWalletAddress(accounts[0]);
  //       console.log(accounts[0]);
  //     } catch (err) {
  //       console.error(err.message);
  //     }
  //   } else {
  //     /* MetaMask is not installed */
  //     console.log("Please install MetaMask");
  //   }
  // };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
         /* get account*/
         const accounts = await provider.send("eth_requestAccounts", []) 
        if (accounts.length > 0) {
           /* get signer */
          setSinger(provider.getSigner()); 
          /*get contract local instance*/ 
          setFcContract(faucetContract(provider));
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setWalletAddress("");
      console.log("Please install MetaMask");
    }
  };

  const getOCTHandler = async () => {
    setWithdrawError('');
    setWithdrawSuccess('');
    setTransationData('')
    try {
      const fcContractWithSigner = fcContract.connect(signer);
      const resp = await fcContractWithSigner.requestTokens();
      setWithdrawSuccess("Opration success!");
      setTransationData(resp.hash)
    } catch(err) {
      console.error(err.message);
      setWithdrawError(err.message);
    }
  };
  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <h1 className="navbar-item is-size-4">Ocean Token (OCT)</h1>
          </div>
          <div id="navbarMenu" className="navbar-menu">
            <div className="navbar-end is-align-items-center">
              <button
                className="button is-white connect-wallet"
                onClick={connectWallet}
              >
                <span className="is-link has-text-weight-bold">
                  {walletAddress && walletAddress.length > 0
                    ? `Connected: ${walletAddress.substring(
                        0,
                        6
                      )}...${walletAddress.substring(38)}`
                    : "Connect Wallet"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <section className="hero is-fullheight">
        <div className="faucet-hero-body">
          <div className="container has-text-centered main-content">
            <h1 className="title is-1">Faucet</h1>
            <p>Fast and reliable. 50 OCT/day.</p>
            <div className="mt-5">
              {withdrawError && <div className="withdraw-error">{withdrawError}</div>}
              {withdrawSuceess && <div className="withdraw-success">{withdrawSuceess}</div>}
            </div>
            <div className="box address-box">
              <div className="columns">
                <div className="column is-four-fifths">
                  <input
                    className="input is-medium"
                    type="text"
                    placeholder="Enter your wallet address (0x...)"
                    defaultValue={walletAddress}
                    disabled={walletAddress ? false : true}
                  />
                </div>
                <div className="column">
                  <button className="button is-link is-medium" onClick={getOCTHandler}>
                    GET TOKENS
                  </button>
                </div>
              </div>
              <article className="panel is-grey-darker">
                <p className="panel-heading">Transaction Data</p>
                <div className="panel-block">
                  <p>{transactionData ? `transaction Hash:${transactionData}` : '--'}</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WalletInfos;
