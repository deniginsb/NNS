import { NextRequest, NextResponse } from 'next/server'
import { ethers } from 'ethers'
import { NNS_CONFIG } from '@/config/nns-contracts'
import { getProfileData } from '@/lib/nns'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

/**
 * NFT Metadata API Endpoint
 * Returns OpenSea-compatible metadata for NNS domain NFTs
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    const { name } = params

    if (!name) {
      return NextResponse.json(
        { error: 'Domain name is required' },
        { status: 400 }
      )
    }

    // Create provider for reading contract data
    const provider = new ethers.JsonRpcProvider(NNS_CONFIG.rpcUrl)

    // Get domain profile data from blockchain
    const fullDomainName = `${name}.nexus`
    const profile = await getProfileData(fullDomainName, provider)

    // Generate metadata
    const metadata = {
      name: fullDomainName,
      description: `${fullDomainName} - A decentralized domain on Nexus Name Service`,
      image: profile?.avatar || generateDefaultImage(name),
      external_url: `https://nns.web.id/?domain=${name}`,
      attributes: [
        {
          trait_type: 'Domain',
          value: fullDomainName,
        },
        {
          trait_type: 'TLD',
          value: '.nexus',
        },
        {
          trait_type: 'Length',
          value: name.length,
        },
        {
          trait_type: 'Character Set',
          value: getCharacterSet(name),
        },
        {
          trait_type: 'Registration Date',
          display_type: 'date',
          value: Math.floor(Date.now() / 1000), // Current timestamp as placeholder
        },
      ],
    }

    // Add social attributes if they exist
    if (profile?.twitter) {
      metadata.attributes.push({
        trait_type: 'Twitter',
        value: profile.twitter,
      })
    }

    if (profile?.telegram) {
      metadata.attributes.push({
        trait_type: 'Telegram',
        value: profile.telegram,
      })
    }

    return NextResponse.json(metadata, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    })
  } catch (error) {
    console.error('Error fetching metadata:', error)

    // Return basic metadata even if blockchain query fails
    const { name } = params
    const fallbackMetadata = {
      name: `${name}.nexus`,
      description: `${name}.nexus - A decentralized domain on Nexus Name Service`,
      image: generateDefaultImage(name),
      attributes: [
        {
          trait_type: 'Domain',
          value: `${name}.nexus`,
        },
        {
          trait_type: 'TLD',
          value: '.nexus',
        },
        {
          trait_type: 'Length',
          value: name.length,
        },
      ],
    }

    return NextResponse.json(fallbackMetadata, {
      headers: {
        'Cache-Control': 'public, s-maxage=60',
      },
    })
  }
}

/**
 * Generate default image URL using a placeholder service
 */
function generateDefaultImage(name: string): string {
  // Using a simple gradient placeholder
  // You can replace this with your own image generation service
  const encoded = encodeURIComponent(`${name}.nexus`)
  return `https://via.placeholder.com/500x500/4F46E5/FFFFFF?text=${encoded}`
}

/**
 * Determine character set of domain name
 */
function getCharacterSet(name: string): string {
  const hasNumbers = /\d/.test(name)
  const hasLetters = /[a-z]/.test(name)
  const hasHyphen = /-/.test(name)

  if (hasNumbers && hasLetters && hasHyphen) return 'Alphanumeric + Hyphen'
  if (hasNumbers && hasLetters) return 'Alphanumeric'
  if (hasNumbers) return 'Numeric'
  if (hasLetters && hasHyphen) return 'Letters + Hyphen'
  return 'Letters'
}
