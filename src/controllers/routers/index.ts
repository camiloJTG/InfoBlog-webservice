import roles from './roles';
import { Application } from 'express';

const routers = (app: Application): void => {
  const prefix = '/api';
  app.use(`${prefix}/roles`, roles);
};

export default routers;
