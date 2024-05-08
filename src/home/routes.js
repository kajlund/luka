import { BadRequestError } from '../errors.js';
import Proverb from './proverb.model.js';

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
      handler: async (req, res) => {
        const proverbs = await Proverb.find({ group: 'IT'});
        const idx = Math.floor(Math.random() * proverbs.length);
        const proverb =  proverbs[idx];
        res.render('home', {
          pageName: 'Home',
          proverb,
          msg: 'Home is where the heart is!'
        });
      }
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
