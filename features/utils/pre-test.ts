import * as fs from 'fs-extra';
import * as path from 'path';
import logger from '../utils/logger.ts';

const allureResultsPath = path.join(process.cwd(), 'allure-results');
const allureReportPath = path.join(process.cwd(), 'allure-report');
const logPath = path.join(process.cwd(), 'logs');

try {
  fs.ensureDirSync(logPath);
  fs.emptyDirSync(logPath);
  fs.ensureDirSync(allureResultsPath);
  fs.ensureDirSync(allureReportPath);
  fs.ensureDirSync(logPath);
  fs.emptyDirSync(allureResultsPath);
  fs.emptyDirSync(allureReportPath);
  fs.emptyDirSync(logPath);
  logger.info('Cleared logs directory before test execution.');
} catch (error) {
  logger.error('Failed to clear logs:', error);
}
