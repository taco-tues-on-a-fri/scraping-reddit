const express =  require('express');
const router  =  express.Router();
const appRoot =  require('app-root-path');

const { body,validationResult } =  require('express-validator');
const { sanitizeBody }          =  require('express-validator');

const home_controller   =  require(appRoot + '/controllers/home_controller');
const scrape_controller =  require(appRoot + '/controllers/scrape_controller');

// GET | index
//|------------------------------------------------------------------------
router.get('/', home_controller.index);

// POST | reddit_list
//|------------------------------------------------------------------------
router.post('/reddit_list', scrape_controller.reddit_list);

// POST | reddit_sort
//|------------------------------------------------------------------------
router.post('/reddit_sort', scrape_controller.reddit_sort);

// POST | pushshift_list
//|------------------------------------------------------------------------
router.post('/pushshift_list', scrape_controller.pushshift_list);

// POST | pushshift_sort 
//|------------------------------------------------------------------------
router.post('/pushshift_sort', scrape_controller.pushshift_sort);

module.exports = router;