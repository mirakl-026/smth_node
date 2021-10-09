// Модуль http
const http = require("http");



const server = http.createServer((req, res) => {
    if(req.method === "GET") {
        // указываем content type
        res.writeHead(200, {
            "Content-Type":"text/html"  // тип контента - то как браузер воспринимает ответ
        });

        res.end(`
            <h1>Form</h1>
            <form method="post" action="/">
                <input name="title" type="text" />
                <button type="submit">Send</button>
            </form>
        `);
    } else if (req.method === "POST") {
        // echo
        // получим сообщение пользователя
        const body = [];    // тело запроса - массив 
        res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8" // тип ответа и кодировка
        });
        // chunk - порция данных/параметров
        // req - наследник EventEmitter, у него есть событие data - Buffer, тот самый
        req.on("data", (data) => {
            body.push(Buffer.from(data));   // записываем данные в массив
        });

        // по завершению передачи все данные будут в массиве body
        req.on("end", () => {
            //console.log(body.toString()); // title=Jeka
            const message = body.toString().split("=")[1];

            res.end(`
                <h1>Ваше сообщение: ${message} </h1>
            `);

        });
    }
});


server.listen(3000, () => {
    console.log("Server is running...")
});



