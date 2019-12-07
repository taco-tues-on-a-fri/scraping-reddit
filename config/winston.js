const appRoot = require('app-root-path');
const winston = require('winston');

const alignColorsAndTime = winston.format.combine(
  winston.format.colorize({
    all:true
  }),
  winston.format.label({
    label:'[LOGGER]'
  }),
  winston.format.timestamp({
    format:"YY-MM-DD  HH:mm:ss"
  }),
  winston.format.printf(
    info => `${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
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
      winston.format.timestamp({
        format:"YY-MM-DD  HH:mm:ss"
      }),
      winston.format.json(),
      winston.format.prettyPrint()
    )
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.errors({ stack: true }),
      winston.format.colorize(), 
      alignColorsAndTime
    )
  },
};

// Instantiate a new Winston Logger with the settings defined above
const logger = new winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
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

module.exports = logger;
