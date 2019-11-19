/**
|--------------------------------------------------------------------------
| Pushshift helper functions
|--------------------------------------------------------------------------
*/

//| module dependencies
//|------------------------------------------------------------------------
const moment   =  require('moment');
const req_prom =  require('request-promise');
const util     =  require('util');



//| create pushshift query string using submission _id
//|------------------------------------------------------------------------
//| returns: https://api.pushshift.io/reddit/comment/search/?link_id=7j0ec9&limit=20000

const create_pushshift_url = function (handed_url) {
  let pushShift_url                =  'https://api.pushshift.io/reddit/';
  let comment_search_by_identifier  =  'comment/search/?link_id=';
  let search_limit                 =  '&limit=20000';
  
  return pushShift_url + comment_search_by_identifier + handed_url + search_limit;
};



//| generator that returns the specified keys for each comment and replies to parent
//|------------------------------------------------------------------------
//| //TODO Update the for loop to new syntax

const formatted_comments_generator = function* (comments) {
  for (let i = 0; i < comments.length; i++) {
    let commentMeta = comments[i];

    let formated_utc       =  moment(commentMeta.created_utc*1000).format();
    let formated_retrieved =  moment(commentMeta.retrieved_on*1000).format();
    let display_date       =  moment(commentMeta.created_utc*1000).format('MMMM Do YYYY |  h:mm:ss a');

    yield {
      author            :  commentMeta.author,
      author_flair_text  :  commentMeta.author_flair_text,
      author_fullname   :  commentMeta.author_fullname,
      body              :  commentMeta.body,
      collapsed         :  commentMeta.collapsed,
      controversiality  :  commentMeta.controversiality,
      created_utc       :  formated_utc,
      depth             :  commentMeta.depth,
      display_date      :  display_date,
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



//| flattens reply comment threads using generator above
//|------------------------------------------------------------------------

const flatten_comments_w_nested_generator = function(options) {
  return new Promise(function(resolve, reject) {
    let flat_comments        =  [];
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



module.exports = {
  create_pushshift_url               :  create_pushshift_url,
  formatted_comments_generator       :  formatted_comments_generator,
  flatten_comments_w_nested_generator :  flatten_comments_w_nested_generator
};