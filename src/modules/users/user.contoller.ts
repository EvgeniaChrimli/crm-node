// Шаг 3 — Controller (HTTP)
import {
  createUserService,
  fetchUsers,
  getUserByIdService,
  updateUserByIdService,
} from "./user.service.js";
import { Request, Response } from "express";
import {
  CreateUserBody,
  CreateUserDto,
  UpdateUserDto,
  User,
} from "./user.types.js";
import { errorMessages } from "../../errors/errors.js";

export const getUsersController = async (
  req: Request<{}, {}, CreateUserBody>,
  res: Response,
) => {
  const users = await fetchUsers();
  return res.json(users);
};

export const createUserController = async (
  req: Request<{}, {}, CreateUserDto>,
  res: Response,
) => {
  const { name, email } = req.body;

  const user = await createUserService({ name, email });
  return res.status(201).json(user);
};

export const getUserByIdController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: errorMessages.invalid_data });
  }
  const user = await getUserByIdService(Number(id));

  if (!user) {
    return res.status(404).json({ message: errorMessages.not_found });
  }

  return res.status(200).json(user);
};

export const updateUserByIdController = async (
  req: Request<{ id: string }, {}, UpdateUserDto>,
  res: Response,
) => {
  const id = Number(req.params.id);
  const data = req.body;

  const user = await updateUserByIdService(id, data);

  if (!user) {
    return res.status(404).json({ message: errorMessages.not_found });
  }

  return res.status(200).json(user);
};
