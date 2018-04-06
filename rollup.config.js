var flow = require('rollup-plugin-flow');
var babel = require('rollup-plugin-babel');

export default {
    input: 'index.js',
    output: {
      file: 'dist/react-wizard.js',
      format: 'cjs'
    },
    plugins: [flow({ pretty: true }),  babel({
        babelrc: false,
        exclude: 'node_modules/**',
        presets: ['stage-1'],
        plugins: [],
      })]
}
