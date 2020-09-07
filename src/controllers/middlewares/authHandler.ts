import { decode, verify } from '../utils/jwt';
import { error } from '../middlewares/responseHandler';
import { Response, Request, NextFunction } from 'express';

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  const token = req.headers['x-access-token'] || '';

  const decodedToken = decode(token.toString());
  if (!decodedToken) {
    return error(req, res, 'Invalid Token', 401);
  }

  const verifyToken = verify(token.toString());
  if (!verifyToken) {
    return error(req, res, 'Invalid Token', 401);
  }
  next();
};
