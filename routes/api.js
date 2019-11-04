const express =  require('express');
const router  =  express.Router();
const appRoot =  require('app-root-path');
const { body,validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');


const api_controller = require(appRoot + '/controllers/api_controller');
const scrape_controller = require(appRoot + '/controllers/scrape_controller');
/**
|--------------------------------------------------------------------------
| Primary app routes
|--------------------------------------------------------------------------
*/

// GET home page 
router.get('/', api_controller.index);

module.exports = router;
