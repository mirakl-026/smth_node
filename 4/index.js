const express = require("express");
const exphbs = require("express-handlebars");

// роуты
const homeRoutes = require("./routes/home");
const addRoutes = require("./routes/add");
const coursesRoutes = require("./routes/courses");
const cartRoutes = require("./routes/cart");
const path = require("path");

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
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended: true}));

// префиксы первым параметром
app.use("/", homeRoutes); // подключаем роуты в конвейер
app.use("/add", addRoutes);
app.use("/courses", coursesRoutes);
app.use("/cart", cartRoutes);


// pass от Atlasa
// url - connection string



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});

