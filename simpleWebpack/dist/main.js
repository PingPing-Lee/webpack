
            (function(modules) {
                function require(fileName) {
                    const fn = modules[fileName];
        
                    const module = { exports : {} };
        
                    fn(require, module, module.exports);
        
                    return module.exports;
                }

                require('/Users/muzi/my/study/webpack/my-webpack-project/simpleWebpack/src/index.js');
            })({'/Users/muzi/my/study/webpack/my-webpack-project/simpleWebpack/src/index.js': function(require, module, exports) { "use strict";

var _testModule = require("testModule.js");

var _testModule2 = _interopRequireDefault(_testModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sayHi = _testModule2.default.sayHi;


document.write(sayHi('平平李')); },'testModule.js': function(require, module, exports) { "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var sayHi = function sayHi(name) {
  return "hi " + name;
};
exports.default = {
  sayHi: sayHi
}; },})
        