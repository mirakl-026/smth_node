const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

// конфигурация handlebars
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs"
});

// регистрация движка рендеринга
app.engine("hbs", hbs.engine);  // есть такой движок
app.set("view engine", "hbs");  // регестрируем
app.set("views", "views");  // папки представлений и шаблонов


// регистрация папки public как статической
app.use(express.static("public"));



// обработка запросов
app.get("/", (req, res) => {
    res.render("index", {
        title: "Главная страница",  // заголовок
        isHome: true    // активная страница
    });
});

app.get("/add", (req, res) =>{
    res.render("add", {
        title: "Добавить курс",
        isAdd: true
    });
});

app.get("/cources", (req, res) =>{
    res.render("cources", {
        title: "Курсы",
        isCources: true
    });
});






const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});

