'use strict';

let path = require('path');
let webpack = require('webpack');

module.exports = {
    entry: [
       './src/main.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        devtoolLineToLine: true
    },
    module: {
        loaders: [
            {
              exclude: /node_modules/,
              test: /src\/.+.jsx?$/,
              loader: 'babel-loader'
            },
            {
               test: /\.css$/,
               loader: "style-loader!css-loader"
            },
            {
              test: /\.(jpg|png|gif)$/,
              loader: "file-loader?name=images/[hash].[ext]"
            },
            {
              test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
              test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              loader: "file"
            }
        ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        })
    ],
    devServer: {
      hot: true,
      historyApiFallback: true,
      contentBase: './dist'
    }
}

