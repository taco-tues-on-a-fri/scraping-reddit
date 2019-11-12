//* ../public/javascripts/switches/url_switch.js

module.exports = function url_switch(handed_url, sort_method) {
  let json      =  '.json';
  let max_limit =  '&limit=500';

  switch (sort_method) {
    case 'sortBest':
      return handed_url + json + '?sort=confidence' + max_limit;
      break;

    case 'sortControversial':
      return handed_url + json + '?sort=controversial' + max_limit;
      break;

    case 'sortNew':
      return handed_url + json + '?sort=new' + max_limit;
      break;

    case 'sortOld':
      return handed_url + json + '?sort=old' + max_limit;
      break;

    case 'sortTop':
      return handed_url + json + '?sort=top' + max_limit;
      break;

    case 'sortQA':
      return handed_url + json + '?sort=qa' + max_limit;
      break;

    default:
      throw new Error('Not a valid sort method');
  };
};