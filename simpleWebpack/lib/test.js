const path = require('path');
const { getAST, getDependencies, transform } = require('./parser.js');

const ast = getAST(path.join(__dirname, '../src/index.js'));

console.log(getDependencies(ast));
console.log(transform(ast));
