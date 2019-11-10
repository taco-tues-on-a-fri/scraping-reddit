//|------------------------------------------------------------------------
//#region | module dependencies

const appRoot   =  require('app-root-path');
const async     =  require('async');
const pushshift =  require(appRoot + '/lib/push-shift');
const regex     =  require(appRoot + '/lib/regex');
const rp        =  require('request-promise-native');
const Scrape    =  require(appRoot + '/models/scrape');

const { body,validationResult } =  require('express-validator');
const { sanitizeBody }          =  require('express-validator');
require('express-async-errors');

//#endregion
//|------------------------------------------------------------------------


//|------------------------------------------------------------------------
//#region | LIVE | display scrape create form on GET | scrape_create_get
/**
|--------------------------------------------------------------------------
|  scrape_create_get
|--------------------------------------------------------------------------
|
*/

exports.scrape_create_get = function(req, res, next) {
  res.render('scrape_form', 
  {
    title: 'Create Scrape'
  }
  );
};

//#endregion
//|------------------------------------------------------------------------





//|------------------------------------------------------------------------
//#region | LIVE | promise version of scrape create POST | pushshift_search_by_id_then_get_comments
/**
|--------------------------------------------------------------------------
|  pushshift_search_by_id_then_get_comments
|--------------------------------------------------------------------------
| 
| incoming req = form fill in req.body.form_response with a value url string:
| https://www.reddit.com/r/ethtrader/comments/dsi7h0/a_dexag_story_by_scott_lewis/
|
| formatted_url: https://api.pushshift.io/reddit/comment/search/?link_id=7j0ec9&limit=20000
|
*/

exports.pushshift_search_by_id_then_get_comments = async function (req, res, next) {
  let errors = validationResult(req);

  let request_url = req.body.form_response
  let formatted_url= pushshift.search_comments_by_identifier(request_url)

  let options = {
    method: 'GET',
    uri: formatted_url,
    json: true
  }

  rp(options)
    .then(json => pushshift.comment_flattener_w_nested_generator(json))
    .then(json => res.json({ message: json }))
    .catch(err => next(err))
};
//#endregion
//|------------------------------------------------------------------------




//|------------------------------------------------------------------------
//#region | TEST | REGEX promise version of scrape create POST | regex_pushshift_search_by_id_then_get_comments
/**
|--------------------------------------------------------------------------
|  regex_pushshift_search_by_id_then_get_comments
|--------------------------------------------------------------------------
| 
| incoming req = form fill in req.body.form_response with a value url string:
| https://www.reddit.com/r/ethtrader/comments/dsi7h0/a_dexag_story_by_scott_lewis/
|
| formatted_url: https://api.pushshift.io/reddit/comment/search/?link_id=7j0ec9&limit=20000
|
*/

exports.regex_pushshift_search_by_id_then_get_comments = async function (req, res, next) {
  let errors = validationResult(req);

  let request_url = req.body.form_response
  let reddit_linkid = regex.reddit_url_parse(request_url)
  let formatted_url= pushshift.create_pushshift_url(reddit_linkid)

  let options = {
    method: 'GET',
    uri: formatted_url,
    json: true
  }

  rp(options)
    .then(json => pushshift.comment_flattener_w_nested_generator(json))
    .then(json => res.json({ message: json }))
    .catch(err => next(err))
};
//#endregion
//|------------------------------------------------------------------------




//|------------------------------------------------------------------------
//#region | LIVE | test version of scrape create POST | request_url_03 
/**
|--------------------------------------------------------------------------
|  request_url_03
|--------------------------------------------------------------------------
| 
|
*/

exports.request_url_03 = async function (req, res, next) {
  let options = {
    method: 'GET',
    uri: req.body.form_response,
    json: true 
  };

  await rp(options)
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

