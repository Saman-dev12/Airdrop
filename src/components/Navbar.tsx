import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey } from '@solana/web3.js';
import React, { useEffect } from 'react';

const Navbar: React.FC = () => {
    const [balance, setBalance] = React.useState<number>(0);
    const {connection} = useConnection()
    const wallet = useWallet()
    const getBalance = async () => {
            
        if (wallet.publicKey) {
            const balance = await connection.getBalance(new PublicKey(wallet.publicKey));
            setBalance(balance / 1000000000);
        }else{
            setBalance(0)
        }
    }
    useEffect(() => {   
        getBalance();
    }, [wallet.publicKey]); 
    return (
        <div className="w-full">
            <nav className="bg-blue-600 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white text-xl font-bold">
                        Airdrop Application
                    </div>
                    <div className="space-x-4 flex">
                        {wallet.publicKey && (<div className="bg-purple-800 flex items-center justify-center text-white px-4 py-2 rounded">
                            Balance: {balance.toFixed(2)} SOL
                        </div>)}
                        
                       <div><WalletMultiButton /></div>
                       <div><WalletDisconnectButton onClick={getBalance} /></div>
                       
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
