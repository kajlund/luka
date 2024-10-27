import path from 'node:path';

import express from 'express';
import { Liquid } from 'liquidjs';
import flash from 'express-flash';
import sessions from 'express-session';

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

    this.app.use(flash());

    // Set view engine
    const engine = new Liquid({
      cache: process.env.NODE_ENV !== 'development',
      root: path.join(process.cwd(), 'views'),
      layouts: path.join(process.cwd(), 'views/layouts'),
      partials: path.join(process.cwd(), 'views/partials'),
      extname: '.liquid'
    });
    
    this.app.engine('liquid', engine.express());   // register liquid engine
    this.app.set('view engine', 'liquid');         // set as default

    // Serve public
    this.app.use(express.static(path.join(process.cwd(), 'public')));

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
      const user = req.session.user;
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

      return res.render('error', { title: 'Error', page: 'error', user, error });
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
