const webpack = require('webpack');

module.exports = {
  entry: [
    // WebpackDevServer host and port.
    'webpack-dev-server/client?http://localhost:8080',

    // 'only' prevents reload on syntax errors.
    'webpack/hot/only-dev-server',

    // App's entry point.
    './src/index.jsx'
  ],

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel'
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        // loader: 'style!css!autoprefixer?browsers=last 2 versions'
        loaders: [
          'style',
          'css',
          'autoprefixer?browsers=last 2 versions',
          'sass'
        ]
      }
    ]
  },

  output: {
    path: './dist',
    publicPath: '/',
    filename: 'bundle.js'
  },

  devServer: {
    contentBase: './dist',
    hot: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
