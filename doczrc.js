import { css } from 'docz-plugin-css'; // eslint-disable-line

export default {
  src: './pages',
  public: './public',
  htmlContext: {
    favicon:
      'https://user-images.githubusercontent.com/2470775/39097362-8093ab6e-465b-11e8-845e-b21b893d6091.png',
  },
  plugins: [
    css({
      preprocessor: 'postcss',
      loaderOpts: {
        /* whatever your preprocessor loader accept */
      },
    }),
  ],
};
