// Шаг 2 — Service (логика)
import {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
} from "./user.repository.js";
import {
  CreateUserDto,
  IdDto,
  PaginationDto,
  UpdateUserDto,
  User,
} from "./user.types.js";

export const fetchUsers = async ({
  limit,
  page,
}: PaginationDto): Promise<User[]> => {
  return await getUsers({ limit, page });
};

export const createUserService = async ({
  email,
  name,
}: CreateUserDto): Promise<User> => {
  return createUser({ email, name });
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
