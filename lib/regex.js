/** 
|--------------------------------------------------------------------------
| Regex Cookbook
|--------------------------------------------------------------------------
|  Current regex build
|  https://regex101.com/r/JQwF1B/3/
|
|
*/

//|------------------------------------------------------------------------
//#region module dependencies
//#endregion
//|------------------------------------------------------------------------





//|------------------------------------------------------------------------
//#region | BUILD | reddit parse url for linkid | reddit_linkid
/**
|--------------------------------------------------------------------------
|  reddit_linkid
|--------------------------------------------------------------------------
|
| returns:
|   linkid
|
*/

const reddit_linkid = function (handed_url) {
  
  const url_to_parse = handed_url;
  const url_regex = /(?<https>https)\:\/\/(?<www>www)\.(?<reddit>reddit)\.(?<com>com)\/(?<sub_or_user>r|(user))\/(?<name_sub_user>[a-z0-9]{1,21})\/(?<comments_overview>(comments)|(overview))\/(?<linkid>[a-z0-9]{1,6})\/(?<post_name>.*)/gi

  const results = url_to_parse.matchAll(url_regex)

  for (let result of results){
    return  result.groups.linkid
  }

}

//#endregion
//|------------------------------------------------------------------------




module.exports = {
  reddit_linkid: reddit_linkid,
};




//| blank
//|------------------------------------------------------------------------





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

