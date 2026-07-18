import { z } from "zod";

export const createContactSchema = z.object({
  name: z.string().min(2, "Name is requered"),
  company: z.string().min(2, "Company is requered"),
  position: z.string().min(2, "Position is requered"),
  phone: z.string().min(2, "Position is requered"),
});

export const updateContactSchema = z.object({
  name: z.string().min(2).optional(),
  company: z.string().optional(),
  position: z.string().optional(),
  phone: z.string().optional(),
});

export const getContactsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),

  sortBy: z
    .enum(["name", "company", "position", "created_at"])
    .default("created_at"),
  order: z.enum(["asc", "desc"]).default("asc"),

  name: z.string().min(1).optional(),
  company: z.string().optional(),
  position: z.string().optional(),
  phone: z.string().optional(),
});
