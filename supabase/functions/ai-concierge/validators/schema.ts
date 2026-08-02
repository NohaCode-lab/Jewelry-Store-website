import { z } from 'https://deno.land/x/zod@v3.21.4/mod.ts';

export const ConciergeRequestSchema = z.object({
  occasion: z.string().min(2),
  recipient: z.string().min(2),
  stylePreference: z.string().min(2),
  maxBudget: z.number().positive(),
  customNotes: z.string().optional(),
});

export type ConciergeRequestInput = z.infer<typeof ConciergeRequestSchema>;
