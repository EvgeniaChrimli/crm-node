import { Request, Response } from "express";
import { loginService } from "./auth.service.js";

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await loginService(email, password);

  res.status(200).json(result);
};
