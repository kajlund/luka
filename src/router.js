import express from 'express';

import log from './logger.js';
import homeRoutes from './home/home.routes.js';
import userRoutes from './users/user.routes.js';

class Router {
  constructor() {
    this.router = express.Router();
    this.routes = [homeRoutes, userRoutes];
  }

  #attachRoutes(routeGroups, prefix = '') {
    routeGroups.forEach(({ group, routes }) => {
      routes.forEach(({ method, path, middleware = [], handler }) => {
        log.info(`Route: ${method} ${prefix}${group.prefix}${path}`);
        this.router[method](prefix + group.prefix + path, [...(group.middleware || []), ...middleware], handler);
      });
    });
  }

  initializeRouter(app) {
    this.#attachRoutes(this.routes, '');

    // register router
    app.use(this.router)
  }
}

export default new Router()
