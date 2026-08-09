import { NextFunction, Request, Response } from "express";
import { loginService, registerService } from "./auth.service.js";
import { RegisterDto } from "./auth.types.js";

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await loginService(email, password);

  res.status(200).json(result);
};

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await registerService(req.validated?.body as RegisterDto);

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
