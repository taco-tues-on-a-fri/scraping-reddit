//|------------------------------------------------------------------------
//#region module dependencies

const express =  require('express');
const router  =  express.Router();
const appRoot =  require('app-root-path');
const rp      =  require('request-promise');

const { body,validationResult } =  require('express-validator');
const { sanitizeBody }          =  require('express-validator');

const home_controller   =  require(appRoot + '/controllers/home_controller');
const scrape_controller =  require(appRoot + '/controllers/scrape_controller');

//#endregion
//|------------------------------------------------------------------------


// GET | index
//|------------------------------------------------------------------------
router.get('/', home_controller.index);


// GET | request_url_01
//|------------------------------------------------------------------------
router.get('/request_url_01', home_controller.request_url_01);


// GET | request_url_02
//|------------------------------------------------------------------------
router.get('/request_url_02', home_controller.request_url_02);


// GET | request_url_fs_save_01
//|------------------------------------------------------------------------
router.get('/request_url_fs_save_01', home_controller.request_url_fs_save_01);


// GET | request_url_fs_save_02
//|------------------------------------------------------------------------
router.get('/request_url_fs_save_02', home_controller.request_url_fs_save_02);

// GET | request_url_04
//|------------------------------------------------------------------------
// router.get('/request_url_04', home_controller.request_url_04);


module.exports = router;

// GET | name
//|------------------------------------------------------------------------

// POST | name
//|------------------------------------------------------------------------