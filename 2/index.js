// Модуль http
const http = require("http");
const fs = require("fs");
const path = require("path");



const server = http.createServer((req, res) => {
    if(req.method === "GET") {
        // указываем content type
        res.writeHead(200, {
            "Content-Type":"text/html; charset=utf-8"  // тип контента - то как браузер воспринимает ответ
        });

        if (req.url === "/") {
            // index.html
            fs.readFile(
                path.join(__dirname, "views", "index.html"),
                "utf-8",
                (err, content) => {
                    if (err) throw new Error(err);

                    res.end(content);
                }
            );
        } else if (req.url === "/about") {
            // about.html
            fs.readFile(
                path.join(__dirname, "views", "about.html"),
                "utf-8",
                (err, content) => {
                    if (err) throw new Error(err);

                    res.end(content);
                }
            );
        } else if (req.url === "/api/users") {
            res.writeHead(200, {
                "Content-Type":"text/json"
            });

            const users = [
                {name:"Vlad", age: 25},
                {name:"Elena", age: 23}
            ]

            res.end(JSON.stringify(users));
        }

    } else if (req.method === "POST") {

        const body = [];    // тело запроса - массив 
        res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8" // тип ответа и кодировка
        });

        req.on("data", (data) => {
            body.push(Buffer.from(data));   // записываем данные в массив
        });

        req.on("end", () => {
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



