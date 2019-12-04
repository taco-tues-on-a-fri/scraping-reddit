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


const sort_properties = function(obj) {
    let sortable=[]; 
    
    for(let key in obj) //convert object into array 
      if(obj.hasOwnProperty(key))
        sortable.push([key, obj[key]]); // each item is an array in format [key, value]
    
  
    sortable.sort(function(a, b) { //sort items by value
      return b[1]-a[1]; // compare numbers
    });
    const sorted_object = Object.fromEntries(sortable);
    // return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
    return sorted_object;
  }

module.exports = {
  reduce_comments_by_author: reduce_comments_by_author,
  sort_properties: sort_properties
};