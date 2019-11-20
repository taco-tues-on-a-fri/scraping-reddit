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



//| nlp_freq
//|------------------------------------------------------------------------
exports.nlp_freq = function(req, res, next) {
  const form_body   =  req.body.form_response;

  const stopped_string = sw.removeStopwords(form_body.split(' '))

  const word_frequency = new Freq(stopped_string)
  word_frequency.set('string')
  
  const word_list = word_frequency.list()
  // console.dir(word_list)
  
  const sorted_list = helper.sort_properties(word_list)
  console.dir(sorted_list)

  res.render('nlp_response', { 
    title: "Word Frequency",  
    word_list: word_list    
  });
};


// const oldString = 'a really Interesting string with some words'.split(' ')
// const newString = sw.removeStopwords(oldString)
// newString is now [ 'really', 'Interesting', 'string', 'words' ]
// const testWords = 'this is a cool test string this is cool cool cool'

// const wf = new Freq(testWords.split(' '))

// wf.set('string')
// console.dir(wf.get('cool'))
// console.dir(wf.list())

















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
