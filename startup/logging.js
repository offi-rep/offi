const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label } = format;

const myFormat = format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp.slice(0, 19)} [${label}] [${level.toUpperCase()}] ${message}`;
});

let environment;
switch (process.env.NODE_ENV) {
  case 'debug':
    environment = 'Debugging'
    break;
  case 'production':
    environment = 'Production'
    break;
  default:
    environment = 'Testing'
}

let logger = createLogger({
  level: 'debug',
  format: combine(
    label({ label: (environment) }),
    timestamp(),
    myFormat
  ),

});

if (process.env.NODE_ENV === 'debug') {
  logger.add(new transports.Console({
    colorize: true,
    prettyPrint: true,
    level: 'info',
    timestamp: true
  }));
  logger.add(new transports.File({
    filename: './public/logs/error.log',
    level: 'error',
    prettyPrint: true,
    format: combine(
      timestamp(),
      myFormat
    ),
  }));
  logger.add(new transports.File({
    filename: './public/logs/combined.log',
    prettyPrint: true,
    format: combine(
      timestamp(),
      myFormat
    ),
  }));
}

if (process.env.NODE_ENV === 'production') {
  logger.add(new transports.Console({
    colorize: true,
    prettyPrint: true,
    level: 'info',
    timestamp: true
  }));
  logger.add(new transports.File({
    filename: './public/logs/error.log',
    level: 'error',
    prettyPrint: true,
    format: combine(
      timestamp(),
      myFormat
    )
  }));
  logger.add(new transports.File({
    filename: './public/logs/combined.log',
    prettyPrint: true,
    format: combine(
      timestamp(),
      myFormat
    ),
  }));
}

if (process.env.NODE_ENV === 'test') {
  logger.add(new transports.File({
    filename: './public/logs/test.log',
    format: combine(
      timestamp(),
      myFormat
    ),
    colorize: true,
    prettyPrint: true,
    level: 'debug',
    timestamp: true
  }));
}

//exceptions (unhandled exceptions and unhnadled promises rejections) out of the Express scope.
logger.exceptions.handle(new transports.File({
  filename: './public/logs/logsUnhandledExceptions.log',
  format: combine(
    timestamp(),
    myFormat
  ),
  colorize: true,
  prettyPrint: true,
  timestamp: true
}));
process.on('unhandledRejection', (ex) => {
  throw ex;
})

module.exports = logger;