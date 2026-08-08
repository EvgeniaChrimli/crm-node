import { z } from "zod";
import { UserRole } from "../auth/auth.types.js";

export const createUserSchema = z.object({
  name: z.string().min(2, "Name must contain at least 2 characters"),
  email: z.email("Invalid email"),
  branch_id: z.number().int().positive().optional(),
  password: z.string().min(8),
  role: z.enum([UserRole.USER, UserRole.ADMIN]).default(UserRole.USER),
});

export const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.email().optional(),
  branch_id: z.number().int().positive().optional(),
});

export const getUsersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),

  sortBy: z.enum(["name", "email", "created_at"]).default("created_at"),
  order: z.enum(["asc", "desc"]).default("asc"),

  name: z.string().min(1).optional(),
  email: z.string().min(1).optional(),

  branch: z.string().min(1).optional(),
  role: z
    .enum([UserRole.USER, UserRole.ADMIN])
    .default(UserRole.USER)
    .optional(),
});
