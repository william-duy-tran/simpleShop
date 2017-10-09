var path = require('path');

module.exports = {
  entry: "./app/app.js",
  output: {
    path: path.resolve(__dirname, 'app/dist'),
    filename: 'bundle.js'
  }
};