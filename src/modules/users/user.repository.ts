// Шаг 1 — Repository (работа с БД)
import { db } from "../../config/db.js";
import { mapUser } from "../../shared/user.mapper.js";
import { USER_WITH_BRANCH_SELECT } from "./selects.js";
import {
  UsersQueryDto,
  UpdateUserDto,
  User,
  GetUsersRow,
  CreateUserDb,
  AuthUser,
} from "./user.types.js";

export const getUsers = async ({
  page,
  limit,
  name,
  email,
  order,
  sortBy,
  branch,
  role,
}: UsersQueryDto): Promise<User[]> => {
  const conditions: string[] = [];

  const offset = (page - 1) * limit;
  const values: Array<string | number> = [limit, offset];

  const addCondition = (column: string, value?: string) => {
    if (!value) return;
    values.push(`%${value}%`);
    conditions.push(`${column} ILIKE $${values.length}`);
  };

  addCondition("u.name", name);
  addCondition("u.email", email);
  addCondition("b.name", branch);
  addCondition("u.role", role);

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
  password_hash,
  role,
}: CreateUserDb) => {
  const text = `
  INSERT INTO users (name, email, branch_id, password_hash, role)
  VALUES($1, $2, $3, $4, $5)
  RETURNING *`;
  const values = [name, email, branch_id, password_hash, role];
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

//для авторизации нужно найти пользователя по email
export const findUserByEmail = async (
  email: string,
): Promise<AuthUser | null> => {
  const text = `
    SELECT id, email, password_hash, role 
    FROM users
    WHERE email = $1 
    `;
  const result = await db.query<AuthUser>(text, [email]);
  return result.rows[0] ?? null;
};
