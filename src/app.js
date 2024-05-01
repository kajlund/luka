import express from 'express';

import Router from './router.js';
import mustacheExpress from 'mustache-express';

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
    this.app.engine('mustache', mustacheExpress());
    this.app.set('views', './views');
    this.app.set('view engine', 'mustache');
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
    this.#handleError()
  }
}

const expressApp = new App(Router)
expressApp.initialize();

export default expressApp.app
