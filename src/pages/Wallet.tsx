import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Wallet as WalletIcon, RefreshCw, Send } from 'lucide-react';

const Wallet: React.FC = () => {
  const [balance, setBalance] = useState<string>('0');
  const [address, setAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');

  useEffect(() => {
    connectWallet();
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAddress(address);
        updateBalance(provider, address);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      console.log('Please install MetaMask!');
    }
  };

  const updateBalance = async (provider: ethers.Provider, address: string) => {
    const balance = await provider.getBalance(address);
    setBalance(ethers.formatEther(balance));
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const tx = await signer.sendTransaction({
          to: recipient,
          value: ethers.parseEther(amount)
        });
        await tx.wait();
        updateBalance(provider, address);
        setAmount('');
        setRecipient('');
      } catch (error) {
        console.error('Failed to send transaction:', error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Wallet</h2>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <WalletIcon className="mr-2 text-blue-500" />
            <span className="font-semibold">Balance:</span>
          </div>
          <span className="text-xl font-bold">{balance} ETH</span>
        </div>
        <p className="text-sm text-gray-600 break-all">{address}</p>
        <button
          onClick={connectWallet}
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <RefreshCw className="inline-block mr-2" />
          Refresh Balance
        </button>
      </div>

      <form onSubmit={handleSend} className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Send Tokens</h3>
        <div className="mb-4">
          <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">Recipient Address</label>
          <input
            type="text"
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="0x..."
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount (ETH)</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.0"
            step="0.0001"
            min="0"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          <Send className="inline-block mr-2" />
          Send Tokens
        </button>
      </form>
    </div>
  );
};

export default Wallet;