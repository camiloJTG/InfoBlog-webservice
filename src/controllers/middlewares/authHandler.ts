import { IToken, verify } from '../utils/jwt';
import { error } from '../middlewares/responseHandler';
import { Response, Request, NextFunction } from 'express';

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  const token = req.headers['x-access-token'] || '';
  if (token.length === 0) {
    return error(req, res, 'Token was not found', 401);
  }

  const verifyToken = verify(token.toString());
  if (!verifyToken) {
    return error(req, res, 'Invalid Token', 401);
  }
  next();
};

export const checkRole = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  const token = req.headers['x-access-token'] || '';

  const verifyToken = verify(token.toString());

  if (typeof verifyToken === 'object') {
    if (verifyToken.ROLE !== 1) {
      return error(req, res, 'Insufficient privileges', 401);
    }
  }
  next();
};
