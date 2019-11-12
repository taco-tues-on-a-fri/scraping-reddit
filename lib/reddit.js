/**
|--------------------------------------------------------------------------
| Reddit helper functions
|--------------------------------------------------------------------------
*/

//|------------------------------------------------------------------------
//#region module dependencies
const moment  =  require('moment');
const rp      =  require('request-promise');
const util    =  require('util');
//#endregion
//|------------------------------------------------------------------------

// Reddit sort_methods
//|------------------------------------------------------------------------

const sort_method = {
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
| Create reddit JSON query using by formatting handed url string.
|--------------------------------------------------------------------------
|
| returns:
| https://www.reddit.com/r/crows/comments/7bne1m/befriending_crows_at_work/.json?sort=confidence&limit=500
|
*/

const create_reddit_url = function (handed_url, sort_method){
  let json      =  '.json';
  let max_limit =  '&limit=500';
  
  return `${handed_url + json + sort_method + max_limit}`
};

//#endregion
//|------------------------------------------------------------------------





//|------------------------------------------------------------------------
//#region find_replies_generator function
/**
|--------------------------------------------------------------------------
| Generator that scrapes reddit response JSON & returns the specified keys for each comment and replies to parent
|--------------------------------------------------------------------------
| //TODO Research ES6 loop to replace old loop syntax
|
*/

const find_replies_generator = function* (comments) {
  for (let i = 0; i < comments.length; i++) {
    let comment = comments[i].data;

    let formatted_utc   =  moment(comment.created_utc*1000).format();

    yield {
      author            :  comment.author,
      author_flair_text  :  comment.author_flair_text,
      author_fullname   :  comment.author_fullname,
      body              :  comment.body,
      collapsed         :  comment.collapsed,
      controversiality  :  comment.controversiality,
      created_utc       :  formatted_utc,
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

    if(comment.replies) {
      yield *find_replies_generator(comment.replies.data.children);
    }  

  };
};
//#endregion
//|------------------------------------------------------------------------





module.exports = {
};




//|------------------------------------------------------------------------
//#region | BLANK | description | function_name
/**
|--------------------------------------------------------------------------
|  function_name
|--------------------------------------------------------------------------
|
*/

//#endregion
//|------------------------------------------------------------------------