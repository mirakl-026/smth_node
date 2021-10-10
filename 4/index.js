const express = require("express");

const Handlebars = require('handlebars');
const exphbs = require("express-handlebars");
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

// роуты
const homeRoutes = require("./routes/home");
const addRoutes = require("./routes/add");
const coursesRoutes = require("./routes/courses");
const cartRoutes = require("./routes/cart");
const path = require("path");

// подключаем mongoose
const mongoose = require("mongoose");



const app = express();

// конфигурация handlebars
// регистрация движка рендеринга
app.engine('hbs', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: "main",
    extname: "hbs"
}));  // есть такой движок


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


const PORT = process.env.PORT || 3000;

// pass от Atlas
// url - connection string

async function start() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/app_courses");   
        
    } catch (error) {
        console.log(error);
    }
}

start();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});



