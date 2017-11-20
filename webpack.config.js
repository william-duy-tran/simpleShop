var path = require('path');

module.exports = {
  entry: "./app/app.js",
  output: {
    path: path.resolve(__dirname, 'app/dist'),
    filename: 'app.bundle.js',
    publicPath:'/assets/'
  }
};