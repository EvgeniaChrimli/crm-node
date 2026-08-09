import { Router } from "express";
import {
  loginController,
  logoutController,
  refreshController,
  registerController,
} from "./auth.controller.js";
import { validate } from "../../middlewares/validate.js";
import { loginSchema, registerSchema } from "./schema.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { adminMiddleware } from "../../middlewares/admin.middleware.js";

export const authRouter = Router();

authRouter.post("/login", validate(loginSchema, "body"), loginController);
authRouter.post("/refresh", refreshController);
authRouter.post(
  "/register",
  authMiddleware,
  adminMiddleware,
  validate(registerSchema, "body"),
  registerController,
);
authRouter.post("/logout", logoutController);
