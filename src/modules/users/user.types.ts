import z from "zod";
import { createUserSchema } from "./schema.js";

export type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

export type CreateUserBody = {
  name: string;
  email: string;
};

export type CreateUserDto = z.infer<typeof createUserSchema>;

export type UpdateUserDto = {
  email?: string;
  name?: string;
};
