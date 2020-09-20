import { Router, Request, Response, NextFunction } from 'express';
import { success } from '../middlewares/responseHandler';
import { validatorHandler } from '../middlewares/validatorHandler';
import { checkAuth } from '../middlewares/authHandler';
import {
  createPostSchema,
  postId,
  updatePostSchema,
} from '../schemas/posts.shema';
import multer from '../middlewares/filenameHandler';
import {
  createPost,
  deletePost,
  getAllPost,
  getOnePost,
  updatePost,
} from '../../services/post.service';

const route = Router();

route.post(
  '/',
  checkAuth,
  multer.single('IMAGE'),
  validatorHandler(createPostSchema, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await createPost(req.body, req.file.path);
      return success(req, res, result, 201);
    } catch (e) {
      next(e);
    }
  }
);

route.get(
  '/:id',
  checkAuth,
  validatorHandler({ id: postId }, 'params'),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const result = await getOnePost(req.params.id);
      return success(req, res, result, 200);
    } catch (e) {
      next(e);
    }
  }
);

route.get(
  '/',
  checkAuth,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const result = await getAllPost();
      return success(req, res, result, 200);
    } catch (e) {
      next(e);
    }
  }
);

route.put(
  '/:id',
  checkAuth,
  multer.single('IMAGE'),
  validatorHandler({ id: postId }, 'params'),
  validatorHandler(updatePostSchema, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.file) {
        const result = await updatePost(req.params.id, req.body, req.file.path);
        return success(req, res, result, 201);
      }
      const result = await updatePost(req.params.id, req.body, null);
      return success(req, res, result, 201);
    } catch (e) {
      next(e);
    }
  }
);

route.delete(
  '/:id',
  checkAuth,
  validatorHandler({ id: postId }, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await deletePost(req.params.id);
      return success(req, res, result, 200);
    } catch (e) {
      next(e);
    }
  }
);

export default route;
