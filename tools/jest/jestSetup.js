// Setup for use with enzyme
// Patching console.error so test will fail

// Use in jest.config.js under setupFiles
// Configures the jest environment 


// Ignore console.log whilst running tests
console.log = () => {};

// Throw error upon console.error to fail test
// Ignore a few console.error whilst running tests
const suppressedErrors = /(React\.createElement: type is invalid)/;
const realConsoleError = console.error;
console.error = message => {
  if (message.match(suppressedErrors)) {
    return;
  }
  const msg = `Console.Error in Test: "${message}"`;
  realConsoleError(msg);
  throw new Error(msg);
};
