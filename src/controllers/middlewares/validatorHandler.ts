import { validate } from '../utils/joi';
import { NextFunction, Request, Response } from 'express';
import { SchemaMap } from '@hapi/joi';

export const validatorHandler = (schema: SchemaMap, check: string) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (check === 'body') {
      const error = validate(req.body, schema);
      error ? next(error) : next();
    }
    if (check === 'params') {
      const error = validate(req.params, schema);
      error ? next(error) : next();
    }
  };
};
