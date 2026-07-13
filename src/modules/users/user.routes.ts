// Шаг 4 — Routes
import { Router } from "express";
import {
  createUserController,
  getUserByIdController,
  getUsersController,
  updateUserByIdController,
} from "./user.contoller.js";
import { validate } from "../../middlewares/validate.js";
import {
  createUserSchema,
  getUsersQuerySchema,
  updateUserSchema,
} from "./schema.js";
import { idSchema } from "../../shared/schemas/common-schemas.js";

export const userRouter = Router();

userRouter.get("/", validate(getUsersQuerySchema, "query"), getUsersController);
userRouter.post("/", validate(createUserSchema, "body"), createUserController);
userRouter.get("/:id", validate(idSchema, "params"), getUserByIdController);
userRouter.patch(
  "/:id",
  validate(idSchema, "params"),
  validate(updateUserSchema, "body"),
  updateUserByIdController,
);
