import { NextFunction, Request, Response } from "express";
import z from "zod";
import { ValidationTarget } from "../modules/users/user.types.js";

export const validate =
  <TSchema extends z.ZodTypeAny>(schema: TSchema, target: ValidationTarget) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join(""),
          message: issue.message,
        })),
      });
    }
    req.validated ??= {};
    req.validated[target] = result.data;
    next();
  };
