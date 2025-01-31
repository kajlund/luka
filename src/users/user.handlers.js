import svcUser from './user.services.js';

class UserHandlers {
  showLoginForm(req, res) {
    res.render('login', {
      title: 'Logon',
      page: 'login',
      user: null,
      value: {},
      error: {}
    });
  }

  async login(req, res) {
    const { email, password } = req.body;
    const user = await svcUser.login(email, password);
    req.session.user = user;
    if (user) {
      req.flash('info', `User ${user.alias} logged on`);
      res.redirect('/');
    } else {
      req.flash('info', 'Logon failed');
      res.redirect('/users/login');
    }
  }

  logout(req, res) {
    req.session.destroy(function (err) {
      res.redirect('/');
    });
  }

  showRegisterForm(req, res) {
    res.render('register', {
      title: 'Register',
      page: 'register',
      user: null,
      value: {},
      error: {}
    });
  }

  async register(req, res) {
    let validation = await svcUser.validate(req.body);
    if (!validation.isValid) return res.render('register', {
      title: 'Register',
      page: 'register',
      user: null,
      value: {},
      error: {}
    });

    const result = await svcUser.register(validation.value);
    if (result.error) return res.render('register', {
      title: 'Register',
      page: 'register',
      user: null,
      value: result.value,
      error: result.error
    });
    req.flash('info', `User ${result.user.email} was registered`);
    res.redirect('/');
  }
}

export default new UserHandlers();
