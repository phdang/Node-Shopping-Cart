module.exports = (req, user, password, done) => {
  req
    .checkBody('email', 'Invalid Email')
    .notEmpty()
    .isEmail();
  var errors = req.validationErrors();
  if (errors) {
    var messages = [];
    errors.forEach(error => {
      messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages));
  }
  if (!user) {
    return done(null, false, { message: 'Email or password incorrect' });
  }
  if (!user.validPassword(password)) {
    return done(null, false, { message: 'Email or password incorrect' });
  }
};
