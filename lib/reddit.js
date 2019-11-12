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