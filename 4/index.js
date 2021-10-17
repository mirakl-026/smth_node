const express = require("express");

const Handlebars = require('handlebars');
const exphbs = require("express-handlebars");
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const csurf = require("csurf");
// роуты
const homeRoutes = require("./routes/home");
const addRoutes = require("./routes/add");
const coursesRoutes = require("./routes/courses");
const cartRoutes = require("./routes/cart");
const ordersRoutes = require("./routes/orders");
const authRoutes = require("./routes/auth");

// сессия
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const varMiddleware = require("./middleware/variables");
const userMiddleware = require("./middleware/user");


const MONGODB_URI = "mongodb://127.0.0.1:27017/app_courses";

const path = require("path");
// const User = require("./models/user");

// подключаем mongoose
const flash = require("connect-flash");
const mongoose = require("mongoose");



const app = express();

// конфигурация handlebars
// регистрация движка рендеринга
app.engine('hbs', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: "main",
    extname: "hbs"
}));  // есть такой движок


const store = new MongoStore({
    collection: "sessions",
    uri: MONGODB_URI
});

app.set("view engine", "hbs");  // регестрируем
app.set("views", "views");  // папки представлений и шаблонов


// регистрация папки public как статической
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended: true}));

// настройка сессии
app.use(session({
    secret: "lumber0jack2",
    resave: false,
    saveUninitialized: false,
    store: store
}));
// CSRF защита сразу после сессии
app.use(csurf());

// 
app.use(flash());

// теперь мы можем обращаться к объекту request.session и 
// выполнять какой-то функционал
app.use(varMiddleware);
app.use(userMiddleware);



// префиксы первым параметром
app.use("/", homeRoutes); // подключаем роуты в конвейер
app.use("/add", addRoutes);
app.use("/courses", coursesRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", ordersRoutes);
app.use("/auth", authRoutes);


const PORT = process.env.PORT || 3000;

// pass от Atlas
// url - connection string

async function start() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            // useFindAndModify: false
          });  


        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}...`);
        });

    } catch (error) {
        console.log(error);
    }
}

start();




