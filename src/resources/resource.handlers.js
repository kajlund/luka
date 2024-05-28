import svcUser from './user.services.js';

class ResourceHandlers {
  listResources(req, res) {
    res.render('resources/list', {});
  }

}

export default new ResourceHandlers();
