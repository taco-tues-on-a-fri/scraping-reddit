const express     =  require('express');

const appRoot     =  require('app-root-path');
const chalk       =  require('chalk');
const createError =  require('http-errors');
const helper      =  require(appRoot + '/lib/helper.js');
const pushshift   =  require(appRoot + '/lib/push-shift.js');
const moment      =  require('moment');
const morgan      =  require('morgan');
const path        =  require('path');
const util        =  require('util');
const winston     =  require(appRoot + '/config/winston');


//| Controllers
//|------------------------------------------------------------------------
const home_router   =  require(appRoot + '/routes/home');


//| Create Express server
//|------------------------------------------------------------------------
const app = express();


//| View engine setup
//|------------------------------------------------------------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//| HTTP request logger setup: morgan to winston
//|------------------------------------------------------------------------
app.use(morgan('dev', { stream: winston.stream }));


//| Middleware setup
//|------------------------------------------------------------------------

//| Folders for static content
app.use(express.static(path.join(__dirname, 'public')));

//| Parser for JSON contents using bodyParser
app.use(express.json());

//| Recognize incoming Request Object as strings or arrays
app.use(express.urlencoded({ extended: false }));


//| Primary app routes
//|------------------------------------------------------------------------
app.use('/', home_router);


//| Catch 404 and forward to error handler
//|------------------------------------------------------------------------

//| Catch 404
app.use(function(req, res, next) {
  next(createError(404));
});


//| Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

//|  include winston logging
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  winston.error(`${err.stack === undefined ? '' : err.stack}`);

//|  render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;