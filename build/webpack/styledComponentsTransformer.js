// since using faster happypack with ts-loader, need this custom transformer to 
// make debugging styled components nicer.
// once moved to babel typescript can remove this and go back to the normal babel-styled-components plugin
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;

const styledComponentsTransformer = createStyledComponentsTransformer();

// create getCustomTransformer function for ts-loader
const getCustomTransformers = () => ({ before: [styledComponentsTransformer] });


module.exports = getCustomTransformers;