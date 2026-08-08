import z from "zod";
import {
  createUserSchema,
  getUsersQuerySchema,
  updateUserSchema,
} from "./schema.js";
import { Branch } from "../branches/branch.types.js";
import { UserRole } from "../auth/auth.types.js";

export type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  branch: Branch | null;
  role: UserRole;
};

export interface CreateUserDb {
  name: string;
  email: string;
  branch_id?: number;
  password_hash: string;
  role: UserRole;
}

export type GetUsersRow = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  password_hash: string;
  role: UserRole;

  branch_id: number | null;
  branch_name: string | null;
  branch_phone: string | null;
  branch_address: string | null;

  //можно добавить другие поля из будущих связей с таблицами
};

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: UserRole;
  branch_id: number | null;
};

export type CreateUserBody = z.infer<typeof createUserSchema>;

export type GetUsersDto = UsersQueryDto;

export type UpdateUserDto = z.infer<typeof updateUserSchema>;

export type UsersQueryDto = z.infer<typeof getUsersQuerySchema>;
