//| module dependencies
//|------------------------------------------------------------------------
const appRoot  =  require('app-root-path');
require('express-async-errors');


//| index
//|------------------------------------------------------------------------
exports.index = function(req, res) {
    res.render('index', { 
      title: "Scraping Reddit", 
      scrape_title: 'Create Scrape'
    });
};