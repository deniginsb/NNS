import { getDefaultConfig } from 'connectkit'
import { configureClientSIWE } from 'connectkit-next-siwe'
import { createConfig, http } from 'wagmi'
import { defineChain } from 'viem'
import { NNS_CONFIG } from '@/config/nns-contracts'

const WALLETCONNECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_ID

if (!WALLETCONNECT_ID) {
  throw new Error('Missing NEXT_PUBLIC_WALLETCONNECT_ID')
}

// Define Nexus Testnet chain
export const nexusTestnet = defineChain({
  id: NNS_CONFIG.chainId,
  name: NNS_CONFIG.chainName,
  nativeCurrency: NNS_CONFIG.nativeCurrency,
  rpcUrls: {
    default: { http: [NNS_CONFIG.rpcUrl] },
    public: { http: [NNS_CONFIG.rpcUrl] },
  },
  blockExplorers: {
    default: { name: 'Nexus Explorer', url: NNS_CONFIG.explorerUrl },
  },
  testnet: true,
})

export const ckConfig = getDefaultConfig({
  chains: [nexusTestnet],
  transports: {
    [nexusTestnet.id]: http(NNS_CONFIG.rpcUrl),
  },
  walletConnectProjectId: WALLETCONNECT_ID,
  appName: 'Nexus Name Service',
  appDescription: 'Register your .nexus domain',
  appUrl: 'https://nns.nexus.xyz',
  appIcon: 'https://nns.nexus.xyz/icon.png',
  ssr: true,
})

export const wagmiConfig = createConfig(ckConfig)

export const siweClient = configureClientSIWE({
  apiRoutePrefix: '/api/siwe',
  statement: 'Sign In With Ethereum to prove you control this wallet.',
})
