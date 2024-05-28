import { BadRequestError } from '../errors.js';
import svcProverbs from '../proverbs/proverb.services.js';

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
        const user = req.session.user;
        const proverb = await svcProverbs.fetchRandomQuote();
        res.render('home', {
          user,
          proverb,
        });
      }
    },
    {
      method: 'get',
      path: '/about',
      middleware: [],
      handler: (req, res) => {
        const user = req.session.user;
        res.render('about', { user });
      }
    }
  ],
}
