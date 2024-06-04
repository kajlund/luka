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
    },
    {
      method: 'get',
      path: '/add',
      middleware: [],
      handler: proverbHandlers.showAddProverbForm,
    },
    {
      method: 'get',
      path: '/:id/edit',
      middleware: [],
      handler: proverbHandlers.showEditProverbForm,
    },
    {
      method: 'post',
      path: '/',
      middleware: [],
      handler: proverbHandlers.addProverb,
    },
    {
      method: 'post',
      path: '/:id/update',
      middleware: [],
      handler: proverbHandlers.updateProverb,
    },
    {
      method: 'get',
      path: '/:id/delete',
      middleware: [],
      handler: proverbHandlers.deleteProverb,
    }
  ],
}
