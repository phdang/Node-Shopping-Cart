var csrf = require('csurf');
var bodyParser = require('body-parser');
// setup route middlewares
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });
var express = require('express');
var router = express.Router();
const ProductController = require('../controllers/product');
const AuthController = require('../controllers/auth');
router.use(csrfProtection);
/* GET home page. */
router.get('/', ProductController.fetchProducts);
// Authentication page
router.get('/signup', AuthController.getSignup);
router.post('/signup', parseForm, AuthController.postSignup);
router.get('/signin', AuthController.getSignin);
router.post('/signin', parseForm, AuthController.postSignin);

module.exports = router;
