const appRoot  = require('app-root-path');
const async = require('async');
const Scrape = require(appRoot + '/models/scrape');
const pushshift = require(appRoot + '/lib/push-shift');
const { body,validationResult } =  require('express-validator');
const { sanitizeBody } =  require('express-validator');


// Display Scrape create form on GET
exports.scrape_create_get = function(req, res, next) {
  res.render('scrape_form', 
    {
    title: 'Create Scrape'
    }
  );
};

// exports.scrape_create_post = pushshift.search_by_id_then_get_comments

