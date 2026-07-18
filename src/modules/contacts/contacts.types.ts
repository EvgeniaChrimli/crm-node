import z from "zod";
import {
  createContactSchema,
  getContactsQuerySchema,
  updateContactSchema,
} from "./schema.js";

export type Contact = {
  id: number;
  name: string;
  phone: string | null;
  company: string | null;
  position: string | null;
  created_at: string;
};

export type CreateContactBody = z.infer<typeof createContactSchema>;

export type GetContactsDto = ContactsQueryDto;

export type UpdateContactDto = z.infer<typeof updateContactSchema>;

export type ContactsQueryDto = z.infer<typeof getContactsQuerySchema>;
