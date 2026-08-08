import jwt from "jsonwebtoken";

const accessSecret = process.env.JWT_ACCESS_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;

if (!accessSecret) {
  throw new Error("JWT_ACCESS_SECRET is not defined");
}
if (!refreshSecret) {
  throw new Error("JWT_REFRESH_SECRET is not defined");
}

export const createAccessToken = (payload: {
  userId: number;
  role: string;
}) => {
  return jwt.sign(payload, accessSecret, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = (payload: { userId: number }) => {
  return jwt.sign(payload, refreshSecret, {
    expiresIn: "30d",
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, accessSecret);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, refreshSecret);
};
