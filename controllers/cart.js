exports.getCartView = (req, res, next) => {
  res.render('cart/view', { title: 'Cart' });
};
exports.getCheckout = (req, res, next) => {
  res.render('cart/checkout', {
    title: 'Checkout',
    csrfToken: req.csrfToken()
  });
};
exports.getTest = (req, res, next) => {
  res.status(200).json({ cart: req.session.cart });
};
