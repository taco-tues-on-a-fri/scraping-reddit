const appRoot      =  require('app-root-path');
const async        =  require('async')
const rp           =  require('request-promise')
const Scrape       =  require(appRoot + '/models/scrape');
const asyncHandler =  require(appRoot + '/lib/async-handler');
require('express-async-errors');

//|--------------------------------------------------------------------------
//#region 

//#endregion
//|--------------------------------------------------------------------------


//|--------------------------------------------------------------------------
//#region 

//#endregion
//|--------------------------------------------------------------------------

//|--------------------------------------------------------------------------
//#region 

//#endregion
//|--------------------------------------------------------------------------

//|--------------------------------------------------------------------------
//#region request_url_03
let request_url_03 = async function (req, res, next) {
  let options = {
    method: 'GET',
    uri: req,
    json: true // Automatically stringifies the body to JSON
  };

  await rp(options)
    .then(json => res.json({ message: json }))
    .catch(err => next(err))
};



//#endregion
//|--------------------------------------------------------------------------


//|--------------------------------------------------------------------------
//#region request_url_02
// Works perfectly

exports.request_url_02 = async function (req, res, next) {
  let options = {
    method: 'GET',
    uri: 'https://www.reddit.com/r/ethtrader/comments/dsi7h0/a_dexag_story_by_scott_lewis/.json',
    json: true // Automatically stringifies the body to JSON
  };

  await rp(options)
    .then(json => res.json({ message: json }))
    .catch(err => next(err))
};

//#endregion
//|--------------------------------------------------------------------------



//|--------------------------------------------------------------------------
//#region request_url_01
// Doesn't work due to 'fetch'

exports.request_url_01 = async function (req, res, next) {
    const url = 'https://www.reddit.com/r/ethtrader/comments/dsi7h0/a_dexag_story_by_scott_lewis/.json';
    const response = await fetch(url);
    const json = response.json()
    .then(() => res.json({ message: json }) )
    
};

//#endregion
//|--------------------------------------------------------------------------







//|--------------------------------------------------------------------------
//#region Display home page

exports.index = function(req, res) {
  
  async.parallel({
    scrape_count: function(callback) {
      Scrape.countDocuments({}, callback);
    },
  }, function(err, results) {
    res.render('index', { title: "Scraping Reddit", error: err, data: results });
  })
};

//#endregion
//|--------------------------------------------------------------------------