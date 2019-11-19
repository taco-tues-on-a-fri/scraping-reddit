//| module dependencies
//|------------------------------------------------------------------------
const appRoot   =  require('app-root-path');
const async     =  require('async');
const helper    =  require(appRoot + '/lib/helper');
const pushshift =  require(appRoot + '/lib/push-shift');
const reddit    =  require(appRoot + '/lib/reddit');
const regex     =  require(appRoot + '/lib/regex');
const req_prom  =  require('request-promise-native');

const { body,validationResult } =  require('express-validator');
// const { sanitizeBody }          =  require('express-validator');
require('express-async-errors');





//| list reddit comments on POST
//|------------------------------------------------------------------------
exports.reddit_list = async function (req, res, next) {
  const request_url   =  req.body.form_response;
  const formatted_url =  reddit.create_reddit_url(request_url);

  const options = {
    method: 'GET',
    uri: formatted_url,
    json: true
  };
  
  req_prom(options)
    .then(json => reddit.flatten_comments_w_nested_generator(json))
    .then(results => res.render("scrape_response", 
      { 
        title: "Reddit Comment List",
        results: results 
      }))
    .catch(err => next(err))

};



//| sort reddit comments on POST
//|------------------------------------------------------------------------
exports.reddit_sort = async function (req, res, next) {
  const errors        =  validationResult(req); // TODO finish adding the full validation code
  const request_url   =  req.body.form_response;
  const formatted_url =  reddit.create_reddit_url(request_url);

  const options = {
    method: 'GET',
    uri: formatted_url,
    json: true
  };
  
  req_prom(options)
    .then(json => reddit.flatten_comments_w_nested_generator(json))
    .then(json => helper.reduce_comments_by_author(json))
    .then(results => res.render("scrape_n_sort_response", 
      { 
        title: "Reddit Comments Sorted",
        results: results 
      }))
    .catch(err => next(err))
};



//| list pushshift comments on POST
//|------------------------------------------------------------------------
exports.pushshift_list = async function (req, res, next) {
  const errors        =  validationResult(req); // TODO finish adding the full validation code
  const request_url   =  req.body.form_response;
  const reddit_linkid =  regex.reddit_linkid(request_url);
  const formatted_url =  pushshift.create_pushshift_url(reddit_linkid);

  const options = {
    method: 'GET',
    uri: formatted_url,
    json: true
  };

  req_prom(options)
    .then(json => pushshift.flatten_comments_w_nested_generator(json))
    .then(results => res.render("scrape_response", 
      { 
        title: "PushShift Comments Listed",
        results: results 
      }))
    .catch(err => next(err))

};



//| sort pushshift comments on POST
//|------------------------------------------------------------------------
exports.pushshift_sort = async function (req, res, next) {
  let errors        =  validationResult(req); // TODO finish adding the full validation code
  let request_url   =  req.body.form_response
  let reddit_linkid =  regex.reddit_linkid(request_url)
  let formatted_url =  pushshift.create_pushshift_url(reddit_linkid)

  let options = {
    method: 'GET',
    uri: formatted_url,
    json: true
  }

  req_prom(options)
    .then(json => pushshift.flatten_comments_w_nested_generator(json))
    .then(json => helper.reduce_comments_by_author(json))
    .then(results => res.render("scrape_n_sort_response", 
      { 
        title: "PushShift Comments Sorted",
        results: results 
      }))
    .catch(err => next(err))

};