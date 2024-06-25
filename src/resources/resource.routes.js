import resourceHandlers from './resource.handlers.js';

export default {
  group: {
    prefix: '/resources',
    middleware: [],
  },
  routes: [
    {
      method: 'get',
      path: '/',
      middleware: [],
      handler: resourceHandlers.showResources,
    },
    {
      method: 'get',
      path: '/add',
      middleware: [],
      handler: resourceHandlers.showAddResourceForm,
    },
    {
      method: 'get',
      path: '/:id/edit',
      middleware: [],
      handler: resourceHandlers.showEditResourceForm,
    },
    {
      method: 'post',
      path: '/add',
      middleware: [],
      handler: resourceHandlers.addResource,
    },
    {
      method: 'post',
      path: '/:id/update',
      middleware: [],
      handler: resourceHandlers.updateResource,
    },
    {
      method: 'get',
      path: '/:id/delete',
      middleware: [],
      handler: resourceHandlers.deleteResource,
    },
    {
      method: 'get',
      path: '/:id/upvote',
      middleware: [],
      handler: resourceHandlers.upvoteResource,
    },
    {
      method: 'get',
      path: '/:id/downvote',
      middleware: [],
      handler: resourceHandlers.downvoteResource,
    },
  ],
}
