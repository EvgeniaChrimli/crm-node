import { GetMeetingsRow, Meeting } from "./meetings.types.js";

export const mapMeeting = (row: GetMeetingsRow): Meeting => ({
  id: row.id,
  title: row.title,
  description: row.description,
  meeting_at: row.meeting_at,
  status: row.status,
  notes: row.notes,
  summary: row.summary,
  created_at: row.created_at,
  updated_at: row.updated_at,

  user: {
    id: row.user_id,
    name: row.user_name,
    email: row.user_email,
    created_at: row.user_created_at,

    branch: row.branch_id
      ? {
          id: row.branch_id,
          name: row.branch_name!,
          phone: row.branch_phone,
          created_at: row.branch_created_at!,
        }
      : null,
  },

  contact: {
    id: row.contact_id,
    name: row.contact_name,
    phone: row.contact_phone,
    company: row.contact_company,
    position: row.contact_position,
    created_at: row.contact_created_at,
  },
});
