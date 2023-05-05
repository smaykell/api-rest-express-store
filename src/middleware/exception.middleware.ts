import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exception/UnauthorizedException";
import { UnauthorizedError } from "express-jwt";
import { NotFoundException } from "../exception/NotFoundException";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    err instanceof UnauthorizedException ||
    err instanceof UnauthorizedError
  ) {
    res.status(401).json({
      message: err.message,
    });
  } else if (err instanceof NotFoundException) {
    res.status(err.statusCode).json({
      message: err.message,
    });
  } else {
    next(err);
  }
};
