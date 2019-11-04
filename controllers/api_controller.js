const appRoot=require('app-root-path');
const async=require('async');
const Scrape=require(appRoot + '/models/scrape');
// Display home page
exports.index = function(req, res) {
  
  async.parallel({
    scrape_count: function(callback) {
      Scrape.countDocuments({}, callback);
    },
  }, function(err, results) {
    res.render('index', { title: "Scraping Reddit", error: err, data: results });
  })
};