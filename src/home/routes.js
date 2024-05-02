import { BadRequestError } from '../errors.js';

export default {
  group: {
    prefix: '',
    middleware: [],
  },
  routes: [
    {
      method: 'get',
      path: '/',
      middleware: [],
      handler: (req, res) => res.render('home', {
        pageName: 'Home',
        msg: 'Home is where the heart is!'
      }),
    }, {
      method: 'get',
      path: '/login',
      middleware: [],
      handler: (req, res) => {
        throw new BadRequestError('That was bad');
      }
    }
  ],
}
