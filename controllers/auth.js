var passport = require('passport');

exports.getSignup = (req, res, next) => {
  const messages = req.flash('error');
  res.render('auth/signup', {
    title: 'Sign Up',
    csrfToken: req.csrfToken(),
    messages: messages,
    postRoute: '/signup'
  });
};
exports.getAdminSignup = (req, res, next) => {
  const messages = req.flash('error');
  res.render('auth/signup', {
    title: 'Sign Up',
    csrfToken: req.csrfToken(),
    messages: messages,
    postRoute: '/admin/signup'
  });
};
exports.postSignup = passport.authenticate('local.signup', {
  failureRedirect: '/signup',
  badRequestMessage: 'Email and password mube not be  empty',
  failureFlash: true
});
exports.getSignin = (req, res, next) => {
  const messages = req.flash('error');
  res.render('auth/signin', {
    title: 'Sign In',
    csrfToken: req.csrfToken(),
    messages: messages,
    postRoute: '/signin'
  });
};
exports.getAdminSignin = (req, res, next) => {
  const messages = req.flash('error');
  res.render('auth/signin', {
    title: 'Sign In',
    csrfToken: req.csrfToken(),
    messages: messages,
    postRoute: '/admin/signin'
  });
};
exports.postSignin = passport.authenticate('local.signin', {
  failureRedirect: '/signin',
  badRequestMessage: 'Email and password mube not be  empty',
  failureFlash: true
});
exports.getSignout = (req, res, next) => {
  req.logout();
  req.session.auth = null;
  res.redirect('/');
};

exports.postAdminSignup = passport.authenticate('local.admin.signup', {
  successRedirect: '/',
  failureRedirect: '/admin/signup',
  badRequestMessage: 'Email and password mube not be  empty',
  failureFlash: true
});

exports.postAdminSignin = passport.authenticate('local.admin.signin', {
  successRedirect: '/',
  failureRedirect: '/admin/signin',
  badRequestMessage: 'Email and password mube not be  empty',
  failureFlash: true
});
