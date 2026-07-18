import { db } from "../../config/db.js";
import {
  Contact,
  ContactsQueryDto,
  CreateContactBody,
  UpdateContactDto,
} from "./contacts.types.js";

export const getContacts = async ({
  page,
  limit,
  name,
  phone,
  company,
  position,
  order,
  sortBy,
}: ContactsQueryDto): Promise<Contact[]> => {
  const conditions: string[] = [];

  const offset = (page - 1) * limit;

  const values: Array<string | number> = [limit, offset];

  if (name) {
    values.push(`%${name}%`);
    conditions.push(`name ILIKE $${values.length}`);
  }
  if (phone) {
    values.push(`%${phone}%`);
    conditions.push(`phone ILIKE $${values.length}`);
  }
  if (company) {
    values.push(`%${company}%`);
    conditions.push(`company ILIKE $${values.length}`);
  }
  if (position) {
    values.push(`%${position}%`);
    conditions.push(`position ILIKE $${values.length}`);
  }

  let text = `
  SELECT * FROM contacts
  `;

  if (conditions.length > 0) {
    text += " WHERE " + conditions.join(" AND ");
  }
  text += ` ORDER BY ${sortBy} ${order} `;
  text += `
    LIMIT $1
    OFFSET $2
    `;

  const result = await db.query<Contact>(text, values);
  return result.rows;
};

export const createContact = async ({
  name,
  company,
  position,
  phone,
}: CreateContactBody) => {
  const text = `
  INSERT INTO contacts (name, company, position, phone)
  VALUES($1, $2, $3, $4)
  RETURNING *`;

  const values = [name, company, position, phone];
  const result = await db.query<Contact>(text, values);
  return result.rows[0];
};

export const getContactById = async (id: number): Promise<Contact | null> => {
  const text = `
  SELECT * FROM contacts
  WHERE id = $1`;

  const values = [id];
  const result = await db.query<Contact>(text, values);
  return result.rows[0] || null;
};

export const updateContactById = async (
  id: number,
  data: UpdateContactDto,
): Promise<Contact | null> => {
  const text = `UPDATE contacts
    SET name = COALESCE($1, name),
    company = COALESCE($2, company),
    position = COALESCE($3, position),
    phone = COALESCE($4, phone)
    WHERE id = $5 RETURNING *`;
  const values = [data.name, data.company, data.position, data.phone, id];
  const result = await db.query<Contact>(text, values);
  return result.rows[0] || null;
};
