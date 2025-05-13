import * as winston from 'winston';
import moment from 'moment-timezone';

let logger: winston.Logger;

if (process.env.WDIO_WORKER_ID) {
  const testId = `PID-${process.pid}`; // Unique per worker process

  logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.label({ label: testId }),
      winston.format.timestamp({
        format: () =>
          moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss.SSS'),
      }),
      winston.format.printf(({ timestamp, level, message, label }) => {
        return `[${timestamp} IST] [${label}] ${level}: ${message}`;
      })
    ),
    transports: [
      new winston.transports.File({ filename: `logs/${testId}.log` }),
      new winston.transports.Console(),
    ],
  });
} else {
  // Optional fallback for non-worker processes
  logger = winston.createLogger({
    transports: [new winston.transports.Console()],
    silent: true, // suppress output
  });
}

export default logger;
