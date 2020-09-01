import 'dotenv/config';
import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from '../controllers/routers/index';
import {
  logsError,
  errorHandler,
} from '../controllers/middlewares/errorHandler';

const app = express();

// Settings

// Global Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
routes(app);

// Error Middlewares
app.use(logsError);
app.use(errorHandler);

// Static Fields

export default app;
