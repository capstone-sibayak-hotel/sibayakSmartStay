const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    app: "./index.js",
    "login-admin": "./login-admin.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./pages/index.html",
      filename: "index.html",
      chunks: ["app"],
    }),
    new HtmlWebpackPlugin({
      template: "./pages/reservation-data.html",
      filename: "reservation-data.html",
      chunks: ["app"],
    }),
    new HtmlWebpackPlugin({
      template: "./pages/room-data.html",
      filename: "room-data.html",
      chunks: ["app"],
    }),

    new HtmlWebpackPlugin({
      template: "./pages/login-admin.html",
      filename: "login-admin.html",
      chunks: ["login-admin"],
    }),

    new CopyWebpackPlugin({
      patterns: [{ from: "./assets", to: "assets", noErrorOnMissing: true }],
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};
