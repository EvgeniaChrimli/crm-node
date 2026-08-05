import { ApiError } from "../../errors/api.error.js";
import { sendMeetingCreated } from "../../integrations/n8n/n8n.service.js";
import { hasAccess } from "../access/access.repository.js";
import { getContactById } from "../contacts/contacts.repository.js";
import { SseEvents } from "../sse/events.js";
import { sseService } from "../sse/sse.service.js";
import { getUserById } from "../users/user.repository.js";
import {
  createMeeting,
  getMeetingById,
  getMeetings,
  updateMeetingById,
} from "./meetings.repository.js";
import {
  CreateMeetingBody,
  Meeting,
  MeetingsQueryDto,
  UpdateMeetingDto,
} from "./meetings.types.js";

export const fetchMeetings = async ({
  page,
  limit,
  sortBy,
  order,
  status,
  user_id,
  contact_id,
  branch_id,
}: MeetingsQueryDto): Promise<Meeting[]> => {
  return await getMeetings({
    page,
    limit,
    sortBy,
    order,
    status,
    user_id,
    contact_id,
    branch_id,
  });
};

export const createMeetingService = async (
  dto: CreateMeetingBody,
): Promise<Meeting> => {
  const user = await getUserById(dto.user_id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const contact = await getContactById(dto.contact_id);

  if (!contact) {
    throw new ApiError(404, "Contact not found");
  }

  const access = await hasAccess(dto.user_id, dto.contact_id);

  if (!access) {
    throw new ApiError(403, "User has no access to this contact");
  }

  const meeting = await createMeeting(dto);

  await sendMeetingCreated(meeting);

  sseService.send(SseEvents.MeetingCreated, meeting);
  return meeting;
};

export const getMeetingByIdService = async (id: number) => {
  return getMeetingById(id);
};

export const updateMeetingByIdService = async (
  id: number,
  data: UpdateMeetingDto,
) => {
  const meeting = await updateMeetingById(id, data);

  if (meeting) {
    sseService.send(SseEvents.MeetingUpdated, meeting);
  }

  return meeting;
};
