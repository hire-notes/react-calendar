var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = [{
  entry: './server.js',
  output: {
    path: __dirname +'/',
    filename: 'server.bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react','env']
      }
    }]
  },
  target: 'node',
  externals: [nodeExternals()]
},{
  entry: './src/index.js',
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}];
