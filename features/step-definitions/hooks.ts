import { Before, After } from '@wdio/cucumber-framework';
import logger from '../utils/logger.ts';
import { addLabel } from '@wdio/allure-reporter';

import fs from 'fs-extra';
import path from 'path';

const allureResultsPath = path.join(process.cwd(), 'allure-results');
const categoriesFile = path.join(allureResultsPath, 'categories.json');

const categoriesMap: Record<string, Set<string>> = {
  Author: new Set(),
  Category: new Set(),
};

// Utility to extract tag values like @Author("JohnDoe") → { key: Author, value: JohnDoe }
function extractTagValue(tag: string, key: string): string | null {
  const regex = new RegExp(`@${key}\\(["']?(.+?)["']?\\)`);
  const match = tag.match(regex);
  return match ? match[1] : null;
}

Before(async (scenario) => {
  logger.info(`Running Scenario: ${scenario.pickle.name}`);

  // Add QA name
  const testerName = process.env.QA_NAME || ''; // or pull from CLI/config
  addLabel('tester', testerName);
});

After(async function (scenario) {
  logger.info('Ending Scenario...');

  const tags = scenario.pickle.tags.map((tag) => tag.name);

  // Category implementation
  for (const key of Object.keys(categoriesMap)) {
    tags.forEach((tag) => {
      const value = extractTagValue(tag, key);
      if (value) {
        categoriesMap[key].add(value);
      }
    });
  }

  type AllureCategory = {
    name: string;
    matchedStatuses: string[];
    messageRegex: string;
  };
  // Write the categories.json at end of test run
  process.on('exit', () => {
    const categories: AllureCategory[] = [];

    for (const [key, values] of Object.entries(categoriesMap)) {
      values.forEach((value) => {
        categories.push({
          name: `${key}: ${value}`,
          matchedStatuses: ['failed'],
          messageRegex: '.*',
        });
      });
    }

    fs.ensureDirSync(allureResultsPath);
    fs.writeJsonSync(categoriesFile, categories, { spaces: 2 });
  });
});
