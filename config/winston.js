const appRoot = require('app-root-path');
const winston = require('winston');
const fix_errors = require(appRoot + '/config/fix_errors');

const alignColorsAndTime = winston.format.combine(
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

const options = {
  file: {
    level: 'error',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: winston.format.combine(
      winston.format.json(),
      winston.format.prettyPrint()
    )
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.colorize(), 
      alignColorsAndTime
    )
  },
  stack: {
    level: 'debug',
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.splat(),
      fix_errors(),
      winston.format.colorize(), 
      // alignColorsAndTime,
      winston.format.printf(info => `${info.level.toUpperCase()} ${info.message} ${info.stack === undefined ? '' : info.stack}`)
    )
  },
};

// Instantiate a new Winston Logger with the settings defined above
const logger = new winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    // new winston.transports.Console(options.console),
    new winston.transports.Console(options.stack)
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// Create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  }
  
}

// winston.loggers.add("default");
// const log = winston.loggers.get("default");
// log.format = logform.format.errors({ stack: true });
// /* get a `transportOptions` object and a `transportType` */
// transportOptions.format = logform.format.combine(
//   logform.format.timestamp(),
//   logform.format.printf(myFormatter)
// );
// log.add(new winston.transports[transportType](transportOptions);

module.exports = logger;






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



