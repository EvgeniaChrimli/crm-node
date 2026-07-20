export const MEETING_WITH_FULLDATA_SELECT = `
SELECT

m.id,
m.title,
m.description,
m.meeting_at,
m.status,
m.notes,
m.summary,
m.created_at,
m.updated_at,

u.id AS user_id,
u.name AS user_name,
u.email AS user_email,
u.created_at AS user_created_at,

b.id AS branch_id,
b.name AS branch_name,
b.phone AS branch_phone,
b.created_at AS branch_created_at,

c.id AS contact_id,
c.name AS contact_name,
c.phone AS contact_phone,
c.company AS contact_company,
c.position AS contact_position,
c.created_at AS contact_created_at

FROM meetings m

JOIN users u
ON m.user_id = u.id

LEFT JOIN branches b
ON u.branch_id = b.id

JOIN contacts c
ON m.contact_id = c.id
`;
