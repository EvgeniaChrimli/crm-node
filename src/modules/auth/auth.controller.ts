import { NextFunction, Request, Response } from "express";
import {
  loginService,
  logoutService,
  refreshService,
  registerService,
} from "./auth.service.js";
import { LoginDto, RegisterDto } from "./auth.types.js";
import {
  clearRefreshTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../../config/cookies.js";
import { ApiError } from "../../errors/api.error.js";
import { errorMessages } from "../../shared/constants/errors.js";
import { getUserByIdService } from "../users/user.service.js";

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.validated?.body as LoginDto;
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

export const refreshController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new ApiError(401, errorMessages.refresh_token_required);
    }

    const result = await refreshService(refreshToken);

    res.cookie("refreshToken", result.refreshToken, refreshTokenCookieOptions);

    return res.status(200).json({
      accessToken: result.accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    await logoutService(refreshToken);

    res.clearCookie("refreshToken", clearRefreshTokenCookieOptions);

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const meController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, errorMessages.unauthorized);
    }

    const user = await getUserByIdService(req.user.userId);

    if (!user) {
      throw new ApiError(404, errorMessages.user_not_found);
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
