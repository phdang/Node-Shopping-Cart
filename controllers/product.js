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
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(productId, function(err, product) {
    if (err) {
      return res.status(404).send({ message: 'Product Not Found' });
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    //console.log(req.session.cart);
    res.json({ count: Object.keys(cart.items).length });
  });
};
exports.removeItems = (req, res, next) => {
  var productId = req.params.productId;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(productId, function(err, product) {
    if (err) {
      return res.redirect('/cart/view');
    }
    cart.removeItem(product.id);
    if (cart.totalQty) {
      req.session.cart = cart;
    } else {
      //no item left destroy session cart
      req.session.cart = null;
    }

    //console.log(req.session.cart);
    return res.redirect('/cart/view');
  });
};
