/**
|--------------------------------------------------------------------------
| Pushshift helper functions
|--------------------------------------------------------------------------
*/
const appRoot =  require('app-root-path');
const async  =  require('async');
const moment = require('moment');
const Scrape = require(appRoot + '/models/scrape');

//|--------------------------------------------------------------------------
//#region search_comments_by_identifier function
//|--------------------------------------------------------------------------
/**
*
* Query Pushshift using submission _id from url string.
*
* @param {string} handed_url -  url string.
* Separate & output base36 reddit submission _id from url string.
*
* returns:
* https://api.pushshift.io/reddit/comment/search/?link_id=7j0ec9&limit=20000
*
* url returns a reddit .json
*/

const search_comments_by_identifier = function (handed_url) {
  let pushShift_url                =  'https://api.pushshift.io/reddit/';
  let comment_search_by_identifier =  'comment/search/?link_id=';
  let search_limit                 =  '&limit=20000';
  
  return pushShift_url + comment_search_by_identifier + handed_url.substring(44, 50) + search_limit;
};
//#endregion


//|--------------------------------------------------------------------------
//#region get_formatted_comments generator function
//|--------------------------------------------------------------------------
/**
 *
* Generator that scrapes Reddit JSON and returns formatted comments.
*
* @param {Object} comments - comment object.
* @yields {Object}
*/

const formatted_comments_generator = function* (comments) {
  for (let i = 0; i < comments.length; i++) {
    let commentMeta = comments[i];

    let formated_utc       =  moment(commentMeta.created_utc*1000).format();
    let formated_retrieved =  moment(commentMeta.retrieved_on*1000).format();

    yield {
      author                :  commentMeta.author,
      author_flair_text     :  commentMeta.author_flair_text,
      author_fullname       :  commentMeta.author_fullname,
      body                  :  commentMeta.body,
      collapsed             :  commentMeta.collapsed,
      controversiality      :  commentMeta.controversiality,
      created_utc           :  formated_utc,
      depth                 :  commentMeta.depth,
      distinguished         :  commentMeta.distinguished,
      edited                :  commentMeta.edited,
      gilded                :  commentMeta.gilded,
      gildings              :  commentMeta.gildings,
      id                    :  commentMeta.id,
      is_submitter          :  commentMeta.is_submitter,
      link_id               :  commentMeta.link_id,
      locked                :  commentMeta.locked,
      name                  :  commentMeta.name,
      parent_id             :  commentMeta.parent_id,
      permalink             :  commentMeta.permalink,
      retrieved_on          :  formated_retrieved,
      score                 :  commentMeta.score,
      stickied              :  commentMeta.stickied,
      ups                   :  commentMeta.ups
      }; // End yield

  };     // End for-loop
};       // End exports
//#endregion


//|--------------------------------------------------------------------------
//#region async search_by_id_then_get_comments function
//|--------------------------------------------------------------------------
/**
 *
* async pushShift function that takes a reddit url and returns pushshift formatted comments
*
* @param {Object} comments - comment object.
* @yields {Object}
*/

const search_by_id_then_get_comments = function (req, res, next) {
  let errors = validationResult(req);

  let formatted_pushShift_comments = []

  async.waterfall([
    get_comments_by_identifier
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
    };   // End else
  })     // End waterfall
  
  function scrape_comments_by_identifier(callback) {
    
    request(search_comments_by_identifier(req.body.scrape_url), (err, response, body) => {
      if (err) { return next(err); }
      
      else {
        let flat_comments = []; 
        let comment_JSON = JSON.parse(response.body);

        let comments = comment_JSON.data;

        let get_comments = get_formatted_comments(comments);
        let comment_grab = get_comments.next();

        while(!comment_grab.done) {
          flat_comments.push(comment_grab.value);  
          formatted_pushShift_comments.push(comment_grab.value);
          comment_grab = get_comments.next();
        };
        
        if (comment_grab.done) {
          callback(null, flat_comments);
        }
      }  // End else
    })   // End request
  };     // End get_comments_by_identifier function
};
//#endregion

//|--------------------------------------------------------------------------
module.exports = {
  search_comments_by_identifier: search_comments_by_identifier,
  formatted_comments_generator: formatted_comments_generator,
  search_by_id_then_get_comments: search_by_id_then_get_comments
};