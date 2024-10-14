const path = require('path');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './js/webflow.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devtool: isProduction ? false : 'source-map',
    module: {
      rules: [
        // Other rules can go here
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development')
      }),
    ],
  };
};