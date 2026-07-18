import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { idSchema } from "../../shared/schemas/common-schemas.js";
import {
  createContactSchema,
  getContactsQuerySchema,
  updateContactSchema,
} from "./schema.js";
import {
  createContactController,
  getContactByIdController,
  getContactsController,
  updateContactByIdController,
} from "./contacts.controller.js";

export const contactRouter = Router();

contactRouter.get(
  "/",
  validate(getContactsQuerySchema, "query"),
  getContactsController,
);
contactRouter.post(
  "/",
  validate(createContactSchema, "body"),
  createContactController,
);
contactRouter.get(
  "/:id",
  validate(idSchema, "params"),
  getContactByIdController,
);
contactRouter.patch(
  "/:id",
  validate(idSchema, "params"),
  validate(updateContactSchema, "body"),
  updateContactByIdController,
);
