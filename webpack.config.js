const path = require('path');
// path es un paquete que ya viene instalado con node
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
  // Nos permite definir el punto de entrada de nuestra app
  entry: './src/index.js',
  // Nos permite definir hacia donde se enviara lo preparado por webpack
  output: { 
    /* Path es donde estara la carpeta donde se guardaran 
    los archivos */
    /* Path.resolve nos permite defnir la ruta especifica. 
    Gracias a __dirname rompemos la ambiguedad de que se 
    ubique en rutas especificas. Este siempre creara una 
    carpeta del nombre 'dist' */
    path: path.resolve(__dirname, 'dist'),
    // Este nombrar al archivo final
    filename: 'main.js',
   },
   resolve: {
    //  Aqui ponemos las extensiones con las que webpack trabajara
     extensions: ['.js']
   },
   // Agregando el modulo para operar con babel
   module: {
    rules: [
      {
        // Test declara que extension de archivos aplicara el loader
        test: /\.m?js$/,
        // exclude permite omitir archivos o carpetas
        exclude: /node_modules/,
        // Use es un objeto donde dices que loaders aplicaras
        use: {
          loader: 'babel-loader'
        }
      },
      {
        // Test que delcara la extencion de archivos para el loader de CSS y preprocesador
        test: /\.css|.styl$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader'
        ],
      },
      {
        test: /\.png/,
        type: 'asset/resource',
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true, //Inyecta el bundle al Template HTML
      template: './public/index.html', //Definimos la ruta del template html
      filename: './index.html' //Asignamos nombre al archivo
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images"
        }
      ]
    }),
  ]
}