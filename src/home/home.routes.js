import { BadRequestError } from '../errors.js';
import svcProverbs from '../proverbs/proverb.services.js';
import log from '../logger.js';

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
        log.debug(proverb);
        res.render('home', {
          title: 'Home',
          page: 'home',
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
        res.render('pages/about', {
          title: 'About',
          page: 'about',
          user,
        });
      }
    },
    {
      method: 'get',
      path: '/healthz',
      middleware: [],
      handler: (req, res) => {
        res.status(200).send('OK');
      }
    }
  ],
}
