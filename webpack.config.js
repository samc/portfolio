const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path')

module.exports = {
    // This is the "main" file which should include all other modules
    entry: './public/js/main.js',
    // Where should the compiled file go?
    output: {
        // To the `dist` folder
        path: path.resolve(__dirname, 'public', 'dist'),
        // With the filename `build.js` so it's dist/build.js
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
                test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,    //to support @font-face rule
                loader: "url-loader",
                query:{
                    limit:'10000',
                    name:'[name].[ext]',
                    outputPath:'fonts/'
                    //the fonts will be emmited to public/assets/fonts/ folder
                    //the fonts will be put in the DOM <style> tag as eg. @font-face{ src:url(assets/fonts/font.ttf); }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader', 'postcss-loader']
                })
                //use: ['style-loader', 'css-loader', 'postcss-loader']
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