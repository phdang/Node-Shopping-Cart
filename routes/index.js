var express = require('express');
var router = express.Router();
const ProductController = require('../controllers/product');
/* GET home page. */
router.get('/', ProductController.fetchProducts);

module.exports = router;
