const Product = require('../models/product');
exports.fetchProducts = async function(req, res, next) {
  const products = await Product.find();
  res.render('shop/index', {
    title: 'Shopping Cart',
    csrfToken: req.csrfToken(),
    products: products
  });
};
