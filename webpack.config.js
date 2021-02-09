const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, 'src/index'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {minimize: true}
          }
        ]
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/react' ],
              plugins: ['@babel/plugin-proposal-class-properties', "@babel/plugin-transform-runtime"]
            }}
          ],
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },

  plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      }),
    
  ],
  devServer: {
      historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  }
}