const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index-server.js',
        libraryTarget: 'umd',
    },
    mode: 'none',
    module: {
        rules: [
            {test: /.js$/, use: ['babel-loader']},
            {
                test: /\.(css|less)$/,
                use: [
                    'MiniCssExtractPlugin.loader',
                    'css-loader',
                    'less-loader'
                ],
            },
            // {test: /.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader','postcss-loader']},
            // {
            //     test: /\.(png|jpe?g|gif|bmp|ttf|eot|svg|woff|woff2$)$/,
            //     use: {
            //         loader: "file-loader",
            //         options: {
            //             name: "[name]_[hash:8].[ext]",
            //             outputPath: "images/"
            //         }
            //     }
            // }
        ],
    },
    plugins: [
        // new MiniCssExtractPlugin({
        //     filename: '[name]_[contenthash:8].css',
        // }),
        // new OptimizeCSSAssetsPlugin({
        //     assetNameRegExp: /\.css$/g,
        //     cssProcessor: require('cssnano'),
        // }),
        new HtmlWebpackPlugin({
            title: '测试自定义标题',
            template: path.join(__dirname, 'src/index.html'), // 指定要用到的模版文件
            filename: 'index.html'    //指定生成的文件的名称，该文件存在于内存中，在目录中不显示
        }),
    ],
};
