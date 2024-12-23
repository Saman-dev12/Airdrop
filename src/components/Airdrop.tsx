import { useState } from "react";
import Navbar from "./Navbar";

function Airdrop() {
    const [address, setAddress] = useState<string>('')
    const addSol = () => {
        if(address.trim() === '') {
            alert('Please enter a valid address')
            return
        }
        // Add sol here
        console.log("Adding sol to address: ", address)
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
            onChange={(e) => setAddress(e.target.value)}
          type="text"
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
