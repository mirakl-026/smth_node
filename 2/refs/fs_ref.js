const fs = require("fs");
const path = require("path");

// File system
// есть синхронные методы, есть асинхронные методы

//fs.mkdir();      // асинхронный метод
//fs.mkdirSync();  // синхронный метод

// рекомендуется всегда вызывать асинхронные методы, чтобы не блокировать работу 
// основного потока - вдруг файл большой

// fs.mkdir(path.join(__dirname, "notes"), function(error) {
//     // callback функция, есть конвенция ,что первый параметр всегда ошибка
//     if (error)
//         throw new Error(error);    // со второго раза - ошибка, папка уже существует

//     console.log("Папка создана");
// });

// fs.writeFile(
//     path.join(__dirname, "notes", "myNotes.txt"), 
//     "Hello from NodeJS - FS",
//     function(err) {
//         if (err) throw new Error(err);

//         console.log("Файл создан");
//     }
// );

// для добавление нового контента fs.appendFile
// fs.appendFile(
//     path.join(__dirname, "notes", "myNotes.txt"), 
//     "\nFrom append: node node node!",
//     function(err) {
//         if (err) throw new Error(err);

//         console.log("Файл был изменён");
//     }
// );

// считывание файлов -
// fs.readFile(
//     path.join(__dirname, "notes", "myNotes.txt"),
//     "utf-8",
//     (err, data) => {
//         // data - объект, в который считываются данные из файла
//         if (err) throw new Error(err);

//         // считывание 
//         //console.log(data); //<Buffer 48 65 6c 6c 6f 20 66 72 6f 6d 20 4e 6f 64 65 4a 53 20 2d 20 46 53 46 72 6f 6d 20 61 70 70 65 6e 64 3a 20 6e 6f 64 65 20 6e 6f 64 65 20 6e 6f 64 65 21 ... 29 more bytes>

//         // для оптимизации чтения - NodeJs использует концепт буфера - 
//         // файлы считываются по частям
//         // для получения данных 2 пути - привести буфер к строке
//         // console.log(Buffer.from(data).toString());
//         // Hello from NodeJS - FS      From append: node node node!

//         // либо так:
//         // передаём кодировку - 2 параметром и считываем как обычно
//         console.log(data);
//         // Hello from NodeJS - FS      From append: node node node!
//     }
// );

// Владилен всё это время получал только hello world, так как аппенд был асинхронным
// чтобы получить всё вовремя - код чтения необходимо переместить в обработчик append
// fs.appendFile(
//     path.join(__dirname, "notes", "myNotes.txt"), 
//     "\nFrom append: node node node!",
//     function(err) {
//         if (err) throw new Error(err);
//
//         console.log("Файл был изменён");
//
//          fs.readFile(
//              path.join(__dirname, "notes", "myNotes.txt"),
//              "utf-8",
//              (err, data) => {
//                 
//                  if (err) throw new Error(err);
//           
//                  console.log(data);
//                  // Hello from NodeJS - FS      From append: node node node!
//              }
//          );
//     }
// );

// переименовывание файла - fs.rename
// fs.rename(
//     path.join(__dirname, "notes", "myNotes.txt"),
//     path.join(__dirname, "notes", "notes.txt"),
//     err => {
//         if(err) throw new Error(err);

//         console.log("Файл переименован")
//     }
// );

// ознакомится с функциями fs - access, exists, open и т.д.