/**
|--------------------------------------------------------------------------
| Pushshift helper functions
|--------------------------------------------------------------------------
*/

/**
|--------------------------------------------------------------------------
| Separate & output base36 reddit submission _id from url string
|--------------------------------------------------------------------------
|
| Output example:
| https://api.pushshift.io/reddit/comment/search/?link_id=7j0ec9&limit=20000
|
*/

const comments_by_identifier = function (handed_url) {
  let pushShift_url                =  'https://api.pushshift.io/reddit/';
  let comment_search_by_identifier =  'comment/search/?link_id=';
  let search_limit                 =  '&limit=20000';
  
  return pushShift_url + comment_search_by_identifier + handed_url.substring(44, 50) + search_limit;
};

module.exports = {
  get_comments_by_identifier: comments_by_identifier,
};






