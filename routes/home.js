const express =  require('express');
const router  =  express.Router();
const appRoot =  require('app-root-path');
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

module.exports = router;
