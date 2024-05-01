import pino from 'pino';
import 'dotenv/config';

const cnf = {
  level: process.env.LOG_LEVEL || 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() }
    },
  },
}

if (process.env.NODE_ENV !== 'production') {
  cnf.transport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  };
}

class Logger {
  constructor(cnf) {
    this.log = pino(cnf)
    this.log.debug(cnf, 'Logger configured:')
  }
}

const logger = new Logger(cnf);

export default logger.log;
