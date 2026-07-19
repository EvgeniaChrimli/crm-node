import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { idSchema } from "../../shared/schemas/common-schemas.js";
import { accessSchema } from "./schema.js";
import {
  createAccessController,
  deleteAccessController,
  getContactsByUserIdController,
  getUsersByContactIdController,
} from "./access.controller.js";

export const accessRouter = Router();

accessRouter.post("/", validate(accessSchema, "body"), createAccessController);
accessRouter.delete(
  "/",
  validate(accessSchema, "body"),
  deleteAccessController,
);
accessRouter.get(
  "/users/:id/contacts",
  validate(idSchema, "params"),
  getContactsByUserIdController,
);

accessRouter.get(
  "/contacts/:id/users",
  validate(idSchema, "params"),
  getUsersByContactIdController,
);
