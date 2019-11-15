//|------------------------------------------------------------------------
//#region module dependencies

const express =  require('express');
const router  =  express.Router();
const appRoot =  require('app-root-path');

const scrape_controller = require(appRoot + '/controllers/scrape_controller');

//#endregion
//|------------------------------------------------------------------------


// GET | scrape_create_get
//|------------------------------------------------------------------------
router.get('/scrape/create', scrape_controller.scrape_create_get);


// POST | regex_pushshift_search_by_id_then_get_comments
//|------------------------------------------------------------------------
router.post('/scrape/create', scrape_controller.regex_pushshift_search_by_id_then_get_comments);


// GET | reddit_scrape_create_get
//|------------------------------------------------------------------------
router.get('/scrape/reddit_scrape_create', scrape_controller.scrape_create_get);


// POST | reddit_scrape_create_POST
//|------------------------------------------------------------------------
router.post('/scrape/reddit_scrape_create', scrape_controller.reddit_scrape);

// GET | pushshift_scrape_n_sort_get
//|------------------------------------------------------------------------
router.get('/scrape/pushshift_scrape_n_sort', scrape_controller.scrape_create_get);


// POST | pushshift_scrape_n_sort_POST
//|------------------------------------------------------------------------
router.post('/scrape/pushshift_scrape_n_sort', scrape_controller.pushshift_scrape_n_sort_post);
module.exports = router;


// GET | name
//|------------------------------------------------------------------------

// POST | name
//|------------------------------------------------------------------------
