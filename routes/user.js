var express = require('express');
var router = express.Router();
// User profile Page
router.get('/profile', (req, res, next) => {
  res.render('user/profile', { title: 'Profile' });
});
module.exports = router;
