import { Router, Request, Response, NextFunction } from 'express';
import { createPostLabel } from '../../services/postLabel.service';
import { success } from '../middlewares/responseHandler';
import { validatorHandler } from '../middlewares/validatorHandler';

const route = Router();

route.post(
  '/',
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const result = await createPostLabel(req.body);
      return success(req, res, result, 200);
    } catch (e) {
      next(e);
    }
  }
);
