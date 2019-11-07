const appRoot      =  require('app-root-path');
const async        =  require('async')
const rp           =  require('request-promise')
const Scrape       =  require(appRoot + '/models/scrape');
const asyncHandler =  require(appRoot + '/lib/async-handler');
// require('express-async-errors');

//|--------------------------------------------------------------------------
//#region request_url_helper-a-fy - regular function version

let request_url = function (handed_url) {
  let options = {
    method: 'GET',
    uri: handed_url,
    json: true // Automatically stringifies the body to JSON
  };

  rp(options)
  .then(function (results) {
    return results
  }) .catch(err => next(err))

};

//#endregion
//|--------------------------------------------------------------------------


//|--------------------------------------------------------------------------
//#region request_url_helper-a-fy - async version
// asyncHandler(async(req, res) => {
//      const result = await request('http://example.com');
//      res.end(result);
//    }));

let async_request_url = asyncHandler(async function (handed_url) {
  let options = {
    method: 'GET',
    uri: handed_url,
    json: true // Automatically stringifies the body to JSON
  };

  await rp(options)
  .then(function (results) {
    return results
  }) .catch(err => next(err))

});

//#endregion
//|--------------------------------------------------------------------------


//|--------------------------------------------------------------------------
//#region request_url_03

exports.request_url_03 = asyncHandler(async function(req, res) {
  let url = 'https://www.reddit.com/r/ethtrader/comments/dsi7h0/a_dexag_story_by_scott_lewis/.json'

  const response_url = await request_url(url)
  .then(response_url => res.json({ message: response_url }))
  .catch(err => next(err))
})

  

  // await rp(options)
  //   .then(json => res.json({ message: json }))
  //   .catch(err => next(err))

//#endregion
//|--------------------------------------------------------------------------


//|--------------------------------------------------------------------------
//#region request_url_02

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