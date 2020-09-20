import { Router, Request, Response, NextFunction } from 'express';
import { success } from '../middlewares/responseHandler';
import { validatorHandler } from '../middlewares/validatorHandler';
import { login } from '../schemas/access.shema';
import { accessLogin } from '../../services/access.service';

const route = Router();

route.post(
  '/',
  validatorHandler(login, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await accessLogin(req.body);
      return success(req, res, result, 200);
    } catch (e) {
      next(e);
    }
  }
);

export default route;
