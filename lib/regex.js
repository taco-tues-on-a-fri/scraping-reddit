/** 
|--------------------------------------------------------------------------
| Regex Cookbook
|--------------------------------------------------------------------------
|  Current regex attempt
|  https://regex101.com/r/JQwF1B/3/
|
|
| The reddit filter that is noted below could be useful for scraping out and 
|   using reddit url links found in the initial comment section
|
|  Reddit filter regex.101 link
|   https://regex101.com/r/fX6uY5/2
|
|   Examples from the internets:
|
| http://urlregex.com/
| "The Perfect URL Regular Expression"
| /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
|
|
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


//|------------------------------------------------------------------------
//#region | INFO | Example url syntax variations 
/**
|--------------------------------------------------------------------------
|  Example url syntax variations
|--------------------------------------------------------------------------
| Source
| https://www.reddit.com/r/modclub/comments/4vaqiw/need_to_filter_links_to_reddit_threads_heres_the/
| https://www.reddit.com/r/AutoModerator/comments/4vapin/need_to_filter_links_to_reddit_threads_heres_the/
/


/** 

https://www.reddit.com/r/pics/comments/92dd8/test_post_please_ignore/	
reddit.com/r/pics/comments/92dd8/test_post_please_ignore/	URL path is parsed as valid
/r/pics/comments/92dd8/test_post_please_ignore/	
r/pics/comments/92dd8/test_post_please_ignore/	Only works as a standalone link; will not work in inline or reference style links
//reddit.com/r/pics/comments/92dd8/test_post_please_ignore/	http: is not required for a valid link, just the //
//np.reddit.com/r/pics/comments/92dd8/test_post_please_ignore/	with subdomain
//np-dk.reddit.com/r/pics/comments/92dd8/test_post_please_ignore/	with dual language subdomain
https://redd.it/92dd8	redd.it shortlink
https://reddit.com/92dd8	guess what? you can shortlink from reddit.com as well
/r/pics/92dd8	no /comments
//reddit.com/tb/92dd8	Reddit Toolbar extension link. Functionally synonymous with redd.it shortlinks
//redd.it/r/pics/comments/92dd8	redd.it isn't just for shortlinks, just so you know
//reddit.com/comments/92dd8	no subreddit in path
//reddit.com/comments/92dd8/_/c0b6xx0	with comment
//reddit.com/comments/92dd8/_/c0b6xx0?context=3


*/




//#endregion url variations
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






//| blank
//|------------------------------------------------------------------------
