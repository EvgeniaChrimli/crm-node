import { db } from "../../config/db.js";
import { mapMeeting } from "./meeting.mapper.js";
import {
  CreateMeetingBody,
  GetMeetingsRow,
  Meeting,
  MeetingsQueryDto,
  UpdateMeetingDto,
} from "./meetings.types.js";
import { MEETING_WITH_FULLDATA_SELECT } from "./select.js";

export const getMeetings = async ({
  page,
  limit,
  order,
  sortBy,
  status,
  user_id,
  contact_id,
  branch_id,
}: MeetingsQueryDto): Promise<Meeting[]> => {
  const conditions: string[] = [];

  const offset = (page - 1) * limit;
  const values: Array<string | number> = [limit, offset];
  let text = MEETING_WITH_FULLDATA_SELECT;

  if (status) {
    values.push(status);
    conditions.push(`m.status = $${values.length}`);
  }

  if (user_id) {
    values.push(user_id);
    conditions.push(`m.user_id = $${values.length}`);
  }

  if (contact_id) {
    values.push(contact_id);
    conditions.push(`m.contact_id = $${values.length}`);
  }

  if (branch_id) {
    values.push(branch_id);
    conditions.push(`u.branch_id = $${values.length}`);
  }

  if (conditions.length > 0) {
    text += " WHERE " + conditions.join(" AND ");
  }
  text += ` ORDER BY ${sortBy} ${order} `;
  text += `
     LIMIT $1
     OFFSET $2
`;

  const result = await db.query<GetMeetingsRow>(text, values);
  return result.rows.map(mapMeeting);
};

export const createMeeting = async ({
  user_id,
  contact_id,
  title,
  meeting_at,
  description,
  status,
}: CreateMeetingBody) => {
  const text = `
  INSERT INTO meetings (user_id,
  contact_id,
  title,
  meeting_at,
  description,
  status)
  VALUES($1, $2, $3, $4, $5, $6)
  RETURNING id`;
  const values = [user_id, contact_id, title, meeting_at, description, status];
  //   const result = await db.query<GetMeetingsRow>(text, values);
  //   return result.rows[0].id;
  const result = await db.query<{ id: number }>(text, values);

  return (await getMeetingById(result.rows[0].id))!;
};

export const getMeetingById = async (id: number): Promise<Meeting | null> => {
  const values: Array<string | number> = [id];
  let text = MEETING_WITH_FULLDATA_SELECT;
  text += `
  WHERE m.id = $1
  `;

  const result = await db.query<GetMeetingsRow>(text, values);
  if (!result.rows[0]) return null;
  return mapMeeting(result.rows[0]);
};

export const updateMeetingById = async (
  id: number,
  data: UpdateMeetingDto,
): Promise<Meeting | null> => {
  const text = `
    UPDATE meetings
    SET 
    title = COALESCE($1, title),
    description = COALESCE($2, description),
    meeting_at = COALESCE($3, meeting_at),
    status = COALESCE($4, status),
    notes = COALESCE($5, notes),
    summary = COALESCE($6, summary),
    user_id = COALESCE($7, user_id),
    contact_id = COALESCE($8, contact_id)

    WHERE id = $9
    RETURNING id`;

  const values = [
    data.title,
    data.description,
    data.meeting_at,
    data.status,
    data.notes,
    data.summary,
    data.user_id,
    data.contact_id,
    id,
  ];
  const result = await db.query<GetMeetingsRow>(text, values);
  if (!result.rows[0]) return null;

  return getMeetingById(result.rows[0].id);
};
