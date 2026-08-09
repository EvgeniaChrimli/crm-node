import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/api.error.js";
import { UserRole } from "../modules/auth/auth.types.js";
import { errorMessages } from "../shared/constants/errors.js";

export const adminMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    return next(new ApiError(401, errorMessages.authentication_required));
  }

  if (req.user.role !== UserRole.ADMIN) {
    return next(new ApiError(403, errorMessages.admin_access_required));
  }

  next();
};

// Здесь принципиально важно, что мы не проверяем JWT повторно.

// authMiddleware уже сделал:

// Authorization header
//         ↓
// Bearer token
//         ↓
// verifyAccessToken()
//         ↓
// req.user = {
//     userId,
//     role
// }
