import { config } from '../../configs/config';
import { error } from '../middlewares/responseHandler';
import { Request, Response, NextFunction } from 'express';

export const logsError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);
  next(err);
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  if (config.environment.dev) {
    return error(req, res, { error: err.message, stack: err.stack }, 500);
  }
  return error(req, res, err.message, 500);
};
