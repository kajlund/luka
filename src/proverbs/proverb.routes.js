import proverbHandlers from './proverb.handlers.js';

export default {
  group: {
    prefix: '/proverbs',
    middleware: [],
  },
  routes: [
    {
      method: 'get',
      path: '/',
      middleware: [],
      handler: proverbHandlers.showProverbs,
    }
  ],
}
