import { db } from "../../config/db.js";
import {
  Branch,
  BranchesQueryDto,
  CreateBranchBody,
  UpdateBranchDto,
} from "./branch.types.js";

export const getBranches = async ({
  page,
  limit,
  sortBy,
  order,
  name,
  phone,
}: BranchesQueryDto) => {
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

  let text = `
  SELECT * FROM branches
  `;

  if (conditions.length > 0) {
    text += " WHERE " + conditions.join(" AND ");
  }
  text += ` ORDER BY ${sortBy} ${order} `;
  text += `
    LIMIT $1
    OFFSET $2
`;

  const result = await db.query<Branch>(text, values);
  return result.rows;
};

export const createBranch = async ({ name, phone }: CreateBranchBody) => {
  const text = `
  INSERT INTO branches (name, phone)
  VALUES($1, $2)
  RETURNING *`;

  const values = [name, phone];
  const result = await db.query<Branch>(text, values);
  return result.rows[0];
};

export const getBranchById = async (id: number): Promise<Branch | null> => {
  const text = `
  SELECT * FROM branches
  WHERE id = $1`;
  const values = [id];
  const result = await db.query<Branch>(text, values);
  return result.rows[0] || null;
};

export const updateBranchById = async (
  id: number,
  data: UpdateBranchDto,
): Promise<Branch | null> => {
  const text = `UPDATE branches
    SET name = COALESCE($1, name),
    phone = COALESCE($2, phone)
    WHERE id = $3 RETURNING *`;

  const values = [data.name, data.phone, id];
  const result = await db.query<Branch>(text, values);
  return result.rows[0] || null;
};
