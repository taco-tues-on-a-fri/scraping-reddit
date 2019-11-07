const appRoot   =  require('app-root-path');
const async     =  require('async');
const pushshift =  require(appRoot + '/lib/push-shift');
const rp        =  require('request-promise');
const Scrape    =  require(appRoot + '/models/scrape');

const { body,validationResult } =  require('express-validator');
const { sanitizeBody }          =  require('express-validator');


// Display Scrape create form on GET
exports.scrape_create_get = function(req, res, next) {
  res.render('scrape_form', 
  {
    title: 'Create Scrape'
  }
  );
};

//  Scrape create POST
// exports.scrape_create_post = pushshift.search_by_id_then_get_comments

//|--------------------------------------------------------------------------
//#region request_url_03

exports.request_url_03 = async function (req, res, next) {
  let options = {
    method: 'GET',
    uri: req.body.form_response,
    json: true // Automatically stringifies the body to JSON
  };

  await rp(options)
    .then(json => res.json({ message: json }))
    .catch(err => next(err))
};



//#endregion
//|--------------------------------------------------------------------------