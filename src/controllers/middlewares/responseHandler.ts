import { Request, Response } from 'express';

export const success = (
  req: Request,
  res: Response,
  message: unknown,
  status: number
): Response => {
  const statusCode = status || 200;
  const statusMessage = message || '';
  return res.status(statusCode).json({
    error: false,
    status: statusCode,
    body: statusMessage,
  });
};

export const error = (
  req: Request,
  res: Response,
  message: unknown | Error,
  status: number
): Response => {
  const statusCode = status || 500;
  const statusMessage =
    message || 'Internal Server Error. Please, try again later';
  return res.status(status).json({
    error: true,
    status: statusCode,
    body: statusMessage,
  });
};
