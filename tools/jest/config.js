const path = require('path');
const { pathsToModuleNameMapper } = require('ts-jest/utils');

/**
 * generate jest config for your project
 * @param {string} projectDir set to __dirname
 */
const getJestConfig = (projectDir, isRoot) => {
  const getJestPath = filename =>
    path.join(projectDir, isRoot ? './' : '../', `tools/jest/${filename}`);

  //generate paths mapping specified in tsconfig.json so jest can follow those lerna imports
  const tsConfigFile = path.join(projectDir, 'tsconfig.json');
  const tsConfig = require(tsConfigFile);
  let tsPaths = {};
  if (tsConfig.compilerOptions && tsConfig.compilerOptions.paths) {
    tsPaths = pathsToModuleNameMapper(tsConfig.compilerOptions.paths, {
      prefix: `${projectDir}/`,
    });
  }

  return {
    globals: {
      'ts-jest': {
        isolatedModules: true,
        tsConfig: tsConfigFile,
      },
    },
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testMatch: ['**/*.test.{ts,tsx}'],
    modulePaths: [projectDir], //allow absolute imports eg import Button from 'src/comps/Button'
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|webp|svg)$': getJestPath('fileMock.js'),
      '\\.(eot|otf|ttf|woff|woff2)$': getJestPath('fileMock.js'),
      '\\.(mp4|webm|wav|mp3|m4a|aac|oga)$': getJestPath('fileMock.js'),
      '\\.(css|sass|scss)$': getJestPath('fileMock.js'),
      ...tsPaths,
    },
    setupFiles: [getJestPath('jestSetup.js')],
    setupTestFrameworkScriptFile: getJestPath('jestFrameworkSetup.js'),
  };
};

module.exports = {
  getJestConfig,
};
