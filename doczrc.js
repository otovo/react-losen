import { css } from 'docz-plugin-css'; // eslint-disable-line

export default {
  plugins: [
    css({
      preprocessor: 'postcss',
      loaderOpts: {
        /* whatever your preprocessor loader accept */
      },
    }),
  ],
};
