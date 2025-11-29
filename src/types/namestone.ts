import { z } from 'zod'

export const NamestoneProfileSchema = z.object({
  name: z.string().toLowerCase(),
  address: z.string(),
  domain: z.string().optional(), // Optional for backward compatibility
  avatar: z.string().optional(),
  twitter: z.string().optional(),
  telegram: z.string().optional(),
  // Keep old fields for backward compatibility
  text_records: z.record(z.string(), z.string()).optional(),
  coin_types: z.record(z.string(), z.string()).optional(),
})

export type NamestoneProfile = z.infer<typeof NamestoneProfileSchema>
