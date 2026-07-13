import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/api.error.js";
import { errorMessages } from "../shared/constants/errors.js";
import { isPostrgesErr } from "../utils/isPostgresError.js";

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }
  if (isPostrgesErr(err)) {
    switch (err.code) {
      case "23505":
        return res.status(409).json({
          message: errorMessages.resource_exist,
        });

      case "23503":
        return res.status(400).json({
          message: errorMessages.branch_not_exist,
        });

      default:
        return res.status(400).json({
          message: errorMessages.data_error,
        });
    }
  }
  return res.status(500).json({ message: errorMessages.server_error });
};
