const { getJestConfig } = require("../tools/jest/config")

const config = getJestConfig(__dirname);

module.exports = config;
