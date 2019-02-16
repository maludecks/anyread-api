
const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path');

const logDir = 'logs';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const filename = path.join(logDir, 'results.log');

const logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.File({ filename })
  ]
});


exports.log = (message, type) => {
  switch (type) {
    case 'debug':
      logger.debug(message);
      break;
    case 'info':
      logger.info(message);
      break;
    default:
      logger.error(message);
      break;
  }
};
