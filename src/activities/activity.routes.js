import ActivityHandlers from "./activity.handlers";

export default {
  group: {
    prefix: '/activities',
    middleware: [],
  },
  routes: [
    {
      method: 'get',
      path: '/',
      middleware: [],
      handler: ActivityHandlers.getActivities,
    },
  ]
};
