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

export const meetingRoter = Router();

meetingRoter.get(
  "/",
  validate(getMeetingsQuerySchema, "query"),
  getMeetingsController,
);
meetingRoter.post(
  "/",
  validate(createMeetingSchema, "body"),
  createMeetingController,
);
meetingRoter.get(
  "/:id",
  validate(idSchema, "params"),
  getMeetingByIdController,
);
meetingRoter.patch(
  "/:id",
  validate(idSchema, "params"),
  validate(updateMeetingSchema, "body"),
  updateMeetingByIdController,
);
