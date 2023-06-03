

const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
// 导入生成预览页面的插件，得到一个构造函数
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];

    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));

    console.log(entryFiles, 'entryFiles');

    Object.keys(entryFiles)
        .map((index) => {
            const entryFile = entryFiles[index];
            const match = entryFile.match(/src\/(.*)\/index\.js/);
            const pageName = match && match[1];

            entry[pageName] = entryFile;
            htmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    inlineSource: '.css$',
                    template: path.join(__dirname, `src/${pageName}/index.html`),
                    filename: `${pageName}.html`,
                    chunks: ['vendors', pageName],
                    inject: true,
                    minify: {
                        html5: true,
                        collapseWhitespace: true,
                        preserveLineBreaks: false,
                        minifyCSS: true,
                        minifyJS: true,
                        removeComments: false,
                    },
                }),
            );
        });

    return {
        entry,
        htmlWebpackPlugins,
    };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
    entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js',
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
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    'postcss-loader',
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|bmp|ttf|eot|svg|woff|woff2$)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name]_[hash:8].[ext]',
                        outputPath: 'images/',
                    },
                },
            },
        ],
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     title: '测试自定义标题',
        //     template: path.join(__dirname, 'src/search.html'), // 指定要用到的模版文件
        //     filename: 'app.html'    //指定生成的文件的名称，该文件存在于内存中，在目录中不显示
        // }),
        // new webpack.HotModuleReplacementPlugin(), // chunkhash 不能和热更新 HotModuleReplacementPlugin 插件一起使用
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css',
        }),
        // new webpack.optimize.ModuleConcatenationPlugin(),
        new CleanWebpackPlugin(),
    ].concat(htmlWebpackPlugins),
    devServer: {
        contentBase: './dist',
        open: true,
    },
    devtool: 'source-map',
};
