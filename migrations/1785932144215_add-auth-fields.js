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
  pgm.createType("user_role", ["user", "admin"]);
  pgm.addColumns("users", {
    password_hash: {
      type: "text",
      notNull: true,
      default: "",
    },

    role: {
      type: "user_role",
      notNull: true,
      default: "user",
    },

    is_active: {
      type: "boolean",
      notNull: true,
      default: true,
    },

    last_login: {
      type: "timestamptz",
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropType("user_role");
  pgm.dropColumns("users", [
    "password_hash",
    "role",
    "is_active",
    "last_login",
  ]);
};
