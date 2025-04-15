import { ErrorRequestHandler, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http.js";
import { ZodError } from "zod";
import AppError from "../utils/appError.js";
import { clearAuthCookies } from "../utils/cookies.js";

const handleZodError = (res: Response, err: ZodError) => {
  const errors = err.issues.map((e) => ({
    path: e.path.join("."),
    message: e.message,
  }));

  return res.status(BAD_REQUEST).json(errors);
};

const handleAppError = (res: Response, err: AppError) => {
  res.status(err.statusCode).json({
    message: err.message,
    errorCode: err.errorCode,
  });
};

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);

  if (req.path === "/auth/refresh") {
    clearAuthCookies(res);
  }

  if (err instanceof ZodError) {
    handleZodError(res, err);
  }

  if (err instanceof AppError) {
    handleAppError(res, err);
  }

  res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
};

export default errorHandler;
