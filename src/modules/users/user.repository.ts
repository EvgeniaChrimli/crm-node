// Шаг 1 — Repository (работа с БД)
import { db } from "../../config/db.js";
import { CreateUserDto, UpdateUserDto, User } from "./user.types.js";

export const getAllUsers = async () => {
  const result = await db.query("SELECT * FROM users");
  return result.rows;
};

export const createUser = async ({ email, name }: CreateUserDto) => {
  const text = `INSERT INTO users (name, email) VALUES($1, $2) RETURNING *`;
  const values = [name, email];
  const result = await db.query<User>(text, values);
  return result.rows[0];
};

export const getUserById = async (id: number): Promise<User | null> => {
  const text = "SELECT * FROM users WHERE id = $1";
  const values = [id];
  const result = await db.query<User>(text, values);
  return result.rows[0] || null;
};

export const updateUserById = async (
  id: number,
  data: UpdateUserDto,
): Promise<User | null> => {
  const text =
    "UPDATE users SET name = COALESCE($1, name), email = COALESCE($2, email) WHERE id = $3 RETURNING *";
  const values = [data.name, data.email, id];
  const result = await db.query<User>(text, values);
  return result.rows[0] || null;
};
