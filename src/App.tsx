'use client'

import { useState } from "react"
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'
import '@solana/wallet-adapter-react-ui/styles.css'
import { useMemo } from "react"
import Airdrop from "./components/Airdrop"
import SendSolComponent from "./components/Send"
import Navbar from "./components/Navbar"

function App() {
  const [activeTab, setActiveTab] = useState('airdrop')
  
  const network = WalletAdapterNetwork.Devnet
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [
        new UnsafeBurnerWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-900">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="flex border-b border-gray-200">
                  <button
                    className={`flex-1 py-4 px-6 text-sm font-medium focus:outline-none ${
                      activeTab === 'airdrop'
                        ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-700'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('airdrop')}
                  >
                    Airdrop
                  </button>
                  <button
                    className={`flex-1 py-4 px-6 text-sm font-medium focus:outline-none ${
                      activeTab === 'send'
                        ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-700'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('send')}
                  >
                    Send SOL
                  </button>
                </div>
                <div className="p-6">
                  {activeTab === 'airdrop' ? <Airdrop /> : <SendSolComponent />}
                </div>
              </div>
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App

