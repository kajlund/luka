import { BadRequestError } from '../errors.js';
import hndUser from './user.handlers.js';

export default {
  group: {
    prefix: '/users',
    middleware: [],
  },
  routes: [
    {
      method: 'get',
      path: '/register',
      middleware: [],
      handler: hndUser.showRegisterForm,
    },
    {
      method: 'post',
      path: '/register',
      middleware: [],
      handler: hndUser.register,
    },
    {
      method: 'get',
      path: '/login',
      middleware: [],
      handler: hndUser.showLoginForm
    },
    {
      method: 'post',
      path: '/login',
      middleware: [],
      handler: (req, res) => {
        res.render('login', {
        pageName: 'Login'
      });
      }
    }
  ],
}
