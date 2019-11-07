const appRoot      =  require('app-root-path');
const async        =  require('async');
const rp           =  require('request-promise')
const Scrape       =  require(appRoot + '/models/scrape');




//|--------------------------------------------------------------------------
//#region request_url_helper-a-fy

let request_url = async function (handed_url) {
  try {
    let options = {
      method: 'GET',
      uri: handed_url,
      json: true // Automatically stringifies the body to JSON
    };

    let request_json = await rp(options)
    .then(function (results) {
      return request_json
  })} catch(err) {
      return next(err)
    }
};

//#endregion
//|--------------------------------------------------------------------------


//|--------------------------------------------------------------------------
//#region request_url_03

exports.request_url_03 = async function (req, res, next) {
  let url = 'https://www.reddit.com/r/ethtrader/comments/dsi7h0/a_dexag_story_by_scott_lewis/.json',
  try {
    const request_url = await request_url(url)
    .then(json => res.json({ message: json }))
  } catch(err) {
    return next(err)
  }
};

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