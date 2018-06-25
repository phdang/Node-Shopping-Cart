var passport = require('passport');

exports.getSignup = (req, res, next) => {
  const messages = req.flash('error');
  res.render('auth/signup', {
    title: 'Sign Up',
    csrfToken: req.csrfToken(),
    messages: messages
  });
};
exports.postSignup = passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/signup',
  badRequestMessage: 'Email and password mube not be  empty',
  failureFlash: true
});
exports.getSignin = (req, res, next) => {
  const messages = req.flash('error');
  res.render('auth/signin', {
    title: 'Sign In',
    csrfToken: req.csrfToken(),
    messages: messages
  });
};
exports.postSignin = passport.authenticate('local.signin', {
  successRedirect: '/user/profile',
  failureRedirect: '/signin',
  badRequestMessage: 'Email and password mube not be  empty',
  failureFlash: true
});
exports.getSignout = (req, res, next) => {
  req.logout();
  res.redirect('/');
};
