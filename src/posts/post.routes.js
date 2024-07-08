import postHandlers from './post.handlers.js';

export default {
  group: {
    prefix: '/posts',
    middleware: [],
  },
  routes: [
    {
      method: 'get',
      path: '/',
      middleware: [],
      handler: postHandlers.showPosts,
    },
    {
      method: 'get',
      path: '/add',
      middleware: [],
      handler: postHandlers.showAddPostForm,
    },
    {
      method: 'get',
      path: '/:id/edit',
      middleware: [],
      handler: postHandlers.showEditPostForm,
    },
    {
      method: 'get',
      path: '/:id',
      middleware: [],
      handler: postHandlers.viewPost,
    },
    {
      method: 'post',
      path: '/add',
      middleware: [],
      handler: postHandlers.addPost,
    },
    {
      method: 'post',
      path: '/:id/update',
      middleware: [],
      handler: postHandlers.updatePost,
    },
    {
      method: 'get',
      path: '/:id/delete',
      middleware: [],
      handler: postHandlers.deletePost,
    },
  ],
}
