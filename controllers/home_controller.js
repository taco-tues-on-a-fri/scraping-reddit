//| module dependencies
//|------------------------------------------------------------------------
const appRoot  =  require('app-root-path');
const Freq = require('wordfrequenter');
const wf = require('word-freq');
const sw = require('stopword');
const util = require('util');
const helper =  require(appRoot + '/lib/helper');
require('express-async-errors');



//| index
//|------------------------------------------------------------------------
exports.index = function(req, res) {
    res.render('index', { 
      title: "Scraping Reddit", 
      scrape_title: 'Create Scrape'
    });
};


//| nlp test
//|------------------------------------------------------------------------
exports.nlp = function(req, res) {
  res.render('nlp_form', { 
    title: "Count it" 
  });
};



//| nlp_freq_list
//|------------------------------------------------------------------------
exports.nlp_freq_list = function(req, res, next) {
  const form_body   =  req.body.form_response;
  const stopped_string = sw.removeStopwords(form_body.split(' '))
  
  const frequency_list = wf.freq(form_body, false, false)
  const stopped_frequency_list = wf.freq(stopped_string)

  // console.dir(`frequency_list: ${frequency_list}`)
  const sorted_list = helper.sort_properties(frequency_list)
  // console.dir(`sorted_list: ${sorted_list}`)
  // console.dir(util.inspect(stopped_frequency_list))
  console.dir(util.inspect(frequency_list))


  res.render('nlp_response', { 
    title: "Word Frequency_list",  
    frequency_list: frequency_list    
  });
};

//| nlp_freq_table
//|------------------------------------------------------------------------
exports.nlp_freq_table = function(req, res, next) {
  const form_body   =  req.body.form_response;
  const stopped_string = sw.removeStopwords(form_body.split(' '))
  
  const frequency_list = wf.freq(form_body, false, false)
  const stopped_frequency_list = wf.freq(stopped_string)

  const sorted_list = helper.sort_properties(stopped_frequency_list)
  console.log(util.inspect(sorted_list))


  res.render('nlp_response_table', { 
    title: "Word Frequency_list",  
    frequency_list: frequency_list,
    stopped_frequency_list: stopped_frequency_list,
    sorted_list: sorted_list

  });
};











//|------------------------------------------------------------------------
//#region | TEST |  testing fs helper function | request_url_fs_save
/**
|--------------------------------------------------------------------------
|  request_url_fs_save
|--------------------------------------------------------------------------
| 
|
*/

exports.request_url_fs_save = async function (req, res, next) {
  let options = {
    method: 'GET',
    uri: 'https://www.reddit.com/r/ethtrader/comments/dtdsmm/ethereum_istanbul_hard_fork_release_date/.json',
    json: true
  };

  let file_name = 'thrilling_woodcock.json' 


  await rp(options)
    .then(json => helper.fs_read_write(file_name, json)) 
    .then(() => res.json({ message: 'Successfully scraped and saved reddit' }))
    .catch(err => next(err))
};
//#endregion
//|------------------------------------------------------------------------
