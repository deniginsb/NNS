/**
 * NNS (Nexus Name Service) Utility Functions
 * Handles interaction with NNS smart contracts
 */

import { ethers } from 'ethers'
import type { WalletClient } from 'viem'
import { walletClientToSigner } from '@/lib/ethers'
import {
  NNS_CONFIG,
  NNS_REGISTRY_ABI,
  PUBLIC_RESOLVER_ABI,
  NEXUS_REGISTRAR_ABI,
  getDomainLabel,
  formatDomainName,
} from '@/config/nns-contracts'

/**
 * Calculate namehash for a domain name
 */
export function namehash(name: string): string {
  let node = ethers.ZeroHash
  if (name) {
    const labels = name.split('.')
    for (let i = labels.length - 1; i >= 0; i--) {
      const labelHash = ethers.keccak256(ethers.toUtf8Bytes(labels[i]))
      node = ethers.keccak256(ethers.concat([node, labelHash]))
    }
  }
  return node
}

/**
 * Get NNS Registry contract instance
 */
export function getNNSRegistry(signer: ethers.Signer) {
  return new ethers.Contract(
    NNS_CONFIG.contracts.NNSRegistry,
    NNS_REGISTRY_ABI,
    signer
  )
}

/**
 * Get Public Resolver contract instance
 */
export function getPublicResolver(signer: ethers.Signer) {
  return new ethers.Contract(
    NNS_CONFIG.contracts.PublicResolver,
    PUBLIC_RESOLVER_ABI,
    signer
  )
}

/**
 * Get Nexus Registrar contract instance
 */
export function getNexusRegistrar(signer: ethers.Signer) {
  return new ethers.Contract(
    NNS_CONFIG.contracts.NexusRegistrar,
    NEXUS_REGISTRAR_ABI,
    signer
  )
}

/**
 * Check if a domain name is available
 */
export async function checkAvailability(
  name: string,
  provider: ethers.Provider
): Promise<boolean> {
  const registrar = new ethers.Contract(
    NNS_CONFIG.contracts.NexusRegistrar,
    NEXUS_REGISTRAR_ABI,
    provider
  )
  const label = getDomainLabel(name)
  return await registrar.available(label)
}

/**
 * Register a new domain
 */
export async function registerDomain(
  name: string,
  ownerAddress: string,
  walletClient: WalletClient
): Promise<string> {
  const signer = await walletClientToSigner(walletClient)
  const registrar = getNexusRegistrar(signer)
  const label = getDomainLabel(name)

  // Get registration fee
  const fee = await registrar.registrationFee()

  // Register for 1 year (31536000 seconds)
  const duration = NNS_CONFIG.config.minDuration

  const tx = await registrar.register(label, ownerAddress, duration, {
    value: fee,
  })

  const receipt = await tx.wait()
  return receipt.hash
}

/**
 * Set address for a domain
 */
export async function setDomainAddress(
  name: string,
  address: string,
  walletClient: WalletClient
): Promise<void> {
  const signer = await walletClientToSigner(walletClient)
  const resolver = getPublicResolver(signer)
  const fullName = formatDomainName(name)
  const node = namehash(fullName)

  const tx = await resolver.setAddr(node, address)
  await tx.wait()
}

/**
 * Set text record for a domain (for avatar, twitter, telegram, etc)
 */
export async function setDomainText(
  name: string,
  key: string,
  value: string,
  walletClient: WalletClient
): Promise<void> {
  const signer = await walletClientToSigner(walletClient)
  const resolver = getPublicResolver(signer)
  const fullName = formatDomainName(name)
  const node = namehash(fullName)

  const tx = await resolver.setText(node, key, value)
  await tx.wait()
}

/**
 * Get text record from a domain
 */
export async function getDomainText(
  name: string,
  key: string,
  provider: ethers.Provider
): Promise<string> {
  const resolver = new ethers.Contract(
    NNS_CONFIG.contracts.PublicResolver,
    PUBLIC_RESOLVER_ABI,
    provider
  )
  const fullName = formatDomainName(name)
  const node = namehash(fullName)

  return await resolver.text(node, key)
}

/**
 * Get address for a domain
 */
export async function getDomainAddress(
  name: string,
  provider: ethers.Provider
): Promise<string> {
  const resolver = new ethers.Contract(
    NNS_CONFIG.contracts.PublicResolver,
    PUBLIC_RESOLVER_ABI,
    provider
  )
  const fullName = formatDomainName(name)
  const node = namehash(fullName)

  return await resolver.addr(node)
}

/**
 * Get domain info from registrar
 */
export async function getDomainInfo(
  name: string,
  provider: ethers.Provider
): Promise<{
  owner: string
  expires: bigint
  exists: boolean
  tokenId: bigint
}> {
  const registrar = new ethers.Contract(
    NNS_CONFIG.contracts.NexusRegistrar,
    NEXUS_REGISTRAR_ABI,
    provider
  )
  const label = getDomainLabel(name)

  const [owner, expires, exists, tokenId] = await registrar.getDomain(label)

  return {
    owner,
    expires,
    exists,
    tokenId,
  }
}

/**
 * Get all domains owned by an address
 */
export async function getDomainsOfOwner(
  ownerAddress: string,
  provider: ethers.Provider
): Promise<string[]> {
  const registrar = new ethers.Contract(
    NNS_CONFIG.contracts.NexusRegistrar,
    NEXUS_REGISTRAR_ABI,
    provider
  )

  const domains = await registrar.getDomainsOfOwner(ownerAddress)

  // Add .nexus suffix to each domain
  return domains.map((domain: string) => formatDomainName(domain))
}

/**
 * Profile data interface
 */
export interface ProfileData {
  name: string
  address: string
  avatar?: string
  twitter?: string
  telegram?: string
}

/**
 * Get full profile data for a domain
 */
export async function getProfileData(
  name: string,
  provider: ethers.Provider
): Promise<ProfileData | null> {
  try {
    const domainInfo = await getDomainInfo(name, provider)

    if (!domainInfo.exists) {
      return null
    }

    // Get text records
    const [avatar, twitter, telegram] = await Promise.all([
      getDomainText(name, 'avatar', provider).catch(() => ''),
      getDomainText(name, 'com.twitter', provider).catch(() => ''),
      getDomainText(name, 'org.telegram', provider).catch(() => ''),
    ])

    return {
      name: formatDomainName(name),
      address: domainInfo.owner,
      avatar: avatar || undefined,
      twitter: twitter || undefined,
      telegram: telegram || undefined,
    }
  } catch (error) {
    console.error('Error fetching profile data:', error)
    return null
  }
}

/**
 * Update profile data (avatar, twitter, telegram)
 */
export async function updateProfile(
  name: string,
  updates: {
    avatar?: string
    twitter?: string
    telegram?: string
  },
  walletClient: WalletClient
): Promise<void> {
  const promises: Promise<void>[] = []

  if (updates.avatar !== undefined) {
    promises.push(setDomainText(name, 'avatar', updates.avatar, walletClient))
  }

  if (updates.twitter !== undefined) {
    promises.push(setDomainText(name, 'com.twitter', updates.twitter, walletClient))
  }

  if (updates.telegram !== undefined) {
    promises.push(setDomainText(name, 'org.telegram', updates.telegram, walletClient))
  }

  await Promise.all(promises)
}
