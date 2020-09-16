import { validate } from '../utils/joi';
import { NextFunction, Request, Response } from 'express';
import { SchemaMap } from '@hapi/joi';
import { unlink } from 'fs-extra';

export const validatorHandler = (schema: SchemaMap, check: string) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (check === 'body') {
      const error = validate(req.body, schema);
      if (error) {
        if (req.file) {
          unlink(req.file.path);
        }
        next(error);
      }
      next();
    }
    if (check === 'params') {
      const error = validate(req.params, schema);
      if (error) {
        if (req.file) {
          unlink(req.file.path);
        }
        next(error);
      }
      next();
    }
  };
};
