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


// POST | regex_pushshift_search_by_id_then_get_comments //TODO final version - in use - rename to shorter list name
//|------------------------------------------------------------------------
router.post('/scrape/create', scrape_controller.regex_pushshift_search_by_id_then_get_comments);


// GET | reddit_scrape_create_get //TODO final version - probably delete
//|------------------------------------------------------------------------
router.get('/scrape/reddit_scrape_create', scrape_controller.scrape_create_get);


// POST | reddit_scrape_create_POST //TODO final version - In Use - maybe rename to list
//|------------------------------------------------------------------------
router.post('/scrape/reddit_scrape_create', scrape_controller.reddit_scrape);

// GET | pushshift_scrape_n_sort_get //TODO final version - Delete
//|------------------------------------------------------------------------
router.get('/scrape/pushshift_scrape_n_sort', scrape_controller.scrape_create_get);


// POST | pushshift_scrape_n_sort_POST //TODO final version - In use
//|------------------------------------------------------------------------
router.post('/scrape/pushshift_scrape_n_sort', scrape_controller.pushshift_scrape_n_sort_post);


// GET | reddit_scrape_n_sort_get //TODO final version - Delete
//|------------------------------------------------------------------------
router.get('/scrape/reddit_scrape_n_sort', scrape_controller.scrape_create_get);


// POST | reddit_scrape_n_sort_POST  //TODO final version - In use
//|------------------------------------------------------------------------
router.post('/scrape/reddit_scrape_n_sort', scrape_controller.reddit_scrape_n_sort_post);

// GET | test_response_get //TODO final version - Delete
//|------------------------------------------------------------------------
router.get('/scrape/test_response', scrape_controller.scrape_create_get);


// POST | test_response_POST  //TODO final version - In use
//|------------------------------------------------------------------------
router.post('/scrape/test_response', scrape_controller.pushshift_response);

module.exports = router;



// GET | name
//|------------------------------------------------------------------------

// POST | name
//|------------------------------------------------------------------------
