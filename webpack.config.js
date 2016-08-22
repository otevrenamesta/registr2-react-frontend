var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: "./app/index.js",
    // style: "./styles/main.scss"
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].js'
  },
  externals: {
    "moment": "moment"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: ['transform-decorators-legacy']
        },
        exclude: [
          /node_modules\/moment/,
          /node_modules\/lodash/
        ]
      }
    ]
  },
  plugins: [
    // new ExtractTextPlugin('styles.css', { allChunks: true }),
    new htmlWebpackPlugin({
      name: process.env.SITENAME || 'Registr 2.0',
      apiUrl: process.env.API_URL || 'http://localhost:3000',
      template: 'index.template.html',
      inject: false
    }),
  ],
  node: {
    fs: 'empty'
  }
};
