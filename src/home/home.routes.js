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
          proverb,
        });
      }
    },
    {
      method: 'get',
      path: '/about',
      middleware: [],
      handler: (req, res) => res.render('about')
    }
  ],
}
