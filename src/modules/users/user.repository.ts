// Шаг 1 — Repository (работа с БД)
import { db } from "../../config/db.js";
import {
  CreateUserBody,
  UsersQueryDto,
  UpdateUserDto,
  User,
} from "./user.types.js";

export const getUsers = async ({
  page,
  limit,
  name,
  email,
  order,
  sortBy,
}: UsersQueryDto): Promise<User[]> => {
  const conditions: string[] = [];

  const offset = (page - 1) * limit;

  const values: Array<string | number> = [limit, offset];
  if (name) {
    values.push(`%${name}%`);
    conditions.push(`name ILIKE $${values.length}`);
  }
  if (email) {
    values.push(`%${email}%`);
    conditions.push(`email ILIKE $${values.length}`);
  }

  let text = `
  SELECT * FROM users
  `;

  if (conditions.length > 0) {
    text += " WHERE " + conditions.join(" AND ");
  }
  text += ` ORDER BY ${sortBy} ${order} `;
  text += `
     LIMIT $1
     OFFSET $2
`;

  const result = await db.query<User>(text, values);
  return result.rows;
};

export const createUser = async ({ email, name }: CreateUserBody) => {
  const text = `
  INSERT INTO users (name, email)
  VALUES($1, $2)
  RETURNING *`;
  const values = [name, email];
  const result = await db.query<User>(text, values);
  return result.rows[0];
};

export const getUserById = async (id: number): Promise<User | null> => {
  const text = `
  SELECT * FROM users
  WHERE id = $1`;
  const values = [id];
  const result = await db.query<User>(text, values);
  return result.rows[0] || null;
};

export const updateUserById = async (
  id: number,
  data: UpdateUserDto,
): Promise<User | null> => {
  const text = `UPDATE users
    SET name = COALESCE($1, name),
    email = COALESCE($2, email)
    WHERE id = $3 RETURNING *`;
  const values = [data.name, data.email, id];
  const result = await db.query<User>(text, values);
  return result.rows[0] || null;
};
