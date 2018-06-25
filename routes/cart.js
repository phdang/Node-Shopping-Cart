var express = require('express');
var router = express.Router();
const isAuthenticated = require('../middleware/authenticated');
// Cart View Page
router.get('/view', (req, res, next) => {
  res.render('cart/view', { title: 'Cart' });
});

// router.get('/test', (req, res, next) => {
//   res.status(200).send({ cart: req.session.cart });
// });
module.exports = router;
