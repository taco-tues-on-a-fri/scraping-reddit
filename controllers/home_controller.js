//|------------------------------------------------------------------------
//#region module dependencies

const appRoot      =  require('app-root-path');
const async        =  require('async')
const helper       =  require(appRoot + '/lib/helper');
const regex        =  require(appRoot + '/lib/regex');
const rp           =  require('request-promise')
const Scrape       =  require(appRoot + '/models/scrape');
const URLToolkit   =  require('url-toolkit');

require('express-async-errors');
//#endregion
//|------------------------------------------------------------------------






//|------------------------------------------------------------------------
//#region | IDEA | parse reddit url with REGEX  | parse_reddit_regex_01
/**
|--------------------------------------------------------------------------
|  parse_reddit_regex_01
|--------------------------------------------------------------------------
|
| Notes:
|  Python regex - delimiter issue
| (^https?://)?(\w+)?\.?(reddit\.com/|redd\.it/)(r/\w+/)?(comments/)?(\w+)
|
|
|
*/

exports.parse_reddit_regex_01 = function(req, res, next) {
  let reddit_url = 'https://www.reddit.com/r/ethtrader/comments/dsi7h0/a_dexag_story_by_scott_lewis/.json'
  let parsed_url = URLToolkit.parseURL(reddit_url);
  
  let regex_groups = regex.reddit_url_parse(reddit_url)

  console.log(regex_groups)
  res.json({  message: regex_groups });
};

//#endregion
//|------------------------------------------------------------------------









//|------------------------------------------------------------------------
//#region | IDEA | parse reddit url with URLToolkit  | parse_reddit_url
/**
|--------------------------------------------------------------------------
|  parse_reddit_url
|--------------------------------------------------------------------------
|
| works but only outputs:
| {
|  scheme: 'https:',
|  netLoc: '//www.reddit.com',
|  path: '/r/ethtrader/comments/dsi7h0/a_dexag_story_by_scott_lewis/.json',
|  params: '',
|  query: '',
|  fragment: ''
| }
|
*/

exports.parse_reddit_url = function(req, res, next) {
  let reddit_url = 'https://www.reddit.com/r/ethtrader/comments/dsi7h0/a_dexag_story_by_scott_lewis/.json'
  let  parsed_url = URLToolkit.parseURL(reddit_url); 

  console.log(parsed_url)
  res.json({  message: parsed_url });
};

//#endregion
//|------------------------------------------------------------------------



//|------------------------------------------------------------------------
//#region | TEST | 03 attempt - testing fs helper function | request_url_fs_save_03
/**
|--------------------------------------------------------------------------
|  request_url_fs_save_03
|--------------------------------------------------------------------------
| 
|  This attempt is to take the json formatting away from request-promise module
|  Ended in failure.  Still getting circular errors.
|  Code editor is acting weird too - lagging, port issues, and terminal isn't auto scrolling consistently
|
|  update: aiming to comment out the response json and just try to write the file.
|
*/

exports.request_url_fs_save_03 = async function (req, res, next) {
  let options = {
    method: 'GET',
    uri: 'https://www.reddit.com/r/ethtrader/comments/dsi7h0/a_dexag_story_by_scott_lewis/.json',
    json: false
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
//#region | TEST | 02 attempt - testing fs helper function | request_url_fs_save_02
/**
|--------------------------------------------------------------------------
|  request_url_fs_save_02
|--------------------------------------------------------------------------
| 
| options = {  path: '', read_file_name: '', data_to_push: []  }
|
*/

exports.request_url_fs_save_02 = async function (req, res, next) {
  let options = {
    method: 'GET',
    uri: 'https://www.reddit.com/r/ethtrader/comments/dsi7h0/a_dexag_story_by_scott_lewis/.json',
    json: true
  };

  let file_name = 'thrilling_woodcock.json' 


  await rp(options)
    .then(json => helper.fs_read_write_02(file_name, json)) 
    // .then(json => res.json({ message: json }))
    .then(json => res.json({ message: json }))
    .catch(err => next(err))

};
//#endregion
//|------------------------------------------------------------------------




//|------------------------------------------------------------------------
//#region | TEST | 02 attempt - testing fs helper function | request_url_fs_save_02
/**
|--------------------------------------------------------------------------
|  request_url_fs_save_02
|--------------------------------------------------------------------------
| 
| options = {  path: '', read_file_name: '', data_to_push: []  }
|
*/

exports.request_url_fs_save_02 = async function (req, res, next) {
  let options = {
    method: 'GET',
    uri: 'https://www.reddit.com/r/ethtrader/comments/dsi7h0/a_dexag_story_by_scott_lewis/.json',
    json: true
  };

  let file_name = 'thrilling_woodcock.json' 


  await rp(options)
    .then(json => helper.fs_read_write_02(file_name, json)) 
    .then(() => res.json({ message: 'success?' }))
    .catch(err => next(err))

};
//#endregion
//|------------------------------------------------------------------------






//|------------------------------------------------------------------------
//#region | TEST | testing fs helper function | request_url_fs_save_01
/**
|--------------------------------------------------------------------------
|  request_url_fs_save_01
|--------------------------------------------------------------------------
| 
| options = {  path: '', read_file_name: '', data_to_push: []  }
|
*/

exports.request_url_fs_save_01 = async function (req, res, next) {
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

  // await rp(options)
  //   .then(function(json) {
  //       return json;
  //   })
  //   .catch(function(e) {
  
  // // });
  // //   .then(data => fs_options.data_to_push = data) 
  // //   .then(x => helper.fs_read_write(x)) 
  // //   .then(json => res.json({ message: json }))
  // //   .catch(err => next(err))
  // };
}
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