
const morgan = require('morgan');
const { createLogger, transports, format } = require('winston');

morgan.token('id', req => req.id);
morgan.token('body', req => `body:${JSON.stringify(req.body)}`);
morgan.token('query', req => `query:${JSON.stringify(req.query)}`);

const logger = morgan(':method :url :body :query (:id) - :date[iso]');

const options = {
  file: {
    level: 'info',
    filename: 'combined.log',
    handleExceptions: true,
    handleRejections: true,
    timestamp: true,
    format: format.combine(format.uncolorize(), format.json()),
    json: true,
    maxFiles: 5,
    maxsize: 5242880,
    colorize: false
  },
  console: {
    level: 'silly',
    handleExceptions: true,
    handleRejections: true,
    timestamp: true,
    format: format.combine(format.colorize(), format.simple()),
    json: false,
    colorize: true
  }
};

const log = createLogger({
  level: 'silly',
  transports: [
    new transports.File(options.file),
    new transports.Console(options.console)
  ],
  exitOnError: false
});


// handle uncaught exception
process.on('uncaughtException', err =>
  log.error(err, 'Uncaught Exception thrown', {
    label: 'Uncaught Exception Handler'
  })
);

// handle uncaught rejection
process.on('unhandledRejection', (reason, promise) =>
  log.error(reason, 'Unhandled Rejection at Promise', promise, {
    label: 'Unhandled Rejection Handler'
  })
);


module.exports = logger;