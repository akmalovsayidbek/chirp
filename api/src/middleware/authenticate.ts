import { RequestHandler } from "express";
import appAssert from "../utils/appAssert.js";
import { UNAUTHORIZED } from "../constants/http.js";
import { AccessTokenPayload, verifyToken } from "../utils/jwt.js";
import ErrorCode from "../constants/errorCode.js";
import { JWT_SECRET } from "../constants/env.js";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      sessionId: string;
    }
  }
}

const authenticate: RequestHandler = (req, _, next) => {
  const accessToken = req.cookies.accessToken;
  appAssert(
    accessToken,
    UNAUTHORIZED,
    "Not authorized",
    ErrorCode.InvalidAccessToken
  );

  const { payload, error } = verifyToken<AccessTokenPayload>(
    accessToken,
    JWT_SECRET
  );
  appAssert(
    payload,
    UNAUTHORIZED,
    error === "jwt expired" ? "Token expired" : "Invalid token",
    ErrorCode.InvalidAccessToken
  );

  req.userId = payload.userId;
  req.sessionId = payload.sessionId;

  next();
};

export default authenticate;
