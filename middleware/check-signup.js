module.exports = (req, res, next) => {
  if (req.body.password.length < 6) {
    return res.redirect('/signup');
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.redirect('/signup');
  }
  next();
};
