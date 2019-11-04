const express =  require('express');
const router  =  express.Router();
const appRoot =  require('app-root-path');

const api_controller = require(appRoot + '/controllers/api_controller');

/**
|--------------------------------------------------------------------------
| Primary app routes
|--------------------------------------------------------------------------
*/

// GET home page 
router.get('/', api_controller.index);

module.exports = router;
