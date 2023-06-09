
// 服务端没有 window 对象，需要处理一下
if (typeof window === 'undefined') {
    global.window = {};
}
const fs = require('fs');
const path = require('path');
// 采用 express 启动 node 服务器，记得安装 npm i express -D
const express = require('express');
const { renderToString } = require('react-dom/server');
const SSR = require('../dist/index-server');
const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8')

const server = (port) => {
    const app = express();
    app.use(express.static('dist'));
    app.get('/index', (req,res) => {
        const html = renderMarkup(renderToString(SSR));

        console.log('html', html);
        res.status(200).send(html);
    });
    app.listen(port, () => {
        console.log('Server is running on port:' + port);
    });
}
server(process.env.PORT || 3000);
const renderMarkup = (str) => {
    // const dataStr = JSON.stringify(data);
    return template.replace('<!--HTML_PLACEHOLDER-->', str);
    // return `
    // <!DOCTYPE html>
    // <html lang="en">
    // <head>
    //     <meta charset="UTF-8">
    //     <meta http-equiv="X-UA-Compatible" content="IE=edge">
    //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //     <title>Document</title>
    // </head>
    // <body>
    //     <div id="root">${str}</div>
    // </body>
    // </html>
    // `;
}