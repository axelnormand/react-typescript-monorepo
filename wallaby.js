//
// Wallaby config reads tsconfig.json and jest.config.js out of the box
//

module.exports = function(wallaby) {
  return {
    files: [
      '**/src/**/*.ts?(x)',
      '**/src/**/*.json',
      '**/src/**/*.snap',
      '**/assets/**/*.*',
      '**/package.json',
      '**/tsconfig.json',
      '**/jest.config.js',
      '**/build/jest/**/*',
      '!**/src/**/*.test.ts?(x)',
      '!**/node_modules/**/*',
      '!**/dist/**/*',
    ],
    tests: ['**/src/**/*.test.ts?(x)', '!**/node_modules/**/*'],
    env: { type: 'node', runner: 'node' },
    testFramework: 'jest',

    // make wallaby following lerna packages
    setup: w => {
      const jestConfig = require('./jest.config');
      jestConfig.moduleNameMapper = {
        ...jestConfig.moduleNameMapper,
        '^@monorepo/common/(.*)$': '<rootDir>/common/src/$1',        
      };
      wallaby.testFramework.configure(jestConfig);
    },

    reportConsoleErrorAsError: true,
    lowCoverageThreshold: 80,
    debug: true,
  };
};
