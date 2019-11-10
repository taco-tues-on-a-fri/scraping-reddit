/**
|--------------------------------------------------------------------------
| Pushshift helper functions
|--------------------------------------------------------------------------
*/

//|------------------------------------------------------------------------
//#region module dependencies
const appRoot =  require('app-root-path');
const async   =  require('async');
const moment  =  require('moment');
const request =  require('request');
// eslint-disable-next-line no-unused-vars
const rp      =  require('request-promise');
const Scrape  =  require(appRoot + '/models/scrape');

const { body,validationResult } =  require('express-validator');
const { sanitizeBody }          =  require('express-validator');
//#endregion
//|------------------------------------------------------------------------





//|------------------------------------------------------------------------
//#region create_pushshift_url function
/**
|--------------------------------------------------------------------------
| Query Pushshift using submission _id from url string.
|--------------------------------------------------------------------------
| 
|
| Insert reddit submission _id into pushshift query url string .
|
| returns:
| https://api.pushshift.io/reddit/comment/search/?link_id=7j0ec9&limit=20000
|
*/

const create_pushshift_url = function (handed_url) {
  let pushShift_url                =  'https://api.pushshift.io/reddit/';
  let comment_search_by_identifier  =  'comment/search/?link_id=';
  let search_limit                 =  '&limit=20000';
  
  return pushShift_url + comment_search_by_identifier + handed_url + search_limit;
};

//#endregion
//|------------------------------------------------------------------------





//|------------------------------------------------------------------------
//#region formatted_comments_generator function
/**
|--------------------------------------------------------------------------
| Generator that scrapes Reddit JSON and returns formatted comments.
|--------------------------------------------------------------------------
| //TODO Update the for loop to new syntax
|
| @param {Object} comments - comment object.
| @yields {Object}
|
*/

const formatted_comments_generator = function* (comments) {
  for (let i = 0; i < comments.length; i++) {
    let commentMeta = comments[i];

    let formated_utc       =  moment(commentMeta.created_utc*1000).format();
    let formated_retrieved =  moment(commentMeta.retrieved_on*1000).format();

    yield {
      author            :  commentMeta.author,
      author_flair_text :  commentMeta.author_flair_text,
      author_fullname   :  commentMeta.author_fullname,
      body              :  commentMeta.body,
      collapsed         :  commentMeta.collapsed,
      controversiality  :  commentMeta.controversiality,
      created_utc       :  formated_utc,
      depth             :  commentMeta.depth,
      distinguished     :  commentMeta.distinguished,
      edited            :  commentMeta.edited,
      gilded            :  commentMeta.gilded,
      gildings          :  commentMeta.gildings,
      id                :  commentMeta.id,
      is_submitter      :  commentMeta.is_submitter,
      link_id           :  commentMeta.link_id,
      locked            :  commentMeta.locked,
      name              :  commentMeta.name,
      parent_id         :  commentMeta.parent_id,
      permalink         :  commentMeta.permalink,
      retrieved_on      :  formated_retrieved,
      score             :  commentMeta.score,
      stickied          :  commentMeta.stickied,
      ups               :  commentMeta.ups
      };

  }
};
//#endregion
//|------------------------------------------------------------------------





//|------------------------------------------------------------------------
//#region comment_flattener_w_nested_generator function
/**
|--------------------------------------------------------------------------
| Comment_flattener_w_nested_generator
|--------------------------------------------------------------------------
|
| Returns promise
|
*/

const comment_flattener_w_nested_generator = function(options) {
  return new Promise(function(resolve, reject) {
    let flat_comments       =  [];
    let reddit_comment_JSON =  options;
    
    let comments     =  reddit_comment_JSON.data;
    let get_comments =  formatted_comments_generator(comments);
    let comment_grab =  get_comments.next();

    while(!comment_grab.done) {
      flat_comments.push(comment_grab.value);  
      comment_grab = get_comments.next();
    }

    if(comment_grab.done) {
      resolve(flat_comments);
    }

  });
};
//#endregion
//|------------------------------------------------------------------------





//|------------------------------------------------------------------------
//#region OLD callback hell search_by_id_then_get_comments function
/**
|--------------------------------------------------------------------------
| Takes reddit url and returns pushshift query with formatted comments
|--------------------------------------------------------------------------
|
|
*/

const search_by_id_then_get_comments = function (req, res, next) {
  let errors = validationResult(req);

  let formatted_pushShift_comments = []

  async.waterfall([
    scrape_comments_by_identifier
  ], function new_comment_model(err, results) {
    if (err) { return next(err); }
    if (Array.isArray(results) && results.length === 0) {
      let err = new Error('No comments found in this post');
      err.status = 404;
      return next(err);
    }
    
    let scrape = new Scrape();
    scrape.comments = formatted_pushShift_comments;

    if(!errors.isEmpty()) {
      //There are errors. Render the form again with sanitized values/error messages.
      //TODO The error views for needs to be reformatted for proper padding. Not currently necessary to spend the time doing this cosmetic issue.
      res.render('scrape_form',
      {
        title: 'Create Scrape Errors',
        scrape: scrape,
        errors: errors.array()
      })
      return;

    } else {
      scrape.save(function save_scrape(err) {
        if (err) { return next(err); }
        res.redirect(scrape.url);
      }) // End scrape.save
    }    // End else
  })     // End waterfall
  
  function scrape_comments_by_identifier(callback) {
    
    // eslint-disable-next-line no-unused-vars
    request(search_comments_by_identifier(req.body.scrape_url), (err, response, body) => {
      if (err) { return next(err); }
      
      else {
        let flat_comments = []; 
        let comment_JSON = JSON.parse(response.body);

        let comments = comment_JSON.data;

        let get_comments = formatted_comments_generator(comments);
        let comment_grab = get_comments.next();

        while(!comment_grab.done) {
          flat_comments.push(comment_grab.value);  
          formatted_pushShift_comments.push(comment_grab.value);
          comment_grab = get_comments.next();
        }
        
        if (comment_grab.done) {
          callback(null, flat_comments);
        }
      }  // End else
    })   // End request
  }      // End scrape_comments_by_identifier function
};
//#endregion
//|------------------------------------------------------------------------


module.exports = {
  search_comments_by_identifier: search_comments_by_identifier,
  formatted_comments_generator: formatted_comments_generator,
  search_by_id_then_get_comments: search_by_id_then_get_comments,
  comment_flattener_w_nested_generator: comment_flattener_w_nested_generator
};