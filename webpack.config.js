const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const webpack = require('webpack');

const ESLintPlugin = require('eslint-webpack-plugin'); 

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        clean: true
    },
    mode: 'production',
    plugins: [
      new MiniCssExtractPlugin(), 
      new HtmlWebpackPlugin({
        template: './index.html'
      }) ,
      //new webpack.HotModuleReplacementPlugin(),
      new ESLintPlugin({fix: true}), 
    ],
    module: {
        rules: [
          { test: /\.s[ac]ss$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'], 
          },
          {
            test: /\.html$/i,
            loader: "html-loader",
          },
        ]
    },
    optimization: {   
        minimizer: [
          '...',        
          new CssMinimizerPlugin(),
        ],
    },
    devServer: {
      hot:true,
      static: {
        directory: path.join(__dirname, "dist"),
      },
    },
    devtool: 'source-map'
};