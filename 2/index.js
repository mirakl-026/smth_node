// console.log("Hi");
// console.log(__dirname);
// console.log(__filename);

const u = require("./user");

console.log(u); // { name: 'Elena', age: 25 }
u.sayHello();

// в JS есть функции которые вызывают сами себя
(function(require, module, exprots, __filename, __dirname){

})();   // любой файл ля nodejs - nodejs оборачивает в такую функцию каждый модуль и получается
// так:
// (function(require, module, exprots, __filename, __dirname){
//     const u = require("./user");

//     console.log(u); // { name: 'Elena', age: 25 }
//     u.sayHello();
// })(); 
