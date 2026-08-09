import { ApiError } from "../../errors/api.error.js";
import { errorMessages } from "../../shared/constants/errors.js";
import {
  createUser,
  findUserByEmail,
  getUserById,
} from "../users/user.repository.js";
import {
  deleteRefreshToken,
  findRefreshToken,
  saveRefreshToken,
} from "./auth.repository.js";
import { RegisterDto, UserRole } from "./auth.types.js";
import {
  comparePassword,
  hashPassword,
  hashRefreshToken,
} from "./model/lib/hash.js";
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "./model/lib/jwt.js";

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

export const registerService = async ({
  name,
  email,
  branch_id,
  password,
}: RegisterDto) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new ApiError(409, errorMessages.user_already_exists);
  }

  const password_hash = await hashPassword(password);

  const user = await createUser({
    name,
    email,
    branch_id,
    password_hash,
    role: UserRole.USER,
  });

  return user;
};

export const refreshService = async (refreshToken: string) => {
  let payload;

  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw new ApiError(401, errorMessages.invalid_token);
  }

  if (
    typeof payload !== "object" ||
    payload === null ||
    !("userId" in payload)
  ) {
    throw new ApiError(401, errorMessages.invalid_token);
  }

  const tokenHash = hashRefreshToken(refreshToken);
  const storedToken = await findRefreshToken(tokenHash);

  if (!storedToken) {
    throw new ApiError(401, errorMessages.refresh_token_not_found);
  }

  if (new Date(storedToken.expires_at) < new Date()) {
    await deleteRefreshToken(tokenHash);

    throw new ApiError(401, errorMessages.expired_refresh_token);
  }

  const user = await getUserById(Number(payload.userId));

  if (!user) {
    throw new ApiError(401, errorMessages.user_not_found);
  }

  // Rotation: старый refresh token больше не используем
  await deleteRefreshToken(tokenHash);

  const accessToken = createAccessToken({
    userId: user.id,
    role: user.role,
  });

  const newRefreshToken = createRefreshToken({
    userId: user.id,
  });

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  await saveRefreshToken(user.id, newRefreshToken, expiresAt);

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};

export const logoutService = async (refreshToken?: string) => {
  if (!refreshToken) {
    return;
  }

  const tokenHash = hashRefreshToken(refreshToken);

  await deleteRefreshToken(tokenHash);
};
