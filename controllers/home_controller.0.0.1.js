//| module dependencies
//|------------------------------------------------------------------------
const appRoot  =  require('app-root-path');
const Freq = require('wordfrequenter')
const util = require('util')
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
  const word_frequency = new Freq(form_body.split(' '))
  
  word_frequency.set('string')
  const word_list = word_frequency.list()
  console.dir(word_list)
  
  const reduce_words_list = function(handed_array){
    const words_body = handed_array
  
    let reducer = words_body.reduce((accumulator, word_instance) => {
      let { word, count } = word_instance;
      return {...accumulator, [word]: [...(accumulator[word] || []), count]};
    }, {});
  
    return reducer;
  }

  const reduced_list = reduce_words_list(word_list)
  
  res.render('nlp_response', { 
    title: "Word Frequency",
    reduced_list: reduced_list ,   
    word_list: word_list    
  });
};

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
