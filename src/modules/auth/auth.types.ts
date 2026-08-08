import z from "zod";
import { registerSchema } from "./schema.js";

export const UserRole = {
  USER: "user",
  ADMIN: "admin",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export type LoginDto = {
  email: string;
  password: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthPayload = {
  userId: number;
  role: UserRole;
};

export type RegisterDto = z.infer<typeof registerSchema>;
