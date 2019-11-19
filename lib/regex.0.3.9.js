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
//#region | LIVE | reddit parse url for linkid | reddit_linkid
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





//|------------------------------------------------------------------------
//#region | LIVE | reddit url groups | reddit_url_groups
/**
|--------------------------------------------------------------------------
|  reddit_url_groups
|--------------------------------------------------------------------------
|
| returns:
| { https, www, reddit, com, sub_or_user, name_sub_user, comments_overview, linkid, post_name}
|
*/

const reddit_url_groups = function (handed_url) {
  
  const url_to_parse = handed_url;
  const url_regex = /(?<https>https)\:\/\/(?<www>www)\.(?<reddit>reddit)\.(?<com>com)\/(?<sub_or_user>r|(user))\/(?<name_sub_user>[a-z0-9]{1,21})\/(?<comments_overview>(comments)|(overview))\/(?<linkid>[a-z0-9]{1,6})\/(?<post_name>.*)/gi

  const results = url_to_parse.matchAll(url_regex)

  for (let result of results){
    return { https, www, reddit, com, sub_or_user, name_sub_user, comments_overview, linkid, post_name} = result.groups
  }

}

//#endregion
//|------------------------------------------------------------------------





module.exports = {
  reddit_linkid: reddit_linkid,
  reddit_url_groups: reddit_url_groups
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

