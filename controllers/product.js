const Product = require('../models/product');
const Cart = require('../models/cart');

exports.fetchProducts = async function(req, res, next) {
  const messageType = req.flash('messageType')[0];
  const paymentMessages = req.flash('payment');
  const products = await Product.find();
  res.render('shop/index', {
    title: 'Shopping Cart',
    csrfToken: req.csrfToken(),
    products: products,
    messages: paymentMessages,
    messageType: messageType
  });
};
exports.addCart = (req, res, next) => {
  var productId = req.body.productId;
  var cart = new Cart(req.session.cart ? req.session.cart.items : {});
  Product.findById(productId, function(err, product) {
    cart.add(product, product.id);
    req.session.cart = cart;
    res.status(200).send({ count: Object.keys(cart.items).length });
  });
};
