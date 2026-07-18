// Шаг 1 — Repository (работа с БД)
import { db } from "../../config/db.js";
import { USER_WITH_BRANCH_SELECT } from "./left.join.user.branch.js";
import { mapUser } from "./user.mapper.js";
import {
  CreateUserBody,
  UsersQueryDto,
  UpdateUserDto,
  User,
  GetUsersRow,
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

  let text = USER_WITH_BRANCH_SELECT;
  if (conditions.length > 0) {
    text += " WHERE " + conditions.join(" AND ");
  }
  text += ` ORDER BY ${sortBy} ${order} `;
  text += `
     LIMIT $1
     OFFSET $2
`;

  const result = await db.query<GetUsersRow>(text, values);
  return result.rows.map(mapUser);
};

export const createUser = async ({
  email,
  name,
  branch_id,
}: CreateUserBody) => {
  const text = `
  INSERT INTO users (name, email, branch_id)
  VALUES($1, $2, $3)
  RETURNING *`;
  const values = [name, email, branch_id];
  const result = await db.query<User>(text, values);
  return result.rows[0];
};

export const getUserById = async (id: number): Promise<User | null> => {
  const values: Array<string | number> = [id];
  let text = USER_WITH_BRANCH_SELECT;
  text += `
  WHERE u.id = $1
  `;

  const result = await db.query<GetUsersRow>(text, values);
  if (!result.rows[0]) return null;
  return mapUser(result.rows[0]);
};

export const updateUserById = async (
  id: number,
  data: UpdateUserDto,
): Promise<User | null> => {
  const text = `
    UPDATE users
    SET 
    name = COALESCE($1, name),
    email = COALESCE($2, email),
    branch_id = COALESCE($3, branch_id)
    WHERE id = $4
    RETURNING id`;

  const values = [data.name, data.email, data.branch_id, id];
  const result = await db.query<GetUsersRow>(text, values);
  if (!result.rows[0]) return null;

  return getUserById(result.rows[0].id);
};
