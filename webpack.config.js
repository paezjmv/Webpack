const path = require('path');
const HtmelWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
   },
   resolve: {
     extensions: ['.js', '.jsx'],
   },
   module: {
    rules: [
      { 
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
        test: /\.html$/,
        use: [
          { loader: 'html-loader'}
        ]
      }
    ]
  },
  plugins: [
    new HtmelWebpackPlugin({
      template: './public/index.html',
      filename: './index.html'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    open: true,
    port: 3006,
  }
}