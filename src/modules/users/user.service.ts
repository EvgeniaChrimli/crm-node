// Шаг 2 — Service (логика)
import {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
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
}: CreateUserBody): Promise<User> => {
  return createUser({ email, name, branch_id });
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
