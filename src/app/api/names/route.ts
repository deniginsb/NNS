import { NextRequest, NextResponse } from 'next/server'
import { ethers } from 'ethers'
import { NNS_CONFIG } from '@/config/nns-contracts'
import { getDomainsOfOwner, getProfileData } from '@/lib/nns'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const address = searchParams.get('address')

    // Create provider for reading contract data
    const provider = new ethers.JsonRpcProvider(NNS_CONFIG.rpcUrl)

    if (address) {
      // Get domains owned by this address
      const domains = await getDomainsOfOwner(address, provider)

      // Fetch profile data for each domain
      const profiles = await Promise.all(
        domains.map(async (domain) => {
          const profile = await getProfileData(domain, provider)
          return profile
        })
      )

      // Filter out null profiles and format for frontend
      const validProfiles = profiles
        .filter((p) => p !== null)
        .map((p) => ({
          name: p!.name.replace('.nexus', ''), // Remove .nexus suffix for display
          address: p!.address,
          avatar: p!.avatar || '',
          twitter: p!.twitter || '',
          telegram: p!.telegram || '',
        }))

      return NextResponse.json(validProfiles)
    }

    // If no address specified, we could fetch all registered domains
    // For now, return empty array (this would require event indexing for efficient fetching)
    return NextResponse.json([])
  } catch (error) {
    console.error('Error fetching names:', error)
    return NextResponse.json(
      { error: 'Failed to fetch names' },
      { status: 500 }
    )
  }
}
