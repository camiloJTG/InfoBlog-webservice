import { Router, Response, Request, NextFunction } from 'express';
import {
  createLabel,
  getAllLabel,
  getOneLabel,
  updateLabel,
} from '../../services/label.service';
import { success } from '../middlewares/responseHandler';
import { validatorHandler } from '../middlewares/validatorHandler';
import {
  createLabelSchema,
  labelId,
  updateLabelSchema,
} from '../schemas/label.schema';

const route = Router();

route.post(
  '/',
  validatorHandler(createLabelSchema, 'body'),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const result = await createLabel(req.body);
      return success(req, res, result, 201);
    } catch (e) {
      next(e);
    }
  }
);

route.get(
  '/:id',
  validatorHandler({ id: labelId }, 'params'),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const result = await getOneLabel(req.params.id);
      return success(req, res, result, 200);
    } catch (e) {
      next(e);
    }
  }
);

route.get(
  '/',
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const result = await getAllLabel();
      return success(req, res, result, 200);
    } catch (e) {
      next(e);
    }
  }
);

route.put(
  '/:id',
  validatorHandler(updateLabelSchema, 'body'),
  validatorHandler({ id: labelId }, 'params'),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const result = await updateLabel(req.params.id, req.body);
      return success(req, res, result, 201);
    } catch (e) {
      next(e);
    }
  }
);

export default route;
