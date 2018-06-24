var csrf = require('csurf');
var csrfProtection = csrf();
exports.signup = (req, res, next) => {
  console.log('get here');
  res.render('auth/signup', { title: 'Sign Up', csrfToken: req.csrfToken() });
};
