import { Router, Request, Response, NextFunction } from 'express';
import { success } from '../middlewares/responseHandler';
import { validatorHandler } from '../middlewares/validatorHandler';
import { checkAuth, checkRole } from '../middlewares/authHandler';
import {
  createUser,
  getAllUsers,
  getOneUser,
  updateUser,
} from '../../services/user.service';
import {
  createUserSchema,
  updateUsersSchema,
  userId,
} from '../schemas/user.schema';

const route = Router();

route.post(
  '/client',
  validatorHandler(createUserSchema, 'body'),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const result = await createUser(req.body, 2);
      return success(req, res, result, 201);
    } catch (e) {
      next(e);
    }
  }
);

route.post(
  '/admin',
  checkAuth,
  checkRole,
  validatorHandler(createUserSchema, 'body'),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const result = await createUser(req.body, 1);
      return success(req, res, result, 201);
    } catch (e) {
      next(e);
    }
  }
);

route.get(
  '/',
  checkAuth,
  checkRole,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const result = await getAllUsers();
      return success(req, res, result, 200);
    } catch (e) {
      next(e);
    }
  }
);

route.get(
  '/:id',
  checkAuth,
  validatorHandler({ id: userId }, 'params'),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const result = await getOneUser(req.params.id);
      return success(req, res, result, 200);
    } catch (e) {
      next(e);
    }
  }
);

route.put(
  '/:id',
  checkAuth,
  validatorHandler({ id: userId }, 'params'),
  validatorHandler(updateUsersSchema, 'body'),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const result = await updateUser(req.params.id, req.body);
      return success(req, res, result, 201);
    } catch (e) {
      next(e);
    }
  }
);

export default route;
