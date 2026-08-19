import { Router } from "express";

import { validate } from "../../middlewares/validate.js";

import { idSchema } from "../../shared/schemas/common-schemas.js";
import {
  createMeetingSchema,
  getMeetingsQuerySchema,
  updateMeetingSchema,
} from "./schema.js";
import {
  createMeetingController,
  getMeetingByIdController,
  getMeetingsController,
  updateMeetingByIdController,
} from "./meetings.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

export const meetingRoter = Router();

meetingRoter.get(
  "/",
  authMiddleware,
  validate(getMeetingsQuerySchema, "query"),
  getMeetingsController,
);
meetingRoter.post(
  "/",
  authMiddleware,
  validate(createMeetingSchema, "body"),
  createMeetingController,
);
meetingRoter.get(
  "/:id",
  authMiddleware,
  validate(idSchema, "params"),
  getMeetingByIdController,
);
meetingRoter.patch(
  "/:id",
  authMiddleware,
  validate(idSchema, "params"),
  validate(updateMeetingSchema, "body"),
  updateMeetingByIdController,
);
