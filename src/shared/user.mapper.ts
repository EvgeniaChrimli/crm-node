import { GetUsersRow } from "./user.types.js";

export const mapUser = (row: GetUsersRow) => ({
  id: row.id,
  name: row.name,
  email: row.email,
  created_at: row.created_at,

  branch: row.branch_id
    ? {
        id: row.branch_id,
        name: row.branch_name,
        phone: row.branch_phone,
        created_at: row.created_at,
      }
    : null,

  //добавим еще вариант
});
