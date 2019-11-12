/**
|--------------------------------------------------------------------------
| Reddit helper functions
|--------------------------------------------------------------------------
*/

//|------------------------------------------------------------------------
//#region module dependencies
const appRoot =  require('app-root-path');
const async   =  require('async');
const moment  =  require('moment');
const request =  require('request');
const rp      =  require('request-promise');
const Scrape  =  require(appRoot + '/models/scrape');

const { body,validationResult } =  require('express-validator');
const { sanitizeBody }          =  require('express-validator');
//#endregion
//|------------------------------------------------------------------------
// Reddit sort_methods
//|------------------------------------------------------------------------

let reddit = {
  sort_best          :  '?sort=confidence',
  sort_controversial :  '?sort=controversial',
  sort_new           :  '?sort=new',
  sort_old           :  '?sort=old',
  sort_top           :  '?sort=top',
  sort_qa            :  '?sort=qa',
};


//|------------------------------------------------------------------------
//#region create_reddit_url function
/**
|--------------------------------------------------------------------------
| Query Reddit using formatted url string.
|--------------------------------------------------------------------------
|
| returns:
| 
|
*/

let create_reddit_url = function (handed_url, sort_method){
  let json      =  '.json';
  let max_limit =  '&limit=500';
  
  return `${handed_url} + ${json} + ${sort_method} + ${max_limit}`,
};

//#endregion
//|------------------------------------------------------------------------




//|------------------------------------------------------------------------
//#region find_replies_generator function
/**
|--------------------------------------------------------------------------
| Generator that scrapes Reddit JSON and returns formatted comments.
|--------------------------------------------------------------------------
| //TODO Update the for loop to new syntax
|
*/

const find_replies_generator = function* (comments) {
  for (let i = 0; i < comments.length; i++) {
    let comment = comments[i];

    let formated_utc    =  moment(comment.created_utc*1000).format();

    yield {
      author            :  comment.author,
      author_flair_text  :  comment.author_flair_text,
      author_fullname   :  comment.author_fullname,
      body              :  comment.body,
      collapsed         :  comment.collapsed,
      controversiality  :  comment.controversiality,
      created_utc       :  formated_utc,
      depth             :  comment.depth,
      distinguished     :  comment.distinguished,
      edited            :  comment.edited,
      gilded            :  comment.gilded,
      gildings          :  comment.gildings,
      id                :  comment.id,
      is_submitter      :  comment.is_submitter,
      link_id           :  comment.link_id,
      locked            :  comment.locked,
      name              :  comment.name,
      parent_id         :  comment.parent_id,
      permalink         :  comment.permalink,
      score             :  comment.score,
      stickied          :  comment.stickied,
      ups               :  comment.ups
    };

    if(commentMeta.replies) {
      yield *find_replies_generator(comment.replies.data.children);
    }  

  };
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
    let flat_comments        =  [];
    let reddit_comment_JSON =  options;

    let metadata      =  reddit_comment_JSON[0].data.children[0].data;
    let comments      =  reddit_comment_JSON[1].data.children;
    let formatted_utc =  moment(metadata.created_utc*1000).format();
    
    // let historical_price       =  match_date(formatted_utc);
    // let historical_subscribers =  match_date_subscribers(formatted_utc);
    // let eth_trader_subscribers =  subscriber_switch(formatted_utc, 'eth_trader');

    let submission_metadata = {
        author                :  metadata.author,
        author_flair_text      :  metadata.author_flair_text,
        author_fullname       :  metadata.author_fullname,
        created_utc           :  formatted_utc,
        distinguished         :  metadata.distinguished,
        edited                :  metadata.edited,
        gilded                :  metadata.gilded,
        gildings              :  metadata.gildings,
        // historical_price      :  historical_price,
        id                    :  metadata.id,
        link_flair_text        :  metadata.link_flair_text,
        locked                :  metadata.locked,
        name                  :  metadata.name,
        num_comments          :  metadata.num_comments,
        permalink             :  metadata.permalink,
        post_url              :  metadata.url,
        score                 :  metadata.score,
        selftext              :  metadata.selftext,
        stickied              :  metadata.stickied,
        subreddit             :  metadata.subreddit,
        subreddit_id          :  metadata.subreddit_id,
        subreddit_subscribers :  metadata.subreddit_subscribers,
        title                 :  metadata.title,
        ups                   :  metadata.ups,
        upvote_ratio          :  metadata.upvote_ratio,
    }

    let get_reply =  formatted_comments_generator(comments);
    let comment_grab =  get_reply.next();

    while(!comment_grab.done) {
      flat_comments.push(comment_grab.value);
      // array_w_duplicates.push(comment_grab.value);  
      comment_grab = get_reply.next();
    };
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

//#endregion
//|------------------------------------------------------------------------


module.exports = {
  search_comments_by_identifier: search_comments_by_identifier,
  formatted_comments_generator: formatted_comments_generator,
  search_by_id_then_get_comments: search_by_id_then_get_comments,
  comment_flattener_w_nested_generator: comment_flattener_w_nested_generator,
  create_pushshift_url: create_pushshift_url
};