import svc from './proverb.services.js';

class ProverbHandler {
  async showProverbs(req, res) {
    const user = req.session.user;
    if (!user || !user.role==='admin') {
      req.flash('info', 'Not allowed. Admins only');
      return res.redirect('/');
    }
    const result = await svc.getAllProverbs();
    const groups = await svc.getGroups();
    console.log(groups);
    const tags = await svc.getTags();
    console.log(tags);
    res.render('pages/proverbs/index', {
      title: 'Proverbs',
      page: 'proverbs',
      user,
      groups,
      tags,
      proverbs: result.proverbs,
    });
  }

}

export default new ProverbHandler();
