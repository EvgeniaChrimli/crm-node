// Шаг 2 — Service (логика)
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
} from "./user.repository.js";
import { CreateUserDto, UpdateUserDto, User } from "./user.types.js";

export const fetchUsers = async (): Promise<User[]> => {
  return await getAllUsers();
};

// 1. Проверить существует ли email
// 2. Захешировать пароль
// 3. Создать пользователя
// 4. Отправить письмо
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
