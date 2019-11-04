const express =  require('express');
const router  =  express.Router();
const appRoot =  require('app-root-path');

const api_controller = require(appRoot + '/controllers/api_controller');
const scrape_controller = require(appRoot + '/controllers/scrape_controller');

router.get('/', function(req, res, next) {
  res.send('Not Implemented');
});

// GET/POST request for creating a Scrape
// ! Must come before routes that display Scrape (uses _id).
router.get('/scrape/create', scrape_controller.scrape_create_get);
// router.post('/scrape/create', scrape_controller.scrape_create_post);


// GET/POST request to delete Scrape
// router.get('/scrape/:id/delete', scrape_controller.scrape_delete_get);
// router.post('/scrape/:id/delete', scrape_controller.scrape_delete_post);

module.exports = router;
