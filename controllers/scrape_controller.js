//|------------------------------------------------------------------------
//#region | module dependencies

const appRoot   =  require('app-root-path');
const async     =  require('async');
const pushshift =  require(appRoot + '/lib/push-shift');
const reddit    =  require(appRoot + '/lib/reddit');
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
//#region | BUILD | promise version of REDDIT scrape create POST | reddit_scrape
/**
|--------------------------------------------------------------------------
|  reddit_scrape
|--------------------------------------------------------------------------
|
| NOTES:  might have an issue with how to hand the different urls to rp(options) Object, can i name it different ones?
|
*/

exports.reddit_scrape = async function (req, res, next) {
  let errors = validationResult(req);  //TODO missing first half of the validation

  const request_url = req.body.form_response;
  
  console.log(`request url: ${request_url}`)
  console.log(`create_url: ${reddit.create_reddit_url(request_url, reddit.sort_method.sort_best)}`)

  // const sort_best = rp({ uri: create_reddit_url(request_url, reddit.sort_best), json: true })
  rp({ uri: reddit.create_reddit_url(request_url, reddit.sort_method.sort_best), json: true })
    .then(json => reddit.flatten_comments_w_nested_generator(json))
    // <--- Once working set each promise to resolve - then reduce ---->
    .then(json => res.json({ message: json }))
    .catch(err => next(err))


  // rp(options)
  //   .then(json => pushshift.flatten_comments_w_nested_generator(json))
  //   .then(json => res.json({ message: json }))
  //   .catch(err => next(err))
};
//#endregion
//|------------------------------------------------------------------------





//|------------------------------------------------------------------------
//#region | OUTDATED | promise version of scrape create POST | pushshift_search_by_id_then_get_comments
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
    .then(json => pushshift.retrieve_comments_w_nested_generator(json))
    .then(json => res.json({ message: json }))
    .catch(err => next(err))
};
//#endregion
//|------------------------------------------------------------------------





//|------------------------------------------------------------------------
//#region | TEST |  PUG regex promise scrape create POST | pug_pushshift_search_by_id_then_get_comments
/**
|--------------------------------------------------------------------------
|  pug_pushshift_search_by_id_then_get_comments
|--------------------------------------------------------------------------
| 
| incoming req = form fill in req.body.form_response with a value url string:
| https://www.reddit.com/r/ethtrader/comments/dsi7h0/a_dexag_story_by_scott_lewis/
|
| formatted_url: https://api.pushshift.io/reddit/comment/search/?link_id=7j0ec9&limit=20000
|
*/

exports.pug_pushshift_search_by_id_then_get_comments = async function (req, res, next) {
  let errors = validationResult(req);

  let request_url = req.body.form_response
  let reddit_linkid = regex.reddit_linkid(request_url)
  let formatted_url= pushshift.create_pushshift_url(reddit_linkid)

  let options = {
    method: 'GET',
    uri: formatted_url,
    json: true
  }

  rp(options)
    .then(json => pushshift.retrieve_comments_w_nested_generator(json))
    .then(json => res.render('scrape_json', { title: 'Scrape JSON', json_data: json }))
    .catch(err => next(err))
};

//#endregion
//|------------------------------------------------------------------------



//|------------------------------------------------------------------------
//#region | LIVE | REGEX promise version of scrape create POST | regex_pushshift_search_by_id_then_get_comments
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
  let reddit_linkid = regex.reddit_linkid(request_url)
  let formatted_url= pushshift.create_pushshift_url(reddit_linkid)

  let options = {
    method: 'GET',
    uri: formatted_url,
    json: true
  }

  rp(options)
    .then(json => pushshift.retrieve_comments_w_nested_generator(json))
    .then(json => res.json({ message: json }))
    .catch(err => next(err))
};
//#endregion
//|------------------------------------------------------------------------









//|------------------------------------------------------------------------
//#region | OUTDATED | test version of scrape create POST | request_url_03 
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

