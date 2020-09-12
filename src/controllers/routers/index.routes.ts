import roles from './role.routes';
import users from './user.routes';
import labels from './label.routes';

import { Application } from 'express';

const routers = (app: Application): void => {
  const prefix = '/api';
  app.use(`${prefix}/roles`, roles);
  app.use(`${prefix}/users`, users);
  app.use(`${prefix}/labels`, labels);
};

export default routers;
