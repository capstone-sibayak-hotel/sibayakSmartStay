const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './pages/index.html',
      filename: 'index.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      template: './pages/login.html',
      filename: 'login.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      template: './pages/register.html',
      filename: 'register.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      template: './pages/booking.html',
      filename: 'booking.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      template: './pages/review.html',
      filename: 'review.html',
      chunks: ['main'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'assets', to: 'assets' }
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    hot: true,
  },
}; 