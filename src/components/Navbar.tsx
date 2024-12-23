import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import React from 'react';

const Navbar: React.FC = () => {
    return (
        <div className="w-full">
            <nav className="bg-blue-600 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white text-xl font-bold">
                        Airdrop Application
                    </div>
                    <div className="space-x-4 flex">

                       <div><WalletMultiButton /></div>
                       <div><WalletDisconnectButton /></div>
                       
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
