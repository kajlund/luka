import svcUser from './user.services.js';

class UserHandlers {
  showLoginForm(req, res) {
    res.render('login', {
      pageName: 'Login',
    });
  }

  async login(req, res) {
    const {email, password } = req.body;
    const user = await svcUser.login(email, password);
    req.session.user = user;
    if (user) {
      res.render('home', {user});
    } else {
      res.render('login', {
        message: 'Login failed'
      });
    }
  }

  logout(req, res) {
    let email = '';
    const user = req.session.user;
    if (user) email = user.email;
    req.session.destroy(function(err) {
      res.render('home', { message: `Logged out user ${email}`});
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
    if (result.error) return res.render('message', result.error);

    res.render('home', {
      message: `User ${result.user.email} was registered`
    });
  }
}

export default new UserHandlers();
