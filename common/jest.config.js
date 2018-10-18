const { getJestConfig } = require("../build/jest/config")

const config = getJestConfig(__dirname);

module.exports = config;
