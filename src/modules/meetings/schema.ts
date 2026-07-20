import { z } from "zod";

export const meetingStatusSchema = z.enum([
  "planned",
  "completed",
  "cancelled",
]);

export const createMeetingSchema = z.object({
  user_id: z.number().int().positive(),
  contact_id: z.number().int().positive(),
  title: z.string().trim().min(1).max(200),

  description: z.string().trim().max(2000).optional(),

  meeting_at: z.iso.datetime(),
  status: meetingStatusSchema.optional(),
});

export const updateMeetingSchema = z.object({
  title: z.string().trim().min(1).max(200).optional(),
  description: z.string().trim().max(2000).optional(),
  meeting_at: z.iso.datetime().optional(),
  status: meetingStatusSchema.optional(),
  notes: z.string().trim().max(10000).optional(),
  summary: z.string().trim().max(10000).optional(),
  user_id: z.number().int().positive().optional(),
  contact_id: z.number().int().positive().optional(),
});

export const getMeetingsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),

  sortBy: z.enum(["status", "meeting_at", "created_at"]).default("meeting_at"),
  order: z.enum(["asc", "desc"]).default("asc"),

  status: meetingStatusSchema.optional(),
  user_id: z.coerce.number().int().positive().optional(),
  contact_id: z.coerce.number().int().positive().optional(),

  branch_id: z.coerce.number().int().positive().optional(),
});
