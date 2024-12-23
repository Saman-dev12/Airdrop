import Airdrop from "./components/Airdrop"
import { ConnectionProvider,WalletProvider } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets'
import { WalletModalProvider} from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'
import '@solana/wallet-adapter-react-ui/styles.css'
import { useMemo } from "react"
function App() {
  
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
          <Airdrop />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App