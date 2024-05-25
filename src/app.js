import path from 'node:path';

import express from 'express';
import sessions from 'express-session';
import nunjucks from 'nunjucks';

import Router from './router.js';

import db from './db.js';
import { NotFoundError } from './errors.js';
import log from './logger.js';
import { codes, phrases } from './statuscodes.js';

const oneDay = 1000 * 60 * 60 * 24;

class App {
  constructor(router) {
    this.app = express();
    this.router = router;
  }

  #setupMiddleware() {
    this.app.set('trust proxy', 1) // trust first proxy
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    // Session handling
    this.app.use(sessions({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: oneDay,
        secure: 'auto'
      }
    }));

    // Set view engine
    nunjucks.configure('views', {
      autoescape: true,
      express: this.app,
    });
    this.app.set('view engine', 'html');

    // Serve public
    const publicPath = path.join(process.cwd(), 'public');
    this.app.use(express.static(publicPath));

    // request logging
    this.app.use((req, res, next) => {
      log.info(`${req.method}:${req.url}`)
      next()
    });
  }

  #setupRoutes() {
    this.router.initializeRouter(this.app);
  }

  #handleNotFound() {
    this.app.use((req, res, next) => {
      next(new NotFoundError(`Route ${req.originalUrl} was not found`))
    });
  }

  #handleError() {
    this.app.use((err, req, res, next) => {
      let error = {
        success: false,
        statusCode: codes.INTERNAL_SERVER_ERROR,
        message: phrases.INTERNAL_SERVER_ERROR,
      };

      if (!err.isAppError) {
        log.error(err);
      } else {
        error.message = err.message
        error.statusCode = err.statusCode
        error.detail = err.detail
        error.errors = err.errors
      }

      return res.render('error', error);
    });
  }

  initialize() {
    this.#setupMiddleware();
    this.#setupRoutes();
    this.#handleNotFound();
    this.#handleError();
  }
}

const expressApp = new App(Router)
expressApp.initialize();
db.connect();

export default expressApp.app
