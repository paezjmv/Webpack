const path = require('path');
// path es un paquete que ya viene instalado con node
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');


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
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/images/[hash][ext][query]'
   },
   mode: 'development',
   resolve: {
    //  Aqui ponemos las extensiones con las que webpack trabajara
     extensions: ['.js'],
     alias: {
       '@utils': path.resolve(__dirname, 'src/utils/'),
       '@templates': path.resolve(__dirname, 'src/templates/'),
       '@styles': path.resolve(__dirname, 'src/styles/'),
       '@images': path.resolve(__dirname, 'src/assets/images/'),
     }
   },
   // Agregando el modulo para operar con babel
   module: {
    rules: [
      { //Loader de Babel
        // Test declara que extension de archivos aplicara el loader
        test: /\.m?js$/,
        // exclude permite omitir archivos o carpetas
        exclude: /node_modules/,
        // Use es un objeto donde dices que loaders aplicaras
        use: {
          loader: 'babel-loader'
        }
      },
      { //Loader de Css y Preprocesadores
        // Test que delcara la extencion de archivos para el loader de CSS y preprocesador
        test: /\.css|.styl$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader'
        ],
      },
      { // Loader de Imagenes
        test: /\.png/,
        type: 'asset/resource',
      },
      { //Loader de Fuentes
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: "aplication/font-woff",
            name: "[name].[contenthash].[ext]",
            outputPath: "./assets/fonts/",
            publicPath: "../assets/fonts/",
            esModule: false,
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true, //Inyecta el bundle al Template HTML
      template: './public/index.html', //Definimos la ruta del template html
      filename: './index.html' //Asignamos nombre al archivo
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images"
        }
      ]
    }),
    new Dotenv(),
  ]
}