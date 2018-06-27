var stripe = require('stripe')(process.env.STRIPE_KEY);
const Order = require('../models/order');
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
exports.postCheckout = async (req, res) => {
  const charge = await stripe.charges.create({
    amount: parseInt(Number(req.session.cart.totalPrice.toFixed(2)) * 100),
    currency: 'usd',
    source: req.body.stripeToken, // obtained with Stripe.js
    description:
      'Name: ' +
      req.body.name +
      ' Address: ' +
      req.body.address +
      ' mobile: ' +
      req.body.mobile
  });
  if (charge) {
    const order = new Order({
      name: req.body.name,
      address: req.body.address,
      country: req.body.country,
      mobile: req.body.mobile,
      cart: JSON.stringify(req.session.cart),
      charge: charge.id,
      purchasedAt: new Date().toLocaleString(),
      _user: req.session.auth.id
    });
    const result = await order.save();
    if (result) {
      req.session.cart = null;
      req.flash('payment', 'Payment Successful');
      req.flash('messageType', true);
      res.redirect('/');
    } else {
      req.flash('payment', 'An Error Occurs Payment Failed');
      req.flash('messageType', false);

      res.redirect('/cart/checkout');
    }
  }
};
