import { ApiError } from "../../errors/api.error.js";
import { errorMessages } from "../../shared/constants/errors.js";
import { findUserByEmail } from "../users/user.repository.js";
import { saveRefreshToken } from "./auth.repository.js";
import { comparePassword } from "./model/lib/hash.js";
import { createAccessToken, createRefreshToken } from "./model/lib/jwt.js";

export const loginService = async (email: string, password: string) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new ApiError(401, errorMessages.invalid_email_or_password);
  }

  const isPasswordValid = await comparePassword(password, user.password_hash);

  if (!isPasswordValid) {
    throw new ApiError(401, errorMessages.invalid_email_or_password);
  }

  const accessToken = createAccessToken({ userId: user.id, role: user.role });

  const refreshToken = createRefreshToken({ userId: user.id });

  const expiresAt = new Date();

  expiresAt.setDate(expiresAt.getDate() + 30);

  await saveRefreshToken(user.id, refreshToken, expiresAt);

  return {
    accessToken,
    refreshToken,
  };
};
