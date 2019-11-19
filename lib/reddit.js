/**
|--------------------------------------------------------------------------
| Reddit helper functions
|--------------------------------------------------------------------------
*/

//| module dependencies
//|------------------------------------------------------------------------
const moment   =  require('moment');
const req_prom =  require('request-promise');
const util     =  require('util');



//| create reddit JSON query string
//|------------------------------------------------------------------------
//| returns: https://www.reddit.com/r/crows/comments/7bne1m/befriending_crows_at_work/.json?sort=confidence&limit=500

const create_reddit_url = function (handed_url){
  const json        =  '.json';
  const max_limit   =  '&limit=500';
  const sort_method =  '?sort=confidence';
  
  return `${handed_url + json + sort_method + max_limit}`
};



//| generator that returns the specified keys for each comment and replies to parent
//|------------------------------------------------------------------------
//| // TODO Research ES6 loop to replace old loop syntax

const find_replies_generator = function* (comments) {
  for (let i = 0; i < comments.length; i++) {
    let comment = comments[i].data;

    let formatted_utc   =  moment(comment.created_utc*1000).format();
    let display_date    =  moment(comment.created_utc*1000).format('MMMM Do YYYY |  h:mm:ss a');

    yield {
      author            :  comment.author,
      author_flair_text  :  comment.author_flair_text,
      author_fullname   :  comment.author_fullname,
      body              :  comment.body,
      collapsed         :  comment.collapsed,
      controversiality  :  comment.controversiality,
      created_utc       :  formatted_utc,
      depth             :  comment.depth,
      display_date      :  display_date,
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

    if(comment.replies) {
      yield *find_replies_generator(comment.replies.data.children);
    }  

  };
};



//| flattens reply comment threads using generator above
//|------------------------------------------------------------------------
//| //TODO submission_metadata is currently unused

const flatten_comments_w_nested_generator = function(options) {
  return new Promise(function(resolve, reject) {
    const reddit_comment_JSON =  options;
    let flat_comments        =  [];

    const metadata    =  reddit_comment_JSON[0].data.children[0].data;
    const comments    =  reddit_comment_JSON[1].data.children;
    let formatted_utc =  moment(metadata.created_utc*1000).format();

    const submission_metadata = {
        author                :  metadata.author,
        author_flair_text      :  metadata.author_flair_text,
        author_fullname       :  metadata.author_fullname,
        created_utc           :  formatted_utc,
        distinguished         :  metadata.distinguished,
        edited                :  metadata.edited,
        gilded                :  metadata.gilded,
        gildings              :  metadata.gildings,
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
        upvote_ratio          :  metadata.upvote_ratio
    }

    let get_reply =  find_replies_generator(comments);
    let comment_grab =  get_reply.next();

    while(!comment_grab.done) {
      flat_comments.push(comment_grab.value);
      comment_grab = get_reply.next();
    };

    if(comment_grab.done) {
      resolve(flat_comments);
    }

  });
};



module.exports = {
  create_reddit_url                  :  create_reddit_url,
  find_replies_generator              :  find_replies_generator,
  flatten_comments_w_nested_generator :  flatten_comments_w_nested_generator
};