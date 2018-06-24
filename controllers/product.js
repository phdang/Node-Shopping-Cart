const Product = require('../models/product');
//csrf protection
var csrf = require('csurf');
var csrfProtection = csrf();
exports.fetchProducts = async function(req, res, next) {
  const products = await Product.find();
  res.render('shop/index', {
    title: 'Shopping Cart',
    products: products,
    csrfToken: req.csrfToken()
  });
};
