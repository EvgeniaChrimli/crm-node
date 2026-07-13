import { z } from "zod";

export const createBranchSchema = z.object({
  name: z.string().min(2, "Name must contain at least 2 characters"),
  phone: z.string().optional(),
});

export const updateBranchSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
});

export const getBranchesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),

  sortBy: z.enum(["name", "created_at"]).default("created_at"),
  order: z.enum(["asc", "desc"]).default("asc"),

  name: z.string().min(1).optional(),
  phone: z.string().min(1).optional(),
});
