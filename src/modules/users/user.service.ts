// Шаг 2 — Service (логика)
import { hashPassword } from "../auth/model/lib/hash.js";
import {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  findUserByEmail,
} from "./user.repository.js";
import {
  CreateUserBody,
  UsersQueryDto,
  UpdateUserDto,
  User,
} from "./user.types.js";

export const fetchUsers = async ({
  limit,
  page,
  name,
  email,
  order,
  sortBy,
}: UsersQueryDto): Promise<User[]> => {
  return await getUsers({ limit, page, name, email, order, sortBy });
};

export const createUserService = async ({
  email,
  name,
  branch_id,
  password,
  role,
}: CreateUserBody): Promise<User> => {
  const password_hash = await hashPassword(password);
  return createUser({ email, name, branch_id, password_hash, role });
};

export const getUserByIdService = async (id: number) => {
  return getUserById(id);
};

export const updateUserByIdService = async (
  id: number,
  data: UpdateUserDto,
) => {
  return updateUserById(id, data);
};

export const getUserByEmailService = async (email: string) => {
  return findUserByEmail(email);
};
