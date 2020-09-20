import { Router, Request, Response, NextFunction } from 'express';
import { success } from '../middlewares/responseHandler';
import { validatorHandler } from '../middlewares/validatorHandler';
import { checkAuth, checkRole } from '../middlewares/authHandler';
import {
  createRolesSchema,
  roleId,
  updateRolesSchema,
} from '../schemas/role.schema';
import {
  createRole,
  getOneRole,
  getAllRoles,
  updateRole,
} from '../../services/role.service';

const route = Router();

route.post(
  '/',
  checkAuth,
  checkRole,
  validatorHandler(createRolesSchema, 'body'),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const result = await createRole(req.body);
      return success(req, res, result, 201);
    } catch (e) {
      next(e);
    }
  }
);

route.get(
  '/:id',
  checkAuth,
  checkRole,
  validatorHandler({ id: roleId }, 'params'),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const { id } = req.params;
      const result = await getOneRole(id);
      return success(req, res, result, 200);
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
      const result = await getAllRoles();
      return success(req, res, result, 200);
    } catch (e) {
      next(e);
    }
  }
);

route.put(
  '/:id',
  checkAuth,
  checkRole,
  validatorHandler({ id: roleId }, 'params'),
  validatorHandler(updateRolesSchema, 'body'),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const { id } = req.params;
      const result = await updateRole(id, req.body);
      return success(req, res, result, 201);
    } catch (e) {
      next(e);
    }
  }
);

export default route;
