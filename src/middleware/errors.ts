// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import * as createError from "http-errors";
import * as Joi from "joi";

const isJoiValidationError = (error: any): error is Joi.ValidationError => {
  return error.isJoi === true;
};

// Custom error handler middleware
const errorHandler = (
  err: createError.HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error (customize this part based on your logging preference)
  console.log(err);

  // If this is a Joi error, send the detailed validation error
  if (isJoiValidationError(err)) {
    return res.status(422).json({
      error: {
        status: err.status || "error",
        message: err.message,
        details: err.details,
      },
    });
  }

  // If the error is not an HttpError, create a 500 Internal Server Error
  if (!createError.isHttpError(err)) {
    err = createError(500);
  }

  // Send the error response to the client
  res.status(err.statusCode || 500).json({
    error: {
      status: err.status || "error",
      message: err.message,
    },
  });
};

export default errorHandler;
