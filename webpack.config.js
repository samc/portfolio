const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path')

module.exports = {
    entry: './public/js/main.js',
    output: {
        path: path.resolve(__dirname, 'public', 'dist'),
        filename: 'build.js'
    },
    module: {
        // Special compilation rules

        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'

            },
            {
                test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader",
                query:{
                    limit:'10000',
                    name:'[name].[ext]',
                    outputPath:'fonts/'
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader']
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("style.css"),
        new UglifyJSPlugin({
            uglifyOptions: {
                ie8: false,
                ecma: 5,
                parse: {},
                mangle: false,
                output: {
                    comments: false,
                    beautify: false
                },
                compress: false,
                warnings: false
            }
        })
    ]
}