import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2, "Name must contain at least 2 characters"),
  email: z.email("Invalid email"),
});

export const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.email().optional(),
});

export const getUsersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),

  sortBy: z.enum(["name", "email", "created_at"]).default("created_at"),
  order: z.enum(["asc", "desc"]).default("asc"),

  name: z.string().min(1).optional(),
  email: z.string().min(1).optional(),
});

export const idSchema = z.object({
  id: z.coerce.number().int().positive(),
});
