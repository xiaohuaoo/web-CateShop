// 使用babel
require('babel-register')
// 将app.js挂载到这里
require('./src/app')
// 解决ReferenceError: regeneratorRuntime is not defined问题
