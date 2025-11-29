'use client'

import { useEffect } from 'react'
import { useAccount, useChainId, useSwitchChain } from 'wagmi'
import { NNS_CONFIG } from '@/config/nns-contracts'
import toast from 'react-hot-toast'

/**
 * Auto switch to Nexus Testnet when wallet is connected
 * Also auto-add network to MetaMask if not exists
 */
export function useAutoSwitchNetwork() {
  const { isConnected, address } = useAccount()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()

  useEffect(() => {
    // Only run if wallet is connected
    if (!isConnected || !address) {
      return
    }

    // Check if user is on wrong network
    if (chainId !== NNS_CONFIG.chainId) {
      // Show loading toast
      toast.loading('Switching to Nexus Testnet...', { id: 'switch-network' })

      // Try to switch network
      switchChain(
        { chainId: NNS_CONFIG.chainId },
        {
          onSuccess: () => {
            toast.success('Switched to Nexus Testnet!', { id: 'switch-network' })
          },
          onError: async (error) => {
            // If network doesn't exist in wallet, try to add it
            if (
              error.message.includes('Unrecognized chain') ||
              error.message.includes('Try adding the chain') ||
              error.message.includes('Chain') ||
              (error as any).code === 4902
            ) {
              toast.loading('Adding Nexus Testnet to your wallet...', {
                id: 'switch-network',
              })

              try {
                await addNexusNetwork()
                toast.success('Nexus Testnet added! Switching network...', {
                  id: 'switch-network',
                })

                // Try to switch again after adding
                setTimeout(() => {
                  switchChain(
                    { chainId: NNS_CONFIG.chainId },
                    {
                      onSuccess: () => {
                        toast.success('Switched to Nexus Testnet!', {
                          id: 'switch-network',
                        })
                      },
                      onError: () => {
                        toast.error('Please switch to Nexus Testnet manually', {
                          id: 'switch-network',
                        })
                      },
                    }
                  )
                }, 1000)
              } catch (addError) {
                toast.error('Failed to add network. Please add manually.', {
                  id: 'switch-network',
                  duration: 5000,
                })
              }
            } else {
              toast.error('Failed to switch network. Please switch manually.', {
                id: 'switch-network',
              })
            }
          },
        }
      )
    }
  }, [isConnected, address, chainId, switchChain])
}

/**
 * Add Nexus Testnet to MetaMask
 */
async function addNexusNetwork() {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed')
  }

  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: `0x${NNS_CONFIG.chainId.toString(16)}`, // 3940 in hex
          chainName: NNS_CONFIG.chainName,
          nativeCurrency: NNS_CONFIG.nativeCurrency,
          rpcUrls: [NNS_CONFIG.rpcUrl],
          blockExplorerUrls: [NNS_CONFIG.explorerUrl],
        },
      ],
    })
  } catch (error) {
    console.error('Error adding Nexus network:', error)
    throw error
  }
}
