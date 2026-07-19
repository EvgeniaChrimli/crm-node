import z from "zod";
import { accessSchema } from "./schema.js";

export type AccessType = {
  user_id: number;
  contact_id: number;
  created_at: string;
};

export type CreateAccess = z.infer<typeof accessSchema>;
