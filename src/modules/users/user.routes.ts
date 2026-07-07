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
  idSchema,
  updateUserSchema,
} from "./schema.js";

export const userRouter = Router();

userRouter.get("/", validate(getUsersQuerySchema, "query"), getUsersController);
userRouter.post("/", validate(createUserSchema, "body"), createUserController);
userRouter.get("/:id", getUserByIdController);
userRouter.patch(
  "/:id",
  validate(updateUserSchema, "body"),
  validate(idSchema, "params"),
  updateUserByIdController,
);
