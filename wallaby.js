//
// Wallaby config reads tsconfig.json and jest.config.js out of the box
//

module.exports = function(wallaby) {
  return {
    files: [
      '**/src/**/*.{ts,tsx}',
      { pattern: '**/*.json', instrument: false },
      { pattern: '**/*.js', instrument: false },
      '!**/src/**/*.test.{ts,tsx}',
      '!**/src/**/*.story.tsx',
      '!**/node_modules/**/*',
      '!**/dist/**/*',
      '!**/build/**/*',
    ],
    tests: ['**/src/**/*.test.{ts,tsx}', '!**/node_modules/**/*'],
    env: { type: 'node', runner: 'node' },
    testFramework: 'jest',

    // make wallaby following lerna packages
    setup: () => {
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
