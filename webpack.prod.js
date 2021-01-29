const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCddAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebPackPlugin = require('copy-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const  { CleanWebpackPlugin }  =  require ( 'clean-webpack-plugin' )

module.exports = {
    mode: 'production',
    optimization: {
        minimizer: [ new OptimizeCddAssetsPlugin()]
    },
    output:{
        filename: 'main.[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /style\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /style\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options:{
                    attributes: false,
                    minimize: false
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/i,
                loader: 'file-loader',
                options:{
                    esModule: false
                }
            },
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            ignoreOrder: false
        }),
        new CopyWebPackPlugin({
            patterns: [
                {from: 'src/assets', to: 'assets/'}
            ]
        }),
        new MinifyPlugin(),
        new  CleanWebpackPlugin() 
    ]
}


