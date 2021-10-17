// express и handlebars
const express = require("express");
const Handlebars = require('handlebars');
const exphbs = require("express-handlebars");
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

// роуты
const homeRoutes = require("./routes/home");
const addRoutes = require("./routes/add");
const coursesRoutes = require("./routes/courses");
const cartRoutes = require("./routes/cart");
const ordersRoutes = require("./routes/orders");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const path = require("path");

// сессия, Бд и MW
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");

const varMiddleware = require("./middleware/variables");
const userMiddleware = require("./middleware/user");
const error404Middleware = require("./middleware/error404");
const fileMiddleware = require("./middleware/file");
const csurf = require("csurf");
const flash = require("connect-flash");

// константы
const keys = require("./keys/index");
// const User = require("./models/user");






//==========================================================================
const app = express();

// конфигурация handlebars и регистрация движка рендеринга
app.engine('hbs', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: "main",
    extname: "hbs",
    helpers: require("./utils/hbs-helpers")
}));  // есть такой движок
app.set("view engine", "hbs");  // регестрируем
app.set("views", "views");  // папки представлений и шаблонов


// подключение к MongoDb и ORM Mongoose
const store = new MongoStore({
    collection: "sessions",
    uri: keys.MONGODB_URI
});


// регистрация папки public как статической
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));

// настройка сессии
app.use(session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
}));
// валидация файлов
app.use(fileMiddleware.single("avatar"));

// CSRF защита сразу после настройки сессии
app.use(csurf({}));

// проброс данных обо ошибках в роутинге (для клиента)
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
app.use("/profile", profileRoutes);

// обработку 404 - только в самом конце
app.use(error404Middleware);


const PORT = process.env.PORT || 3000;

// запуск express + mongoose
async function start() {
    try {
        await mongoose.connect(keys.MONGODB_URI, {
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




