const path = require('path');

module.exports = {
  entry: './js/webflow.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  module: {
    rules: [
      // Other rules can go here
    ],
  },
};