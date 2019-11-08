//|------------------------------------------------------------------------
//#region module dependencies

const appRoot      =  require('app-root-path');
const async        =  require('async')
const rp           =  require('request-promise')
const Scrape       =  require(appRoot + '/models/scrape');
require('express-async-errors');

//#endregion
//|------------------------------------------------------------------------


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

//|------------------------------------------------------------------------
//#region | TEST | testing fs helper function | request_url_fs_save
/**
|--------------------------------------------------------------------------
|  request_url_fs_save
|--------------------------------------------------------------------------
| 
| options = {  path: '', read_file_name: '', data_to_push: []  }
|
*/

exports.request_url_fs_save = async function (req, res, next) {
  let options = {
    method: 'GET',
    uri: 'https://www.reddit.com/r/ethtrader/comments/dsi7h0/a_dexag_story_by_scott_lewis/.json',
    json: true 
  };

  let fs_options = {  
    path: '/logs/json/', 
    read_file_name: 'thrilling_woodcock.json', 
    data_to_push: []  
  }

  await rp(options)
    .then(data => fs_options.data_to_push = data) 
    .then(json => res.json({ message: json }))
    .catch(err => next(err))
  };
  
  // .then(json => pushshift.comment_flattener_w_nested_generator(json))
//#endregion
//|------------------------------------------------------------------------




//|------------------------------------------------------------------------
//#region | LIVE | Working test of request-promise | request_url_02
/**
|--------------------------------------------------------------------------
|  request_url_02
|--------------------------------------------------------------------------
|
*/

exports.request_url_02 = async function (req, res, next) {
  let options = {
    method: 'GET',
    uri: 'https://www.reddit.com/r/ethtrader/comments/dsi7h0/a_dexag_story_by_scott_lewis/.json',
    json: true 
  };

  await rp(options)
    .then(json => res.json({ message: json }))
    .catch(err => next(err))
};
//#endregion
//|------------------------------------------------------------------------




//|------------------------------------------------------------------------
//#region | ERROR | Doesn't work due to 'fetch' | request_url_01
/**
|--------------------------------------------------------------------------
|  request_url_01
|--------------------------------------------------------------------------
|
*/

exports.request_url_01 = async function (req, res, next) {
  const url = 'https://www.reddit.com/r/ethtrader/comments/dsi7h0/a_dexag_story_by_scott_lewis/.json';
  const response = await fetch(url);
  const json = response.json()
  .then(() => res.json({ message: json }) )
  
};
//#endregion
//|------------------------------------------------------------------------




//|------------------------------------------------------------------------
//#region | LIVE | Display home page | index
/**
|--------------------------------------------------------------------------
|  index
|--------------------------------------------------------------------------
|
*/

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
//|------------------------------------------------------------------------


//|------------------------------------------------------------------------
//#region | BLANK | description | function_name
/**
|--------------------------------------------------------------------------
|  function_name
|--------------------------------------------------------------------------
|
*/

// exports.function_name = function(req, res, next) {
//   res.render('scrape_form', 
//   {
//     title: 'Create Scrape'
//   }
//   );
// };

//#endregion
//|------------------------------------------------------------------------