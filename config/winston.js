const appRoot = require('app-root-path');
const winston = require('winston');
const { format } = winston;
const { combine, label, json } = format;

const align_colors_time = winston.format.combine(
  winston.format.colorize({
    all:true
  }),
  winston.format.label({
    label:'[LOGGER]'
  }),
  winston.format.timestamp({
    format:"YY-MM-DD HH:MM:SS"
  }),
  winston.format.printf(
    info => ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
  )
);

//
// Configure the logger for `align_colors_time`
//
winston.loggers.add('align_colors_time', {
  handleExceptions: true,
  format: winston.format.combine(
    winston.format.colorize(), 
    align_colors_time
    ),
  transports: [
    new winston.transports.Console({ level: 'debug' }),
    // new winston.transports.File({ filename: `${appRoot}/logs/app.log` })
  ]
});
// winston.loggers.add('align_colors_time', {
//   handleExceptions: true,
//   format: combine(
//     winston.format.colorize({
//       all:true
//     }),
//     winston.format.label({
//       label:'[LOGGER]'
//     }),
//     winston.format.timestamp({
//       format:"YY-MM-DD HH:MM:SS"
//     }),
//     winston.format.printf(
//       info => ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
//     )
//   ),
//   transports: [
//     new winston.transports.Console({ level: 'debug' }),
//   ]
// });

//
// Configure the logger for `error_log_file`
//
winston.loggers.add('error_log_file', {
  handleExceptions: true,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  format: combine(
      winston.format.json(),
      winston.format.prettyPrint()
  ),
  transports: [
    new winston.transports.File({ filename: `${appRoot}/logs/app.log` })
  ]
});



// const options = {
//   file: {
//     level: 'error',
//     filename: `${appRoot}/logs/app.log`,
//     handleExceptions: true,
//     maxsize: 5242880, // 5MB
//     maxFiles: 5,
//     format: winston.format.combine(
//       winston.format.json(),
//       winston.format.prettyPrint()
//     )
//   },
//   console: {
//     level: 'debug',
//     handleExceptions: true,
//     format: winston.format.combine(
//       winston.format.colorize(), 
//       align_colors_time
//     )
//   },
// };

// // Instantiate a new Winston Logger with the settings defined above
const logger = new winston.createLogger({
  // level: 'error',
  // transports: [
  //   // new winston.transports.File({ filename: `${appRoot}/logs/app.log` })
  //     // new winston.transports.File(options.file)
  // // ],
  // // transports: [
  //   new winston.transports.File(options.file),
  //   new winston.transports.Console(options.console)
  // ],
  exitOnError: false, // do not exit on handled exceptions
});

const morgan_logger = winston.loggers.get('align_colors_time');

// Create a stream object with a 'write' function that will be used by `morgan`
// winston.stream = new stream.Duplex({
//   write: function(message, encoding) {
//     // use the 'info' log level so the output will be picked up by both transports (file and console)
//     morgan_logger.info(message);
//   }
  
// })
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    morgan_logger.info(message);
  }
  
}


module.exports = logger;
// module.exports = winston;

/**
|--------------------------------------------------------------------------
| Notes
|--------------------------------------------------------------------------
| 
| Winston comes with three core transports 
|  console, file, and HTTP
|
| Console transport will log information to the console
| File transport will log information to a specified file
|
| Each transport definition can contain its own configuration settings such as: 
|   file size
|   log levels
|   log format
|
| * level            =  Level of messages to log.
| * filename         =  The file to be used to write log data to.
| * handleExceptions =  Catch and log unhandled exceptions.
| * json             =  Records log data in JSON format.
| * maxsize          =  Max size of log file, in bytes, before a new file will be created.
| * maxFiles         =  Limit the number of files created when the size of the logfile is exceeded.
| * colorize         =  Colorize the output. This can be helpful when looking at console logs.
|
| Logging levels indicate message priority and are denoted by an integer. 
| Winston uses npm logging levels that are prioritized from 0 to 5 (highest to lowest):
| 
| 0: error
| 1: warn
| 2: info
| 3: verbose
| 4: debug
| 5: silly
|
| When specifying a logging level for a particular transport, 
| anything at that level or higher will be logged. 
|
| For example, by specifying a level of info, anything at level error, warn, or info will be logged. 
| Log levels are specified when calling the logger, meaning we can do the following to record an error: 
|  logger.error('test error message').
|
| When dealing with errors, use the error log level. 
| Both transports are configured to log error level messages 
| And will output in the console and file logs.
|  
| * err.status      =  The HTTP error status code. If one is not already present, default to 500.
| * err.message     =  Details of the error.
| * req.originalUrl =  The URL that was requested.
| * req.path        =  The path part of the request URL.
| * req.method      =  HTTP method of the request (GET, POST, PUT, etc.).
| * req.ip          =  Remote IP address of the request.
|  
*/



