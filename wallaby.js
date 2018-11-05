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

    // wallaby doesnt support jest multi-projects: https://github.com/wallabyjs/public/issues/1856
    // therefore re-specify the tsconfig paths mappings as don't have paths in the root tsconfig.json
    // also to fix the "src/" tsconfig path alias appearing in all the projects, tell wallaby about multiple project roots to search
    setup: () => {
      const jestConfig = require('./jest.config');
      jestConfig.moduleNameMapper = {
        ...jestConfig.moduleNameMapper,
        '^@monorepo/common/(.*)$': '<rootDir>/common/src/$1',        
      };
      jestConfig.modulePaths = ['<rootDir>/common', '<rootDir>/app1', '<rootDir>/app2']
      wallaby.testFramework.configure(jestConfig);
    },

    reportConsoleErrorAsError: true,
    lowCoverageThreshold: 80,
    debug: true,
  };
};
