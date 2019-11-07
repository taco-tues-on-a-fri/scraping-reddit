const express =  require('express');
const router  =  express.Router();
const appRoot =  require('app-root-path');
const rp      =  require('request-promise')
const { body,validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');



const home_controller = require(appRoot + '/controllers/home_controller');
const scrape_controller = require(appRoot + '/controllers/scrape_controller');
/**
|--------------------------------------------------------------------------
| Primary app routes
|--------------------------------------------------------------------------
*/

// GET home page 
router.get('/', home_controller.index);

router.get('/request_url_01', home_controller.request_url_01);

router.get('/request_url_02', home_controller.request_url_02);

router.get('/request_url_03', home_controller.request_url_03);

module.exports = router;
