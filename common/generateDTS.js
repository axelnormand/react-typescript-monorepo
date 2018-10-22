//
// This script is to generate each a single combined .d.ts file in the `dist/tsc` directory
// Then you are able to import a submodule like this: import {Header} from '@monorepo/common/comps'
// Typescript `tsc` for now doesn't generate a single d.ts like this for multiple modules
//

const generator = require('dts-generator').default;

const OUTPUT_FILE = `dist/tsc/index.d.ts`;
const name = require("./package.json").name;

console.log(`Generating ${OUTPUT_FILE}`);
  generator({
    name: name,
    project: `./`,
    out: OUTPUT_FILE,
});
