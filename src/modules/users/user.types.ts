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

export type GetUsersDto = UsersQueryDto;

export type UpdateUserDto = z.infer<typeof updateUserSchema>;

export type UsersQueryDto = z.infer<typeof getUsersQuerySchema>;
