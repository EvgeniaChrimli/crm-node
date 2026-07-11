import z from "zod";
import {
  createUserSchema,
  getUsersQuerySchema,
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

export type GetUsersDto = UsersQueryDto & {
  name?: string;
  email?: string;
};

export type UpdateUserDto = z.infer<typeof updateUserSchema>;

export type UsersQueryDto = z.infer<typeof getUsersQuerySchema>;

export type ValidationTarget = "query" | "body" | "params";

export type IdDto = {
  id: number;
};

export type SortBy = "name" | "email" | "created_at";
export type OrderBy = "asc" | "desc";
