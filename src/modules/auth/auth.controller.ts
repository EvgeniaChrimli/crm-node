import { NextFunction, Request, Response } from "express";
import { loginService, registerService } from "./auth.service.js";
import { RegisterDto } from "./auth.types.js";
import { refreshTokenCookieOptions } from "../../config/cookies.js";

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const result = await loginService(email, password);
    res.cookie("refreshToken", result.refreshToken, refreshTokenCookieOptions);
    res.status(200).json({
      accessToken: result.accessToken,
    });
  } catch (error) {
    next(error);
  }
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
