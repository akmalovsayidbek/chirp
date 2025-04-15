import jwt, { SignOptions } from "jsonwebtoken";
import { JWT_SECRET, JWT_REFRESH_SECRET } from "../constants/env.js";

export type AccessTokenPayload = {
  userId: string;
  sessionId: string;
};

export type RefreshTokenPayload = {
  sessionId: string;
};

type SignOptionsAndSecret = SignOptions & {
  secret: string;
};

export const accessTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "15m",
  secret: JWT_SECRET,
};

export const refreshTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "30d",
  secret: JWT_REFRESH_SECRET,
};

export const signToken = <T extends object>(
  payload: T,
  options: SignOptionsAndSecret
) => {
  const { secret, ...opts } = options;
  return jwt.sign(payload, secret, { ...opts });
};

export const verifyToken = <T>(token: string, secret: string) => {
  try {
    const payload = jwt.verify(token, secret) as T;
    return { payload };
  } catch (error: any) {
    return { error: error.message };
  }
};
