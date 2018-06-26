module.exports = (req, res, next) => {
  if (req.session.oldUrl) {
    const redirectUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(redirectUrl);
  } else {
    res.redirect('/user/profile');
  }
  return next();
};
