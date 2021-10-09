const express = require("express");
const exphbs = require("express-handlebars");

// роуты
const homeRoutes = require("./routes/home");
const addRoutes = require("./routes/add");
const coursesRoutes = require("./routes/cources");

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
// префиксы первым параметром
app.use("/", homeRoutes); // подключаем роуты в конвейер
app.use("/add", addRoutes);
app.use("/cources", coursesRoutes);




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});

