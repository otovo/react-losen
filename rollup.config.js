const babel = require('rollup-plugin-babel');
const { uglify } = require('rollup-plugin-uglify');

export default {
  input: './src/entry.js',
  output: {
    file: 'index.js',
    format: 'cjs',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    uglify(),
  ],
};
