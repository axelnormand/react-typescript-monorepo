

const { getJestConfig } = require("./build/jest/config")

const config = getJestConfig(__dirname, true);

module.exports = {
  ...config,
  projects: ["common", "app1", "app2"],
  coverageDirectory: './dist/jest',
  collectCoverageFrom: [
    '**/src/**/*.ts',
    '**/src/**/*.tsx',
    '!**/src/**/*.story.tsx',
    '!**src/**/*.d.ts',
  ],
};
