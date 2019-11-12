//|------------------------------------------------------------------------
//#region | BUILD | creates a reddit url using different search params | url_switch
/**
|--------------------------------------------------------------------------
|  url_switch
|--------------------------------------------------------------------------
|
*/

const url_switch = function (handed_url, sort_method) {
  let json      =  '.json';
  let max_limit =  '&limit=500';

  switch (sort_method) {
    case 'sort_best':
      return handed_url + json + '?sort=confidence' + max_limit;
      break;

    case 'sort_controversial':
      return handed_url + json + '?sort=controversial' + max_limit;
      break;
    
      case 'sort_new':
      return handed_url + json + '?sort=new' + max_limit;
      break;

    case 'sort_old':
      return handed_url + json + '?sort=old' + max_limit;
      break;

    case 'sort_top':
      return handed_url + json + '?sort=top' + max_limit;
      break;

    case 'sort_qa':
      return handed_url + json + '?sort=qa' + max_limit;
      break;
    
    default:
      throw new Error('Not a valid sort method');
  };
};

//#endregion
//|------------------------------------------------------------------------


module.exports = {
  url_switch: url_switch
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