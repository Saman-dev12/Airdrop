import { useState } from "react";
import Navbar from "./Navbar";
import { useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection ,LAMPORTS_PER_SOL} from "@solana/web3.js";

function Airdrop() {
    const [amount, setAmount] = useState<number>(0)
    const wallet = useWallet()
    
    const addSol = () => {
        if(amount <= 0) {
            alert('Please enter a valid amount')
            return
        }
        if(!wallet.publicKey) {
            alert('Please connect your wallet')
            return
        }
        const connection =  new Connection(clusterApiUrl('devnet'), 'confirmed')
        connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL).then(() => {
            alert('Airdrop successful')
            }).catch((error) => {
                console.log(error)
                alert('Airdrop failed')
            })
    }

  return (
  <>
        <Navbar/>
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-700 to-red-600 font-sans">
      <div className="bg-white rounded-lg p-8 shadow-md text-center w-96">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Solana Airdrop</h1>
        <p className="text-gray-600 mb-6">
          Enter your Solana wallet address below to receive free SOL tokens!
        </p>
        <input
            onChange={(e) => setAmount(Number(e.target.value))}
          type="number"
          min={1}
          step={0.01}
          max={10}
          value={amount}
          placeholder="Enter your wallet address"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        
        <button onClick={addSol} className="bg-red-600 text-white py-2 px-4 rounded-md text-lg hover:bg-red-700 transition">
          Claim Airdrop
        </button>
      </div>
    </div>
    </>
  );
}

export default Airdrop;
