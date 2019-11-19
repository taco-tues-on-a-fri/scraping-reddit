/**
|--------------------------------------------------------------------------
| Helper function modules
|--------------------------------------------------------------------------
*/


//| module dependencies
//|------------------------------------------------------------------------
const appRoot  =  require('app-root-path');
const chalk    =  require('chalk');
const moment   =  require('moment');
const req_prom =  require('request-promise');
const util     =  require('util')
const winston  =  require(appRoot + '/config/winston');


//| reduce_comments_by_author
//|------------------------------------------------------------------------
const reduce_comments_by_author = function(handed_json){
  const comments_body = handed_json

  let author_comments_reducer = comments_body.reduce((accumulator, post) => {
    let { author, body } = post;
    return {...accumulator, [author]: [...(accumulator[author] || []), body]};
  }, {});

  return author_comments_reducer;
}

module.exports = {
  reduce_comments_by_author: reduce_comments_by_author
};