const express =  require('express');
const router  =  express.Router();

// GET redirect to /api
router.get('/', function(req, res, next) {
  res.redirect('/api');
});

module.exports = router;
