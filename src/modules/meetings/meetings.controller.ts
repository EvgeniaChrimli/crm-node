import { Request, Response } from "express";
import {
  CreateMeetingBody,
  MeetingsQueryDto,
  UpdateMeetingDto,
} from "./meetings.types.js";
import {
  createMeetingService,
  fetchMeetings,
  getMeetingByIdService,
  updateMeetingByIdService,
} from "./meetings.service.js";
import { IdDto } from "../../shared/types/common-types.js";
import { errorMessages } from "../../shared/constants/errors.js";

export const getMeetingsController = async (
  req: Request<{}, {}>,
  res: Response,
) => {
  const { page, limit, sortBy, order, status, user_id, contact_id, branch_id } =
    req.validated?.query as MeetingsQueryDto;

  const meetings = await fetchMeetings({
    page,
    limit,
    sortBy,
    order,
    status,
    user_id,
    contact_id,
    branch_id,
  });
  return res.json(meetings);
};

export const createMeetingController = async (
  req: Request<{}, {}, CreateMeetingBody>,
  res: Response,
) => {
  const { user_id, contact_id, title, meeting_at, description, status } = req
    .validated?.body as CreateMeetingBody;

  const meeting = await createMeetingService({
    user_id,
    contact_id,
    title,
    meeting_at,
    description,
    status,
  });
  return res.status(201).json(meeting);
};

export const getMeetingByIdController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.validated?.params as IdDto;
  const meeting = await getMeetingByIdService(id);

  if (!meeting) {
    return res.status(404).json({ message: errorMessages.not_found });
  }

  return res.status(200).json(meeting);
};

export const updateMeetingByIdController = async (
  req: Request<{ id: string }, {}, UpdateMeetingDto>,
  res: Response,
) => {
  const { id } = req.validated?.params as IdDto;
  const data = req.validated?.body as UpdateMeetingDto;

  const meeting = await updateMeetingByIdService(id, data);

  if (!meeting) {
    return res.status(404).json({ message: errorMessages.not_found });
  }

  return res.status(200).json(meeting);
};
