const webpack = require('webpack');

module.exports = {
  entry: [
    // WebpackDevServer host and port.
    'webpack-dev-server/client?http://localhost:8080',

    // 'only' prevents reload on syntax errors.
    'webpack/hot/only-dev-server',

    // App's entry point.
    './src/index.js'
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
