import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/api.error.js";
import { verifyAccessToken } from "../modules/auth/model/lib/jwt.js";
import { AuthPayload } from "../modules/auth/auth.types.js";

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return next(new ApiError(401, "Authorization header is required"));
  }

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer" || !token) {
    return next(new ApiError(401, "Invalid authorization format"));
  }

  try {
    const payload = verifyAccessToken(token);

    if (
      typeof payload !== "object" ||
      payload === null ||
      !("userId" in payload) ||
      !("role" in payload)
    ) {
      return next(new ApiError(401, "Invalid access token"));
    }

    req.user = {
      userId: Number(payload.userId),
      role: payload.role as AuthPayload["role"],
    };

    next();
  } catch {
    return next(new ApiError(401, "Invalid or expired access token"));
  }
};
