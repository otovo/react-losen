const flow = require('rollup-plugin-flow');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');

export default {
  input: './src/entry.js',
  output: {
    file: 'index.js',
    format: 'cjs',
  },
  plugins: [
    flow({ pretty: true }),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: ['stage-1'],
      plugins: [],
    }),
    uglify(),
  ],
};
