var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();
const ProductController = require('../controllers/product');
const AuthController = require('../controllers/auth');
router.use(csrfProtection);

/* GET home page. */
router.get('/', ProductController.fetchProducts);
router.get('/signup', AuthController.signup);

module.exports = router;
