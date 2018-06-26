module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  req.session.oldUrl = fullUrl;
  res.redirect('/signin');
};
