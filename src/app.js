import path from 'node:path';

import express from 'express';

import Router from './router.js';
import mustacheExpress from 'mustache-express';

import db from './db.js';
import { NotFoundError } from './errors.js';
import log from './logger.js';
import { codes, phrases } from './statuscodes.js';

class App {
  constructor(router) {
    this.app = express();
    this.router = router;
  }

  #setupMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    // Set view engine
    const viewsPath = path.join(process.cwd(), 'views');
    const partialsPath = path.join(viewsPath, 'partials');
    this.app.engine('mustache', mustacheExpress(partialsPath, '.mustache'));
    this.app.set('views', viewsPath);
    this.app.set('view engine', 'mustache');

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
