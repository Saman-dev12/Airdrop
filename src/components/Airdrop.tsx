import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function Airdrop() {
  const [amount, setAmount] = useState<number>(0);
  const wallet = useWallet();
  const { connection } = useConnection();

  const addSol = async () => {
    if (amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    if (!wallet.publicKey) {
      alert('Please connect your wallet');
      return;
    }

    try {
      await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
      alert('Airdrop successful');
    } catch (error) {
      console.log(error);
      alert('Airdrop failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Solana Airdrop</h1>
            <p className="text-gray-600 mb-8">Claim your free SOL tokens!</p>
            <div className="space-y-6">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (SOL)
                </label>
                <input
                  id="amount"
                  type="number"
                  min={0.01}
                  step={0.01}
                  max={10}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                  placeholder="Enter SOL amount"
                />
              </div>
              <button
                onClick={addSol}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform hover:-translate-y-0.5"
              >
                Claim Airdrop
              </button>
            </div>
          </div>
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Make sure your wallet is connected before claiming the airdrop.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

