import { z } from "zod";

export const accessSchema = z.object({
  user_id: z.number().int().positive(),
  contact_id: z.number().int().positive(),
});
