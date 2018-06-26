var express = require('express');
var router = express.Router();
const isAuthenticated = require('../middleware/authenticated');
const isCartEmpty = require('../middleware/cartEmpty');
const CartController = require('../controllers/cart');
// Cart View Page
router.get('/view', CartController.getCartView);
router.get(
  '/checkout',
  isAuthenticated,
  isCartEmpty,
  CartController.getCheckout
);

// router.get('/test', CartController.getTest);
module.exports = router;
