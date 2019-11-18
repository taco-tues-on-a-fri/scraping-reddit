//|------------------------------------------------------------------------
//#region | module dependencies

const appRoot   =  require('app-root-path');
const async     =  require('async');
const helper    =  require(appRoot + '/lib/helper');
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
    "scrape-title": 'Create Scrape'
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
  const request_url = req.body.form_response;
  
  rp({ uri: reddit.create_reddit_url(request_url, reddit.sort_method.sort_best), json: true })
    .then(json => reddit.flatten_comments_w_nested_generator(json))
    .then(json => res.json({ message: json }))
    .catch(err => next(err))

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
    .then(json => pushshift.comment_flattener_w_nested_generator(json))
    .then(json => res.json({ message: json }))
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
    .then(json => pushshift.comment_flattener_w_nested_generator(json))
    .then(json => res.json({ message: json }))
    .catch(err => next(err))
};
//#endregion
//|------------------------------------------------------------------------






//|------------------------------------------------------------------------
//#region | BUILD | response form REGEX promise version of scrape create POST | pushshift_response
/**
|--------------------------------------------------------------------------
|  pushshift_response
|--------------------------------------------------------------------------
| 
| incoming req = form fill in req.body.form_response with a value url string:
| https://www.reddit.com/r/ethtrader/comments/dsi7h0/a_dexag_story_by_scott_lewis/
|
| formatted_url: https://api.pushshift.io/reddit/comment/search/?link_id=7j0ec9&limit=20000
|
*/

exports.pushshift_response = async function (req, res, next) {
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
    .then(json => pushshift.comment_flattener_w_nested_generator(json))
    .then(json => res.render("scrape_response", 
      { 
        title: "Scrape time bb",
        data: json 
      }))
    .catch(err => next(err))
};
//#endregion
//|------------------------------------------------------------------------





//|------------------------------------------------------------------------
//#region | LIVE | pushshift_scrape_n_sort_post | pushshift_scrape_n_sort_post
/**
|--------------------------------------------------------------------------
|  pushshift_scrape_n_sort_post
|--------------------------------------------------------------------------
|
*/

exports.pushshift_scrape_n_sort_post = async function (req, res, next) {
  
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
    .then(json => pushshift.comment_flattener_w_nested_generator(json)) //TODO Change this function name to be same as reddit's version
    .then(json => helper.reduce_comments_by_author(json))
    .then(json => res.json({ message: json }))
    .catch(err => next(err))
};

//#endregion
//|------------------------------------------------------------------------





//|------------------------------------------------------------------------
//#region | BUILD | reddit_scrape_n_sort_post | reddit_scrape_n_sort_post
/**
|--------------------------------------------------------------------------
|  reddit_scrape_n_sort_post
|--------------------------------------------------------------------------
|
| //TODO  post_info within generator might break the sorter. test and confirm
|
|
*/

exports.reddit_scrape_n_sort_post = async function (req, res, next) {
  
  const errors = validationResult(req);  // TODO finish adding the full validation code

  const request_url = req.body.form_response

  rp({ uri: reddit.create_reddit_url(request_url, reddit.sort_method.sort_best), json: true })
    .then(json => reddit.flatten_comments_w_nested_generator(json))
    .then(json => helper.reduce_comments_by_author(json))
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

