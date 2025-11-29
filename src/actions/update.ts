'use server'

import { IronSession, getIronSession } from 'iron-session'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { Address } from 'viem'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { actionClient } from '@/actions/client'
import { NamestoneProfileSchema } from '@/types/namestone'

const noSpaceString = z.string().refine((value) => !value.includes(' '))

const formSchema = zfd.formData(
  NamestoneProfileSchema.extend({
    avatar: noSpaceString.optional(),
    twitter: noSpaceString.optional(),
    telegram: noSpaceString.optional(),
  })
)

/**
 * Validate profile update
 * Note: Actual update happens on client-side via wallet transaction
 * This server action only validates the session
 */
export const updateName = actionClient
  .schema(formSchema)
  .stateAction(async ({ parsedInput: profile }) => {
    let session: IronSession<{ address: Address }>

    try {
      // Validate the SIWE session
      session = await getIronSession(cookies(), {
        password: process.env.SESSION_SECRET as string,
        cookieName: 'siwe',
      })

      // Only let users update names for themselves
      if (session.address !== profile.address) {
        throw new Error('Address mismatch')
      }
    } catch (error) {
      return { error: 'Unauthorized. Please sign in again.' }
    }

    // Note: Ownership check will be done on-chain when user submits transaction
    // The blockchain will reject the transaction if user doesn't own the domain

    revalidatePath('/')

    return {
      success: true,
      message: 'Validation passed. Proceed with blockchain transaction.',
    }
  })
