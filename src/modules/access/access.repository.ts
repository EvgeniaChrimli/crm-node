import { db } from "../../config/db.js";
import { mapUser } from "../../shared/user.mapper.js";
import { Contact } from "../contacts/contacts.types.js";
import { GetUsersRow, User } from "../users/user.types.js";
import { AccessType, CreateAccess } from "./access.types.js";

export const createAccess = async ({ contact_id, user_id }: CreateAccess) => {
  const text = `
  INSERT INTO contact_access (contact_id, user_id)
  VALUES($1, $2)
  RETURNING *`;
  const values = [contact_id, user_id];
  const result = await db.query<AccessType>(text, values);
  return result.rows[0];
};

export const deleteAccessById = async (
  contact_id: number,
  user_id: number,
): Promise<boolean> => {
  const text = `
    DELETE FROM contact_access
    WHERE user_id = $1
      AND contact_id = $2
  `;

  const result = await db.query(text, [user_id, contact_id]);

  return result.rowCount === 1;
};

export const hasAccess = async (
  userId: number,
  contactId: number,
): Promise<boolean> => {
  const text = `
    SELECT 1
    FROM contact_access
    WHERE user_id = $1
      AND contact_id = $2
  `;

  const result = await db.query(text, [userId, contactId]);
  if (!result.rowCount) return false;
  return result.rowCount > 0;
};

export const getContactsByUserId = async (id: number): Promise<Contact[]> => {
  const text = `
SELECT
    c.*
FROM contacts c
JOIN contact_access ca
    ON ca.contact_id = c.id
WHERE ca.user_id = $1;
`;
  const values = [id];
  const result = await db.query<Contact>(text, values);
  return result.rows;
};
export const getUsersByContactId = async (id: number): Promise<User[]> => {
  const text = `
  SELECT
    u.id,
    u.name,
    u.email,
    u.created_at,
    u.branch_id,

    b.id AS branch_id_join,
    b.name AS branch_name,
    b.phone AS branch_phone

  FROM users u

  JOIN contact_access ca
    ON ca.user_id = u.id

  LEFT JOIN branches b
    ON b.id = u.branch_id

  WHERE ca.contact_id = $1
  `;

  const result = await db.query<GetUsersRow>(text, [id]);

  return result.rows.map(mapUser);
};
