module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/');
  }
  return next();
};
