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
router.use(csrfProtection);
/* GET home page. */
router.get('/', ProductController.fetchProducts);
// Authentication page
router.get('/signup', redirectIfAuth, AuthController.getSignup);
router.post('/signup', redirectIfAuth, parseForm, AuthController.postSignup);
router.get('/signin', redirectIfAuth, AuthController.getSignin);
router.post('/signin', redirectIfAuth, parseForm, AuthController.postSignin);
router.get('/signout', isAuthenticated, AuthController.getSignout);
module.exports = router;
