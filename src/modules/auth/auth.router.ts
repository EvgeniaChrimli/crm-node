import { Router } from "express";
import { loginController, registerController } from "./auth.controller.js";
import { validate } from "../../middlewares/validate.js";
import { loginSchema, registerSchema } from "./schema.js";

export const authRouter = Router();

authRouter.post("/login", validate(loginSchema, "body"), loginController);
authRouter.post(
  "/register",
  validate(registerSchema, "body"),
  registerController,
);
