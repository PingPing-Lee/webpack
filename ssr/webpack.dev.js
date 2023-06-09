

const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
// 导入生成预览页面的插件，得到一个构造函数
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    mode: 'none',
    optimization: {
        usedExports: true,
    },
    module: {
        rules: [
            {
                test: /.js$/,
                use: ['babel-loader'],
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                ],
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '服务端渲染 SSR',
            template: path.join(__dirname, 'src/indexs.html'), // 指定要用到的模版文件
            filename: 'app.html'    //指定生成的文件的名称，该文件存在于内存中，在目录中不显示
        }),
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css',
        }),
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        function() {
            this.hooks.done.tap('done', (stats) => {
                if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1){
                    console.log('build error');
                    process.exit(1);
                }
            })
        }   
    ],
    devServer: {
        contentBase: './dist',
        open: true,
        stats: 'errors-only'
    },
    stats: 'errors-only',
    devtool: 'source-map',
};
