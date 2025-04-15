import prisma from "../config/prisma.js";
import { CONFLICT, CREATED, OK, UNAUTHORIZED } from "../constants/http.js";
import appAssert from "../utils/appAssert.js";
import { compareValue, hashValue } from "../utils/bcrypt.js";
import catchErrors from "../utils/catchErrors.js";
import { ONE_DAY_MS, thirtyDaysFromNow } from "../utils/date.js";
import { loginSchema, signupSchema } from "./schema.js";
import {
  clearAuthCookies,
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
  setAuthCookies,
} from "../utils/cookies.js";
import { signToken, verifyToken } from "../utils/jwt.js";
import { AccessTokenPayload } from "../utils/jwt.js";
import { RefreshTokenPayload } from "../utils/jwt.js";
import { accessTokenSignOptions } from "../utils/jwt.js";
import { refreshTokenSignOptions } from "../utils/jwt.js";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env.js";
import { userSelect } from "../config/select.js";

export const signupHandler = catchErrors(async (req, res) => {
  const request = signupSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const userExists = await prisma.user.findFirst({
    where: { username: { equals: request.username, mode: "insensitive" } },
  });
  appAssert(!userExists, CONFLICT, "User already exists");

  const hashedPassword = await hashValue(request.password);

  const user = await prisma.user.create({
    data: {
      name: request.name,
      username: request.username,
      password: hashedPassword,
    },
    select: userSelect,
  });

  const session = await prisma.session.create({
    data: {
      userId: user.id,
      userAgent: request.userAgent,
      expiresAt: thirtyDaysFromNow(),
    },
  });

  const accessToken = signToken<AccessTokenPayload>(
    { userId: user.id, sessionId: session.id },
    accessTokenSignOptions
  );

  const refreshToken = signToken<RefreshTokenPayload>(
    { sessionId: session.id },
    refreshTokenSignOptions
  );

  return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json(user);
});

export const loginHandler = catchErrors(async (req, res) => {
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const user = await prisma.user.findFirst({
    where: { username: { equals: request.username, mode: "insensitive" } },
  });

  appAssert(user, UNAUTHORIZED, "Invalid username or password");

  const isValid = await compareValue(request.password, user.password);
  appAssert(isValid, UNAUTHORIZED, "Invalid username or password");

  const safeUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: userSelect,
  });

  const session = await prisma.session.create({
    data: {
      userId: user.id,
      userAgent: request.userAgent,
      expiresAt: thirtyDaysFromNow(),
    },
  });

  const accessToken = signToken<AccessTokenPayload>(
    { userId: user.id, sessionId: session.id },
    accessTokenSignOptions
  );

  const refreshToken = signToken<RefreshTokenPayload>(
    { sessionId: session.id },
    refreshTokenSignOptions
  );

  return setAuthCookies({ res, accessToken, refreshToken })
    .status(OK)
    .json(safeUser);
});

export const logoutHandler = catchErrors(async (req, res) => {
  const accessToken = req.cookies.accessToken;

  const { payload } = verifyToken<AccessTokenPayload>(accessToken, JWT_SECRET);

  if (payload) {
    await prisma.session.delete({ where: { id: payload.sessionId } });
  }

  return clearAuthCookies(res).status(OK).json({
    message: "Logout successful",
  });
});

export const refreshHandler = catchErrors(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  appAssert(refreshToken, UNAUTHORIZED, "Missing refresh token");

  const { payload } = verifyToken<RefreshTokenPayload>(
    refreshToken,
    JWT_REFRESH_SECRET
  );
  appAssert(payload, UNAUTHORIZED, "Invalid refresh token");

  const session = await prisma.session.findUnique({
    where: { id: payload.sessionId },
  });
  appAssert(
    session && session.expiresAt.getTime() > Date.now(),
    UNAUTHORIZED,
    "Session expired"
  );

  const shouldRefresh = session.expiresAt.getTime() - Date.now() <= ONE_DAY_MS;

  if (shouldRefresh) {
    await prisma.session.update({
      where: { id: session.id },
      data: { expiresAt: thirtyDaysFromNow() },
    });
  }

  const accessToken = signToken<AccessTokenPayload>(
    { userId: session.userId, sessionId: session.id },
    accessTokenSignOptions
  );

  const newRefreshToken = shouldRefresh
    ? signToken<RefreshTokenPayload>(
        { sessionId: session.id },
        refreshTokenSignOptions
      )
    : undefined;

  if (newRefreshToken) {
    res.cookie("refreshToken", newRefreshToken, getRefreshTokenCookieOptions());
  }

  return res
    .status(OK)
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .json({ message: "Access token refreshed." });
});
