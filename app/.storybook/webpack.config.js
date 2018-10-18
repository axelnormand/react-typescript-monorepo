const { getStorybookWebpackConfig } = require("../../build/webpack/storybookConfig")

const config = getStorybookWebpackConfig(__dirname);

module.exports = config;
