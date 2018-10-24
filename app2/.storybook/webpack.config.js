const { getStorybookWebpackConfig } = require("../../tools/webpack/storybookConfig")

const config = getStorybookWebpackConfig(__dirname);

module.exports = config;
