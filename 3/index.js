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

// обработка запросов
app.get("/", (req, res) => {
    res.render("index");    // название страницы hbs для рендера

});

app.get("/about", (req, res) =>{
    res.render("about");
});





const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});

