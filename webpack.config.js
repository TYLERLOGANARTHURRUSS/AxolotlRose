const path = require('path'); 
const bodyParser = require('body-parser');
const { HotModuleReplacementPlugin } = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
  },
  mode: isDevelopment ? 'development' : 'production',
  module: { 
    rules: [
      {
        test: /\.css$/i,
        use: [
          //'handlebars-loader', // handlebars loader expects raw resource string
          //'extract-loader',
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.jsx?/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', ],
            plugins: [
              '@babel/transform-runtime'
          ],
          },
          
        },
      }, 
      {
        test: /\.s[ac]ss$/i,
        exclude: /(node_modules|bower_components)/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  }, 
  plugins: [
    isDevelopment && new HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  devServer: {
    publicPath: '/build/', 
    proxy: {
      '/' : 'http://localhost:3000/'
    }, 
     port: 8080,
     hot: true,
     historyApiFallback: true,
  },
}; 