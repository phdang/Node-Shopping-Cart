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
// Authentication page
router.get('/signup', redirectIfAuth, AuthController.getAdminSignup);
router.post(
  '/signup',
  redirectIfAuth,
  parseForm,
  AuthController.postAdminSignup
);
router.get('/signin', redirectIfAuth, AuthController.getAdminSignin);
router.post(
  '/signin',
  redirectIfAuth,
  parseForm,
  AuthController.postAdminSignin
);
module.exports = router;
