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
  failureFlash: true
});
exports.getSignin = (req, res, next) => {
  res.render('auth/signin', { title: 'Sign In', csrfToken: req.csrfToken() });
};
