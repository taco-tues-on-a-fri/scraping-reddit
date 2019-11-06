/**
|--------------------------------------------------------------------------
| Scraping Reddit
|--------------------------------------------------------------------------
|
| TODO:
| * Configure index.pug line 24 for scrape list link
| * Configure layout.pug line 26+ for nav bar links
*/


/**
|--------------------------------------------------------------------------
| Module dependencies
|--------------------------------------------------------------------------
*/

const express              =  require('express');

const appRoot              =  require('app-root-path');
const async                =  require('async');
const chalk                =  require('chalk');
const compression          =  require('compression');
const cookieParser         =  require('cookie-parser');
const cors                 =  require('cors');
const createError          =  require('http-errors');
const dotenv               =  require('dotenv');
const expressStatusMonitor =  require('express-status-monitor');
const fs                   =  require('fs');
const helper               =  require(appRoot + '/lib/helper.js');
const pushshift            =  require(appRoot + '/lib/push-shift.js');
const moment               =  require('moment');
const mongoose             =  require('mongoose');
// const MongoStore           =  require('connect-mongo')(session);
const morgan               =  require('morgan');
// const passport             =  require('passport');
const path                 =  require('path');
const util                 =  require('util');
const winston              =  require(appRoot + '/config/winston');



/**
|--------------------------------------------------------------------------
| Load environment variables from .env
|--------------------------------------------------------------------------
*/

dotenv.config({ path: '.env' });



/**
|--------------------------------------------------------------------------
| Controllers (route handlers)
|--------------------------------------------------------------------------
*/

const home_router   =  require(appRoot + '/routes/home');
const users_router  =  require(appRoot + '/routes/users');
const scrape_router =  require(appRoot + '/routes/scrape');


/**
|--------------------------------------------------------------------------
| Create Express server
|--------------------------------------------------------------------------
*/

const app = express();


/**
|--------------------------------------------------------------------------
| Set up mongoose connection
|--------------------------------------------------------------------------
*/

mongoose.connect(process.env.MONGO_URI, {
  useFindAndModify: false,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
  console.log('%s Connection to database established', chalk.green('✓'))
}).catch(err=>{
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit(-1)
});



/**
|--------------------------------------------------------------------------
| View engine setup
|--------------------------------------------------------------------------
*/

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



/**
|--------------------------------------------------------------------------
| HTTP request logger setup: morgan to winston
|--------------------------------------------------------------------------
*/

app.use(morgan('dev', { stream: winston.stream }));



/**
|--------------------------------------------------------------------------
| Middleware setup
|--------------------------------------------------------------------------
*/

// Folders for static content
app.use(express.static(path.join(__dirname, 'public')));

// Parser for JSON contents using bodyParser
app.use(express.json());

// Recognize incoming Request Object as strings or arrays
app.use(express.urlencoded({ extended: false }));

// Parse Cookie header and populate req.cookies with object keyed by cookie names
app.use(cookieParser());

// Report real time server metrics for Express-based node servers.
app.use(expressStatusMonitor());

// Node.js compression middleware | supported compression codings: deflate | gzip
app.use(compression());



/**
|--------------------------------------------------------------------------
| Primary app routes
|--------------------------------------------------------------------------
|
*/

app.use('/', home_router);
app.use('/', users_router);
app.use('/', scrape_router);



/**
|--------------------------------------------------------------------------
| Catch 404 and forward to error handler
|--------------------------------------------------------------------------
*/

// Catch 404
app.use(function(req, res, next) {
  next(createError(404));
});


// Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // include winston logging
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  winston.error(`${err.stack === undefined ? '' : err.stack}`);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
