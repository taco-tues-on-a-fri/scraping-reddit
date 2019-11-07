const appRoot   =  require('app-root-path');
const async     =  require('async');
const pushshift =  require(appRoot + '/lib/push-shift');
const request   =  require('request-promise-native');
const Scrape    =  require(appRoot + '/models/scrape');

const { body,validationResult } =  require('express-validator');
const { sanitizeBody }          =  require('express-validator');

//|--------------------------------------------------------------------------
//#region Display Scrape create form on GET
// Works

exports.scrape_create_get = function(req, res, next) {
  res.render('scrape_form', 
  {
    title: 'Create Scrape'
  }
  );
};

//#endregion
//|--------------------------------------------------------------------------

//|--------------------------------------------------------------------------
//#region  Original pushshift build scrape create POST | search_by_id_then_get_comments

// exports.scrape_create_post = pushshift.search_by_id_then_get_comments

//#endregion
//|--------------------------------------------------------------------------


//|--------------------------------------------------------------------------
//#region New Version of Scrape create POST | request_url_03 

// Works
exports.request_url_03 = async function (req, res, next) {
  let options = {
    method: 'GET',
    uri: req.body.form_response,
    json: true // Automatically stringifies the body to JSON
  };

  await request(options)
    .then(json => res.json({ message: json }))
    .catch(err => next(err))
};

//#endregion
//|--------------------------------------------------------------------------





//|--------------------------------------------------------------------------
//#region scrape_create_pushshift_promises_01
// CURRENT WORK AREA

const search_comments_by_identifier = function (handed_url) {
  let pushShift_url                =  'https://api.pushshift.io/reddit/';
  let comment_search_by_identifier =  'comment/search/?link_id=';
  let search_limit                 =  '&limit=20000';
  
  return pushShift_url + comment_search_by_identifier + handed_url.substring(44, 50) + search_limit;
};

// allThere = ((c) => !arr[0].includes(c))();

// incoming req = form fill in req.body.form_response with a value of 
// 'https://www.reddit.com/r/ethtrader/comments/dsi7h0/a_dexag_story_by_scott_lewis/


exports.pushshift_search_by_id_then_get_comments = async function (req, res, next) {
  let errors = validationResult(req);

  // let formatted_pushShift_comments = []   // probably not needed
  
  let url_container = {
    request_url: req.body.form_url,
    formatted_url: pushshift.search_comments_by_identifier(this.request_url)
      // returns: https://api.pushshift.io/reddit/comment/search/?link_id=7j0ec9&limit=20000
  }

  let options_01 = {
    method: 'GET',
    uri: url_container.formatted_url, //api.pushshift.io/reddit/comment/search/?link_id=7j0ec9&limit=20000
    json: true
  }

  request(options_01)
    .then(pushshift.comment_flattener_w_nested_generator())
    .then(json => res.json({ message: json }))
    .catch(err => next(err))
};


  // await request(options)
  //   .then(json => res.json({ message: json }))
  //   .catch(err => next(err))


//#endregion
//|--------------------------------------------------------------------------