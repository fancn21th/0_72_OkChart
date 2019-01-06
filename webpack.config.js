const path = require("path");
// const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
  mode: 'development',
  entry: ["./src/index.js"],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "okchart.js"
  },
  devtool: 'inline-source-map',
  // plugins: [
  //   new CleanWebpackPlugin(['dist'])
  // ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".js"]
  },
  devServer: {
    contentBase: path.join(__dirname, "build"),
  }
};
module.exports = config;
