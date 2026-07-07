import z from "zod";
import {
  createUserSchema,
  paginationSchema,
  updateUserSchema,
} from "./schema.js";

export type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

export type CreateUserBody = z.infer<typeof createUserSchema>;

export type CreateUserDto = z.infer<typeof createUserSchema>;

export type UpdateUserDto = z.infer<typeof updateUserSchema>;

export type PaginationDto = z.infer<typeof paginationSchema>;

export type ValidationTarget = "query" | "body" | "params";

export type IdDto = {
  id: number;
};
