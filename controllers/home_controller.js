//|------------------------------------------------------------------------
//#region module dependencies

const appRoot  =  require('app-root-path');
const async    =  require('async')
const helper   =  require(appRoot + '/lib/helper');
const rp       =  require('request-promise')
const Scrape   =  require(appRoot + '/models/scrape');

require('express-async-errors');
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
//#region | TEST |  testing fs helper function | request_url_fs_save
/**
|--------------------------------------------------------------------------
|  request_url_fs_save
|--------------------------------------------------------------------------
| 
|
*/

exports.request_url_fs_save = async function (req, res, next) {
  let options = {
    method: 'GET',
    uri: 'https://www.reddit.com/r/ethtrader/comments/dtdsmm/ethereum_istanbul_hard_fork_release_date/',
    json: true
  };

  let file_name = 'thrilling_woodcock.json' 


  await rp(options)
    .then(json => helper.fs_read_write_02(file_name, json)) 
    .then(json => res.json({ message: json }))
    .catch(err => next(err))

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