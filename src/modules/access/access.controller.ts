import { Request, Response } from "express";
import { CreateAccess } from "./access.types.js";
import {
  addAccess,
  deleteAccess,
  getContactsByUserIdService,
  getUsersByContactIdService,
} from "./access.service.js";
import { Contact } from "../contacts/contacts.types.js";
import { IdDto } from "../../shared/types/common-types.js";
import { User } from "../users/user.types.js";

export const createAccessController = async (
  req: Request<{}, {}, CreateAccess>,
  res: Response,
) => {
  const { user_id, contact_id } = req.validated?.body as CreateAccess;

  const access = await addAccess({ user_id, contact_id });
  return res.status(201).json(access);
};

export const deleteAccessController = async (
  req: Request<{}, {}, CreateAccess>,
  res: Response,
) => {
  const dto = req.validated?.body as CreateAccess;

  await deleteAccess(dto);

  return res.sendStatus(204);
};

export const getContactsByUserIdController = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.validated?.params as IdDto;
  const contacts = await getContactsByUserIdService(id);
  return res.status(201).json(contacts);
};

export const getUsersByContactIdController = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.validated?.params as IdDto;
  const users = await getUsersByContactIdService(id);
  return res.status(201).json(users);
};
