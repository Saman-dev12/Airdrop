'use client'

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey } from '@solana/web3.js';
import React, { useEffect, useState } from 'react';

const Navbar: React.FC = () => {
    const [balance, setBalance] = useState<number>(0);
    const { connection } = useConnection();
    const wallet = useWallet();

    const getBalance = async () => {
        if (wallet.publicKey) {
            const balance = await connection.getBalance(new PublicKey(wallet.publicKey));
            setBalance(balance / 1000000000);
        } else {
            setBalance(0);
        }
    };

    useEffect(() => {
        getBalance();
    }, [wallet.publicKey, connection]);

    return (
        <nav className="bg-blue-900 shadow-lg">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <span className="text-white text-2xl font-extrabold">Airdrop App</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        {wallet.publicKey && (
                            <div className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full backdrop-filter backdrop-blur-sm">
                                <span className="font-semibold">Balance:</span>
                                <span className="ml-2">{balance.toFixed(2)} SOL</span>
                            </div>
                        )}
                        <div className="relative group">
                            <WalletMultiButton className="!bg-transparent hover:!bg-white hover:!bg-opacity-20 !transition-all !duration-300 !rounded-full !py-2 !px-4 !text-sm !font-medium" />
                        </div>
                        <div className="relative group">
                            <WalletDisconnectButton onClick={getBalance} className="!bg-transparent hover:!bg-white hover:!bg-opacity-20 !transition-all !duration-300 !rounded-full !py-2 !px-4 !text-sm !font-medium" />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

