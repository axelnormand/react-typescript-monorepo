const { getWebpackConfig } = require("../build/webpack/config")

const config = getWebpackConfig(__dirname);

module.exports = config;
