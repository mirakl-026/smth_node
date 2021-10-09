// Модуль http
const http = require("http");

// позволяет создавать сервер
// к прмеру в php сервер не создаётся, там за это отвечают
// nginx и apache

// в Node нужно создать и настраивать свой сервер

// в аргумент передаётся хэндлер с двумя параметрами
// запрос и ответ
const server = http.createServer((req, res) => {
    console.log(req.url);   // / - корень

    res.write("<h1>hello from NodeJS</h1>"); 
    res.write("<p>test message</p>");       // но у заголовков нет content-type
    res.end(`
        <div style="background: red; width: 200px; height: 200px;">
            <h3>Test</h3>
        <div>
    `);  // обязательно закрыть ответ
});

// запуск сервера на порту 3000, и колбэк запуска
server.listen(3000, () => {
    console.log("Server is running...")
});



