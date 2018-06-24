exports.getSignup = (req, res, next) => {
  res.render('auth/signup', { title: 'Sign Up', csrfToken: req.csrfToken() });
};
exports.postSignup = (req, res, next) => {
  res.redirect('/');
};
exports.getSignin = (req, res, next) => {
  res.render('auth/signin', { title: 'Sign In', csrfToken: req.csrfToken() });
};
