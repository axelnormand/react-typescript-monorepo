// Use in jest.config.js under setupTestFrameworkScriptFile 
// Configures the testing framework before each test

// adds toHaveStyleRule 
require('jest-styled-components');

// add some helpful assertions
require('jest-dom/extend-expect');

// unmount automatically after each test
require('react-testing-library/cleanup-after-each');