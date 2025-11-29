'use server'

import { IronSession, getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { Address } from 'viem'
import { zfd } from 'zod-form-data'

import { actionClient } from '@/actions/client'
import { NamestoneProfileSchema } from '@/types/namestone'
import { isValidDomainName } from '@/config/nns-contracts'

const formSchema = zfd.formData(NamestoneProfileSchema)

/**
 * Validate domain name registration
 * Note: Actual registration happens on client-side via wallet transaction
 * This server action only validates the session
 */
export const createName = actionClient
  .schema(formSchema)
  .stateAction(async ({ parsedInput: profile }) => {
    let session: IronSession<{ address: Address }>

    try {
      // Validate the SIWE session
      session = await getIronSession(cookies(), {
        password: process.env.SESSION_SECRET as string,
        cookieName: 'siwe',
      })

      // Only let users register names for themselves
      if (session.address !== profile.address) {
        throw new Error('Address mismatch')
      }
    } catch (error) {
      return {
        error: 'Your session is invalid. Please disconnect and connect again.',
      }
    }

    // Validate domain name (3-63 characters, alphanumeric + hyphen)
    if (!isValidDomainName(profile.name)) {
      return { error: 'Name must be 3-63 alphanumeric characters (hyphens allowed, but not at start/end)' }
    }

    // Registration is open to all users (no allowlist)
    // The actual blockchain transaction will be handled on client-side
    return {
      success: true,
      message: 'Validation passed. Proceed with blockchain transaction.',
    }
  })
