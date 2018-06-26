module.exports = (req, res, next) => {
  if (req.session.cart) {
    return next();
  }
  res.redirect('/cart/view');
};
