const path = require("path");

// работа с путями в NodeJS

console.log(__filename);    // C:\Users\Evgeniy\Documents\_my_projects\_js\_udemy_node\udemy_node\2\refs\path_ref.js
console.log(path.basename(__filename)); // path_ref.js - забирает имя из пути

console.log(path.dirname(__filename));  // C:\Users\Evgeniy\Documents\_my_projects\_js\_udemy_node\udemy_node\2\refs 
                                        // из названия пути файла - получить путь до него

console.log(path.extname(__filename));  // .js - получить расширение файла


// благодаря модулю path есть возможность работать с названиями путей и файлов как с объектами
console.log(path.parse(__filename));
/*
    {
        root: 'C:\\',
        dir: 'C:\\Users\\Evgeniy\\Documents\\_my_projects\\_js\\_udemy_node\\udemy_node\\2\\refs',
        base: 'path_ref.js',
        ext: '.js',
        name: 'path_ref'
    }
*/
console.log(path.parse(__filename).ext);    // .js

// функции работы с путями
// join - соединяет строки в путь
console.log(path.join(__dirname, "test", "second.html"));
// C:\Users\Evgeniy\Documents\_my_projects\_js\_udemy_node\udemy_node\2\refs\test\second.html
// - путь который поймёт nodejs

console.log(path.resolve(__dirname, "test", "second.html"));
// C:\Users\Evgeniy\Documents\_my_projects\_js\_udemy_node\udemy_node\2\refs\test\second.html
console.log(path.resolve(__dirname, "./test", "/second.html"));
// C:\second.html

// документацию можно глянуть - nodejs - docs - v_X.API - table of contents - там все модули 
// - Path - и там всё есть
// к примеру метод normalize

// в join соединяются строки, resolve работает с абсолютными И относительными путями