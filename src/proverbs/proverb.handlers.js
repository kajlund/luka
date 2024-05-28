import svc from './proverb.services.js';

class ProverbHandler {
  async showProverbs(req, res) {
    const user = req.session.user;
    if (!user || !user.role==='admin') {
      return res.render('home', { message: 'Not allowed. Admins only' });
    }
    const result = await svc.getAllProverbs();
    res.render('proverbs/list', { ...result  });
  }

}

export default new ProverbHandler();
