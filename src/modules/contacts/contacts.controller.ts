import { Request, Response } from "express";
import {
  ContactsQueryDto,
  CreateContactBody,
  UpdateContactDto,
} from "./contacts.types.js";
import {
  createContactService,
  fetchContacts,
  getContactByIdService,
  updateContactByIdService,
} from "./contacts.service.js";
import { IdDto } from "../../shared/types/common-types.js";
import { errorMessages } from "../../shared/constants/errors.js";

export const getContactsController = async (
  req: Request<{}, {}>,
  res: Response,
) => {
  const { limit, page, name, company, position, phone, order, sortBy } = req
    .validated?.query as ContactsQueryDto;

  const contacts = await fetchContacts({
    limit,
    page,
    name,
    company,
    position,
    phone,
    order,
    sortBy,
  });
  return res.json(contacts);
};

export const createContactController = async (
  req: Request<{}, {}, CreateContactBody>,
  res: Response,
) => {
  const { name, company, position, phone } = req.validated
    ?.body as CreateContactBody;

  const contact = await createContactService({
    name,
    company,
    position,
    phone,
  });
  return res.status(201).json(contact);
};

export const getContactByIdController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.validated?.params as IdDto;
  const contact = await getContactByIdService(id);

  if (!contact) {
    return res.status(404).json({ message: errorMessages.not_found });
  }

  return res.status(200).json(contact);
};

export const updateContactByIdController = async (
  req: Request<{ id: string }, {}, UpdateContactDto>,
  res: Response,
) => {
  const { id } = req.validated?.params as IdDto;
  const data = req.validated?.body as UpdateContactDto;

  const contact = await updateContactByIdService(id, data);

  if (!contact) {
    return res.status(404).json({ message: errorMessages.not_found });
  }

  return res.status(200).json(contact);
};
