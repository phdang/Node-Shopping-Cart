var express = require('express');
var router = express.Router();
const ProductController = require('../controllers/product');

// Add cart
router.post('/addCart', ProductController.addCart);
//remove Iems
router.get('/remove/:productId', ProductController.removeItems);
//update Iems
router.patch('/update', ProductController.updateItems);
module.exports = router;
