var csrf = require('csurf');
var bodyParser = require('body-parser');
// setup route middlewares
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });
var express = require('express');
var router = express.Router();
const redirectIfAuth = require('../middleware/redirectIfAuthenticated');
const isAuthenticated = require('../middleware/authenticated');
const ProductController = require('../controllers/product');
const AuthController = require('../controllers/auth');
const redirectCheckout = require('../middleware/redirectCheckout');

router.use(csrfProtection);
/* GET home page. */
router.get('/', ProductController.fetchProducts);
// Add cart
router.post('/addCart', ProductController.addCart);
//remove Iems
router.get('/removeProduct/:productId', ProductController.removeItems);
// Authentication page
router.get('/signup', redirectIfAuth, AuthController.getSignup);
router.post(
  '/signup',
  redirectIfAuth,
  parseForm,
  AuthController.postSignup,
  redirectCheckout
);
router.get('/signin', redirectIfAuth, AuthController.getSignin);
router.post(
  '/signin',
  redirectIfAuth,
  parseForm,
  AuthController.postSignin,
  redirectCheckout
);
router.get('/signout', isAuthenticated, AuthController.getSignout);

module.exports = router;
