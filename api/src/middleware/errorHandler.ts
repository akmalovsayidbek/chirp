import { ErrorRequestHandler } from "express";
import { INTERNAL_SERVER_ERROR } from "../constants/http.js";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);

  res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
};

export default errorHandler;
