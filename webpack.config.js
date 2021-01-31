const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
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
      hot: true,
      proxy: {
        '/api': { 
          target: 'http://localhost:2567', 
          changeOrigin : true,
         },
      },
  }
}