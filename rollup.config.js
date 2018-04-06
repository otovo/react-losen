var flow = require('rollup-plugin-flow');
var babel = require('rollup-plugin-babel');

export default {
    input: './src/entry.js',
    output: {
      file: 'index.js',
      format: 'cjs'
    },
    plugins: [flow({ pretty: true }),  babel({
        babelrc: false,
        exclude: 'node_modules/**',
        presets: ['stage-1'],
        plugins: [],
      })]
}
