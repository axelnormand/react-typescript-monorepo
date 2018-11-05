

const { getJestConfig } = require("./tools/jest/config")

const config = getJestConfig(__dirname, true);

module.exports = {
  ...config,
  projects: ["common", "app1", "app2"],
  coverageDirectory: './build/coverage',  
};
