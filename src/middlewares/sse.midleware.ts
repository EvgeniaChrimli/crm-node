import { NextFunction, Request, Response } from "express";
import { errorMessages } from "../shared/constants/errors.js";
import { ApiError } from "../errors/api.error.js";
import { consumeSseTicket } from "../modules/sse/sse-ticket.service.js";

export const sseAuthMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const ticket = req.query.ticket;

  if (typeof ticket !== "string" || !ticket) {
    return next(new ApiError(401, errorMessages.sse_ticket_required));
  }

  const session = consumeSseTicket(ticket);

  if (!session) {
    return next(new ApiError(401, errorMessages.invalid_sse_ticket));
  }

  req.user = {
    userId: session.userId,
    role: session.role,
  };

  next();
};
