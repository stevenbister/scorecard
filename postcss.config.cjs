/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('postcss-load-config').Config} */

const postcssJitProps = require('postcss-jit-props');
const OpenProps = require('open-props');

module.exports = {
    plugins: [postcssJitProps(OpenProps)],
};
