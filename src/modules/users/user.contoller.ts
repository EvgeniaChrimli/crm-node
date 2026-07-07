// Шаг 3 — Controller (HTTP)
import {
  createUserService,
  fetchUsers,
  getUserByIdService,
  updateUserByIdService,
} from "./user.service.js";
import { Request, Response } from "express";
import {
  CreateUserDto,
  IdDto,
  UsersQueryDto,
  UpdateUserDto,
  User,
} from "./user.types.js";
import { errorMessages } from "../../errors/errors.js";

export const getUsersController = async (
  req: Request<{}, {}>,
  res: Response,
) => {
  const { limit, page, name, email } = req.validated?.query as UsersQueryDto;

  const users = await fetchUsers({ limit, page, name, email });
  return res.json(users);
};

export const createUserController = async (
  req: Request<{}, {}, CreateUserDto>,
  res: Response,
) => {
  const { name, email } = req.validated?.body as CreateUserDto;

  const user = await createUserService({ name, email });
  return res.status(201).json(user);
};

export const getUserByIdController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.validated?.params as IdDto;
  const user = await getUserByIdService(id);

  if (!user) {
    return res.status(404).json({ message: errorMessages.not_found });
  }

  return res.status(200).json(user);
};

export const updateUserByIdController = async (
  req: Request<{ id: string }, {}, UpdateUserDto>,
  res: Response,
) => {
  const { id } = req.validated?.params as IdDto;
  const data = req.validated?.body as UpdateUserDto;

  const user = await updateUserByIdService(id, data);

  if (!user) {
    return res.status(404).json({ message: errorMessages.not_found });
  }

  return res.status(200).json(user);
};
