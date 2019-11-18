//| module dependencies
//|------------------------------------------------------------------------
const express =  require('express');
const router  =  express.Router();
const appRoot =  require('app-root-path');
const rp      =  require('request-promise');

const { body,validationResult } =  require('express-validator');
const { sanitizeBody }          =  require('express-validator');

const home_controller   =  require(appRoot + '/controllers/home_controller');
const scrape_controller =  require(appRoot + '/controllers/scrape_controller');

// GET | index
//|------------------------------------------------------------------------
router.get('/', home_controller.index);

// POST | list_reddit_POST 
//|------------------------------------------------------------------------
router.post('/list_reddit', scrape_controller.list_reddit);

// POST | reddit_sort_POST  
//|------------------------------------------------------------------------
router.post('/reddit_sort', scrape_controller.reddit_sort);






// GET | TEST | request_url_fs_save
//|------------------------------------------------------------------------
router.get('/request_url_fs_save', home_controller.request_url_fs_save);



module.exports = router;


// GET | name
//|------------------------------------------------------------------------

// POST | name
//|------------------------------------------------------------------------