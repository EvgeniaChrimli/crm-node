// Шаг 4 — Routes
import { Router } from "express";
import {
  createUserController,
  getUserByIdController,
  getUsersController,
  updateUserByIdController,
} from "./user.contoller.js";

export const userRouter = Router();

userRouter.get("/", getUsersController);
userRouter.post("/", createUserController);
userRouter.get("/:id", getUserByIdController);
userRouter.patch("/:id", updateUserByIdController);
