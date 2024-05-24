import svcUser from './user.services.js';

class UserHandlers {
  showLoginForm(req, res) {
    res.render('login', {
      pageName: 'Login',
    });
  }

  showRegisterForm(req, res) {
    res.render('register', {
      data: null,
    });
  }

  async register(req, res) {
    let validation = await svcUser.validate(req.body);
    if (!validation.isValid) return res.render('register', validation);

    const result = await svcUser.register(validation.value);
    if (result.error) return res.render('error', result.error);

    res.render('home', { message: `User ${result.user.email} was registered` });
  }
}

export default new UserHandlers();
