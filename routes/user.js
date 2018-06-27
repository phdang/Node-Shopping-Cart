var express = require('express');
var router = express.Router();
const Order = require('../models/order');
const isAuthenticated = require('../middleware/authenticated');
// User profile Page
router.get('/profile', isAuthenticated, async (req, res, next) => {
  const orders = await Order.find({ _user: req.session.auth.id })
    .sort({ _id: -1 })
    .select('cart purchasedAt');
  const carts = orders.map(order => {
    return { ...JSON.parse(order.cart), purchasedAt: order.purchasedAt };
  });
  res.render('orders/orders', { title: 'Profile', carts: carts });
});
module.exports = router;
