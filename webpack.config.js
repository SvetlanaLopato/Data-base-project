const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.join(__dirname, 'src'),

    entry: {
        app: './app',
        vendor: './vendor',
    },

    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].bundle.js',
        publicPath: '/',
    },

    resolve: {
        modules: ['node_modules', 'src']
    },

    watch: true,

    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },

    devtool: 'cheap-module-source-map',

    module: {
        loaders: [{
                test: /.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader'],
                }),
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader'],
                }),
            }],
    },

    devServer: {
        stats: 'minimal',
        port: 3000,
        historyApiFallback: true,
        compress: true,
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
           name: ['app', 'vendor'],
        }),
        new HtmlWebpackPlugin({
            template: './app.html',
        }),
        new WebpackNotifierPlugin(),
        new ExtractTextPlugin('styles.css')
    ]
}
