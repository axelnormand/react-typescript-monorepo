const getBabelConfig = () => {
  const presets = [
    [
      "@babel/env",
      {
        "targets": {
          "browsers": ["last 2 versions"]
        }
      }
    ],
    "@babel/react",
  ];
  const plugins = [
    "babel-plugin-styled-components",
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread"
  ];

  return {
    presets,
    plugins
  };
}

module.exports = {
  getBabelConfig
}