/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createType("meeting_status", ["planned", "completed", "cancelled"]);
  pgm.createTable("meetings", {
    id: {
      type: "serial",
      primaryKey: true,
    },

    user_id: {
      type: "integer",
      notNull: true,
      references: "users(id)",
      onDelete: "CASCADE",
    },

    contact_id: {
      type: "integer",
      notNull: true,
      references: "contacts(id)",
      onDelete: "CASCADE",
    },

    title: {
      type: "text",
      notNull: true,
    },

    description: {
      type: "text",
    },

    meeting_at: {
      type: "timestamptz",
      notNull: true,
    },

    status: {
      type: "meeting_status",
      notNull: true,
      default: "planned",
    },

    notes: {
      type: "text",
    },

    summary: {
      type: "text",
    },

    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("now()"),
    },

    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("now()"),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("meetings");
  pgm.dropType("meeting_status");
};
