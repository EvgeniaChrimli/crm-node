import { db } from "../../config/db.js";
import { hashRefreshToken } from "./model/lib/hash.js";

export const saveRefreshToken = async (
  userId: number,
  token: string,
  expiresAt: Date,
): Promise<void> => {
  const tokenHash = hashRefreshToken(token);

  const text = `
    INSERT INTO refresh_tokens (
      user_id,
      token_hash,
      expires_at
    )
    VALUES ($1, $2, $3);
  `;

  await db.query(text, [userId, tokenHash, expiresAt]);
};

export const findRefreshToken = async (token: string) => {
  const text = `
    SELECT *
    FROM refresh_tokens
    WHERE token_hash = $1;
  `;

  const result = await db.query(text, [token]);

  return result.rows[0] ?? null;
};

export const deleteRefreshToken = async (token: string): Promise<void> => {
  const text = `
    DELETE FROM refresh_tokens
    WHERE token_hash = $1;
  `;

  await db.query(text, [token]);
};

export const deleteUserRefreshTokens = async (
  userId: number,
): Promise<void> => {
  const text = `
    DELETE FROM refresh_tokens
    WHERE user_id = $1;
  `;

  await db.query(text, [userId]);
};
