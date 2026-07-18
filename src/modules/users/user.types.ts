import z from "zod";
import {
  createUserSchema,
  getUsersQuerySchema,
  updateUserSchema,
} from "./schema.js";
import { Branch } from "../branches/branch.types.js";

export type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  branch: Branch | null;
};

export type GetUsersRow = {
  id: number;
  name: string;
  email: string;
  created_at: string;

  branch_id: number | null;
  branch_name: string | null;
  branch_phone: string | null;
  branch_address: string | null;

  //можно добавить другие поля из будущих связей с таблицами
};

export type CreateUserBody = z.infer<typeof createUserSchema>;

export type GetUsersDto = UsersQueryDto;

export type UpdateUserDto = z.infer<typeof updateUserSchema>;

export type UsersQueryDto = z.infer<typeof getUsersQuerySchema>;
