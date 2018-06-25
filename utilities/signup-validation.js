module.exports = (req, user, done) => {
  //validation
  req
    .checkBody('name', 'Nickname should not be empty or exceed 50 characters')
    .notEmpty()
    .isLength({ max: 50 });
  req
    .checkBody('email', 'Invalid Email')
    .notEmpty()
    .isEmail();
  req
    .checkBody('password', 'Password must be at least 6 characters')
    .isLength({ min: 6 });

  var errors = req.validationErrors();
  if (errors) {
    var messages = [];
    errors.forEach(error => {
      messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages));
  }
  if (user) {
    return done(null, false, { message: 'Email is already taken' });
  }
  if (req.body.confirmPassword) {
    if (req.body.password !== req.body.confirmPassword) {
      return done(null, false, {
        message: 'Password does not match the confirm password'
      });
    }
  }
};
