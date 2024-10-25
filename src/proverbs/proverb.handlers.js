import svcProverbs from './proverb.services.js';
// import log from '../logger.js';

class ProverbHandler {

  async addProverb(req, res) {
    const user = req.session.user;
    if (!user || !user.role.includes('admin')) {
      req.flash('info', 'Not allowed. Admins only');
      return res.redirect('/');
    }

    const authors = await svcProverbs.getAuthors();
    const groups = await svcProverbs.getGroups();

    const validation = await svcProverbs.validate(req.body);
    if (!validation.isValid) return res.render('proverbs/edit', {
      title: 'Proverbs',
      page: 'proverbs',
      user,
      insertMode: true,
      authors,
      groups,
      value: validation.value,
      error: validation.error
    });

    const result = await svcProverbs.addProverb(validation.value);
    if (result.error) {
      req.flash('error', `Error saving proverb: ${result.error}`);
    } else {
      req.flash('info', `Added proverb ${result.proverb.title}`);
    }
    res.redirect('/proverbs');
  }

  async deleteProverb(req, res) {
    const user = req.session.user;
    if (!user || !user.role.includes('admin')) {
      req.flash('info', 'Not allowed. Admins only');
      return res.redirect('/');
    }
    const id = req.params.id;
    const result = await svcProverbs.deleteById(id);
    if (result.error) {
      req.flash('error', `Error deleting proverb: ${result.error}`);
    } else {
      req.flash('info', `Deleted proverb ${result.proverb.title}`);
    }
    res.redirect('/proverbs');
  }

  async showProverbs(req, res) {
    const user = req.session.user;
    if (!user || !user.role.includes('admin')) {
      req.flash('info', 'Not allowed. Admins only');
      return res.redirect('/');
    }
    const result = await svcProverbs.getAllProverbs();
    let groups = await svcProverbs.getGroups();
    groups = ['Filter by group', [...groups]];
    const tags = await svcProverbs.getTags();
    res.render('proverbs/list', {
      title: 'Proverbs',
      page: 'proverbs',
      user,
      groups,
      tags,
      proverbs: result.proverbs,
    });
  }

  async showAddProverbForm(req, res) {
    const user = req.session.user;
    if (!user || !user.role.includes('admin')) {
      req.flash('info', 'Not allowed. Admins only');
      return res.redirect('/');
    }
    const authors = await svcProverbs.getAuthors();
    const groups = await svcProverbs.getGroups();
    res.render('proverbs/edit', {
      title: 'Add Proverb',
      page: 'proverbs',
      user,
      insertMode: true,
      authors,
      groups,
      value: { title: '', author: '', content: '', description: '', group: '', tags: [] },
      error: {}
    });
  }

  async showEditProverbForm(req, res) {
    const user = req.session.user;
    if (!user || !user.role.includes('admin')) {
      req.flash('info', 'Not allowed. Admins only');
      return res.redirect('/');
    }
    const id = req.params.id;
    const value = await svcProverbs.getProverbById(id);
    if (!value) {
      req.flash('error', `Proverb with id ${id} was not found`);
      return res.redirect('/proverbs');
    }
    const authors = await svcProverbs.getAuthors();
    const groups = await svcProverbs.getGroups();
    res.render('proverbs/edit', {
      title: 'Edit Proverb',
      page: 'proverbs',
      user,
      insertMode: false,
      proverbId: id,
      authors,
      groups,
      value,
      error: {}
    });
  }

  async updateProverb(req, res) {
    const user = req.session.user;
    if (!user || !user.role.includes('admin')) {
      req.flash('info', 'Not allowed. Admins only');
      return res.redirect('/');
    }

    const id = req.params.id;
    const authors = await svcProverbs.getAuthors();
    const groups = await svcProverbs.getGroups();

    const validation = await svcProverbs.validate(req.body);
    if (!validation.isValid) return res.render('proverbs/edit', {
      title: 'Edit Proverb',
      page: 'proverbs',
      user,
      insertMode: false,
      proverbId: id,
      authors,
      groups,
      value: validation.value,
      error: validation.error
    });

    const result = await svcProverbs.updateProverb(id, validation.value);
    if (result.error) {
      req.flash('error', `Error saving proverb: ${result.error}`);
    } else {
      req.flash('info', `Updated proverb ${result.proverb.title}`);
    }
    res.redirect('/proverbs');
  }
}

export default new ProverbHandler();
