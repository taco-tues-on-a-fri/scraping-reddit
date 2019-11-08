//|------------------------------------------------------------------------
//#region module dependencies

const express =  require('express');
const router  =  express.Router();
// const appRoot =  require('app-root-path');
// const rp      =  require('request-promise');

// const { body,validationResult } =  require('express-validator');
// const { sanitizeBody }          =  require('express-validator');

// const home_controller   =  require(appRoot + '/controllers/home_controller');
// const scrape_controller =  require(appRoot + '/controllers/scrape_controller');

//#endregion
//|------------------------------------------------------------------------


// GET | NOT IMPLEMENTED
//|------------------------------------------------------------------------
router.get('/', function(req, res, next) {
  res.send('Not Implemented');
});


module.exports = router;


// GET | name
//|------------------------------------------------------------------------

// POST | name
//|------------------------------------------------------------------------
