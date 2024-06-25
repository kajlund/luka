import svcResources from './resource.services.js';
import log from '../logger.js';
class ResourceHandlers {

  async addResource(req, res) {
    const user = req.session.user;
    // if (!user || !user.role==='admin') {
    //   req.flash('info', 'Not allowed. Admins only');
    //   return res.redirect('/');
    // }
    const categories = svcResources.getCategories();

    const validation = await svcResources.validate(req.body);
    if (!validation.isValid) return res.render('pages/resources/add', {
      title: 'Resources',
      page: 'resources',
      user,
      categories,
      value: validation.value,
      error: validation.error
    });

    const result = await svcResources.addResource(validation.value);
    if (result.error) {
      req.flash('error', `Error saving resource: ${result.error}`);
    } else {
      req.flash('info', `Added resource ${result.resource.name}`);
    }
    res.redirect('/resources');
  }

  async deleteResource(req, res) {
    const id = req.params.id;
    const result = await svcResources.deleteById(id);
    if (result.error) {
      req.flash('error', `Error deleting resource: ${result.error}`);
    } else {
      req.flash('info', `Deleted resource ${result.resource.name}`);
    }
    res.redirect('/resources');
  }

  async downvoteResource(req, res) {
    const id = req.params.id;
    const result = await svcResources.addVotes(id, -1);
    if (result.error) {
      req.flash('error', `Error downvoting resource: ${result.error}`);
    } else {
      req.flash('info', `Downvoted resource ${result.resource.name}`);
    }
    res.redirect('/resources');
  }

  async showAddResourceForm(req, res) {
    const user = req.session.user;
    // if (!user || !user.role==='admin') {
    //   req.flash('info', 'Not allowed. Admins only');
    //   return res.redirect('/');
    // }
    const categories = svcResources.getCategories();
    res.render('pages/resources/add', {
      title: 'Add Resource',
      page: 'resources',
      user,
      categories,
      value: { name: '', url: '', description: '', category: '', tags: [] },
      error: {}
    });
  }

  async showEditResourceForm(req, res) {
    const user = req.session.user;
    // if (!user || !user.role==='admin') {
    //   req.flash('info', 'Not allowed. Admins only');
    //   return res.redirect('/');
    // }
    const id = req.params.id;
    const value = await svcResources.getResourceById(id);
    if (!value) {
      req.flash('error', `Resource with id ${id} was not found`);
      return res.redirect('/resources');
    }
    const categories = svcResources.getCategories();
    res.render('pages/resources/edit', {
      title: 'Edit Resource',
      page: 'resources',
      user,
      resourceId: id,
      categories,
      value,
      error: {}
    });
  }

  async showResources(req, res) {
    const user = req.session.user;
    // if (!user || !user.role==='admin') {
    //   req.flash('info', 'Not allowed. Admins only');
    //   return res.redirect('/');
    // }

    const filter = {
      category: req.query.category,
      tags: req.query.tags ? req.query.tags.split(',') : [],
    };

    log.debug(filter);

    let categories = svcResources.getCategories();
    const tags = await svcResources.getTags();

    const result = await svcResources.findResources(filter);
    res.render('pages/resources/index', {
      title: 'Resources',
      page: 'resources',
      user,
      categories,
      tags,
      resources: result.resources,
      filter,
    });
  }

  async updateResource(req, res) {
    const user = req.session.user;
    // if (!user || !user.role==='admin') {
    //   req.flash('info', 'Not allowed. Admins only');
    //   return res.redirect('/');
    // }

    const id = req.params.id;
    let categories = svcResources.getCategories();

    const validation = await svcResources.validate(req.body);
    if (!validation.isValid) return res.render('pages/resources/edit', {
      title: 'Resources',
      page: 'resources',
      user,
      resourceId: id,
      categories,
      value: validation.value,
      error: validation.error
    });

    const result = await svcResources.updateResource(id, validation.value);
    if (result.error) {
      req.flash('error', `Error saving resource: ${result.error}`);
    } else {
      req.flash('info', `Updated resource ${result.resource.name}`);
    }
    res.redirect('/resources');
  }

  async upvoteResource(req, res) {
    const id = req.params.id;
    const result = await svcResources.addVotes(id, 1);
    if (result.error) {
      req.flash('error', `Error upvoting resource: ${result.error}`);
    } else {
      req.flash('info', `Upvoted resource ${result.resource.name}`);
    }
    res.redirect('/resources');
  }
}

export default new ResourceHandlers();
