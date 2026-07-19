export const USER_WITH_BRANCH_SELECT = `
  SELECT
  u.id,
  u.name,
  u.email,
  u.created_at,
  u.branch_id,

  b.id AS branch_id_join,
  b.name AS branch_name,
  b.phone AS branch_phone,
  b.created_at AS branch_created_at

  FROM users u
  LEFT JOIN branches b
  ON u.branch_id = b.id
  `;
