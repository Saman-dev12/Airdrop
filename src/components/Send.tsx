import React, { useState } from "react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { ArrowRight, AlertCircle } from 'lucide-react';

const SendSolComponent: React.FC = () => {
  const { publicKey,signTransaction, connected } = useWallet();
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const { connection } = useConnection();

  const handleSendSol = async () => {
    try {
      setStatus("Sending SOL...");
  
      // Check if the wallet is connected and signTransaction is available
      if (!publicKey) {
        setStatus("Please connect your wallet");
        return;
      }
      if (!signTransaction) {
        setStatus("Wallet does not support transaction signing.");
        return;
      }
      if (!recipientAddress) {
        setStatus("Please enter recipient address");
        return;
      }
      if (amount <= 0) {
        setStatus("Please enter a valid amount");
        return;
      }
      if (!connected) {
        setStatus("Please connect your wallet");
        return;
      }
  
      const recipientPublicKey = new PublicKey(recipientAddress);
    
      const { blockhash } = await connection.getLatestBlockhash();

      const transaction = new Transaction({
        recentBlockhash: blockhash,
        feePayer: publicKey,
      }).add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPublicKey,
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );


      const sign = await signTransaction(transaction);
    
  
      
      setStatus(`Sent ${amount} SOL to ${recipientAddress} with signature: ${sign}`);
    } catch (error: any) {
      setStatus(`Error: ${error.message}`);
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-900 p-6">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Send SOL on Devnet</h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">
                Recipient Address
              </label>
              <input
                id="recipient"
                type="text"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                placeholder="Enter recipient wallet address"
              />
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Amount (SOL)
              </label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                placeholder="Enter amount in SOL"
              />
            </div>
            <button
              onClick={handleSendSol}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform hover:-translate-y-0.5 flex items-center justify-center"
            >
              <span>Send SOL</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
        {status && (
          <div className={`px-8 py-4 ${status.startsWith("Error") ? "bg-red-50" : "bg-green-50"}`}>
            <div className={`flex items-center text-sm ${status.startsWith("Error") ? "text-red-800" : "text-green-800"}`}>
              <AlertCircle className="h-5 w-5 mr-2" />
              <p>{status}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SendSolComponent;

