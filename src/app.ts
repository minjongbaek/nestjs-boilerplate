import type { Application } from 'express';
import express from 'express';
import morgan from 'morgan';
import { CREDENTIALS, LOG_FORMAT, ORIGIN } from './config';
import { stream } from './utils/logger';
import cors from 'cors';

export class App {
  private app: Application;
  private env: string;
  public port: string | number;

  constructor() {
    this.app = express();
    this.env = process.env.NODE_ENV || 'development';
    this.port = process.env.PORT || 3000;

    this.initializeMiddlewares();
  }

  public listen() {
    this.app.listen(this.port);
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
  }
}
