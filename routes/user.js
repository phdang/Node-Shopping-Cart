var express = require('express');
var router = express.Router();
const isAuthenticated = require('../middleware/authenticated');
// User profile Page
router.get('/profile', isAuthenticated, (req, res, next) => {
  res.render('user/profile', { title: 'Profile' });
});
module.exports = router;
