/**
 * Ethers.js utilities for converting viem clients to ethers signers
 */

import { ethers, type Signer } from 'ethers'
import type { WalletClient, Account, Chain, Transport } from 'viem'

/**
 * Convert a viem WalletClient to an ethers Signer
 */
export async function walletClientToSigner(
  walletClient: any
): Promise<Signer> {
  const { account, chain, transport } = walletClient

  if (!account) {
    throw new Error('WalletClient must have an account')
  }

  if (!chain) {
    throw new Error('WalletClient must have a chain')
  }

  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }

  const provider = new ethers.BrowserProvider(
    transport as any,
    network
  )

  return await provider.getSigner(account.address)
}
