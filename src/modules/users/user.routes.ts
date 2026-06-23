// Шаг 4 — Routes
import { Router } from "express";
import {
  createUserController,
  getUserByIdController,
  getUsersController,
  updateUserByIdController,
} from "./user.contoller.js";
import { validate } from "../../middlewares/validate.js";
import { createUserSchema, updateUserSchema } from "./schema.js";

export const userRouter = Router();

userRouter.get("/", getUsersController);
userRouter.post("/", validate(createUserSchema), createUserController);
userRouter.get("/:id", getUserByIdController);
userRouter.patch("/:id", validate(updateUserSchema), updateUserByIdController);
