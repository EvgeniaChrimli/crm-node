import z from "zod";
import {
  createMeetingSchema,
  getMeetingsQuerySchema,
  meetingStatusSchema,
  updateMeetingSchema,
} from "./schema.js";
import { User } from "../users/user.types.js";
import { Contact } from "../contacts/contacts.types.js";

export type MeetingRow = {
  id: number;
  user_id: number;
  contact_id: number;
  title: string;
  description: string | null;
  meeting_at: string;
  status: MeetingStatus;
  notes: string | null;
  summary: string | null;
  created_at: string;
  updated_at: string;
}; //что реально в бд

export type Meeting = {
  id: number;
  title: string;
  description: string | null;
  meeting_at: string;
  status: MeetingStatus;
  notes: string | null;
  summary: string | null;
  created_at: string;
  updated_at: string;
  user: User;
  contact: Contact;
}; // что вернуть во встрече на фронт

export type GetMeetingsRow = {
  // meeting
  id: number;
  title: string;
  description: string | null;
  meeting_at: string;
  status: MeetingStatus;
  notes: string | null;
  summary: string | null;
  created_at: string;
  updated_at: string;

  // user
  user_id: number;
  user_name: string;
  user_email: string;
  user_created_at: string;

  // branch
  branch_id: number | null;
  branch_name: string | null;
  branch_phone: string | null;
  branch_created_at: string | null;

  // contact
  contact_id: number;
  contact_name: string;
  contact_phone: string;
  contact_company: string;
  contact_position: string;
  contact_created_at: string;
};

export type CreateMeetingBody = z.infer<typeof createMeetingSchema>;

export type MeetingStatus = z.infer<typeof meetingStatusSchema>;

export type UpdateMeetingDto = z.infer<typeof updateMeetingSchema>;

export type MeetingsQueryDto = z.infer<typeof getMeetingsQuerySchema>;
