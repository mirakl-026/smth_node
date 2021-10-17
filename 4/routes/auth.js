const {Router} = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const router = Router();

router.get("/login", async (req, res) => {
    res.render("auth/login", {
        title: "Авторизация",
        isLogin: true,
        loginError: req.flash("loginError"),
        registerError: req.flash("registerError"),
    })
});


router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;

        // проверка на существование пользователя
        const candidate = await User.findOne({email});
        
        if (candidate) {
            // проверяем пароль
            const areSame = await bcrypt.compare(password, candidate.password);

            if (areSame) {
                req.session.user = candidate;
                req.session.isAuthenticated = true;
                req.session.save(err => {
                    if (err)
                        throw err;
                    
                        res.redirect("/");
                });

            } else {
                req.flash("loginError", "Неверный пароль")
                res.redirect("/auth/login#login");
            }

        } else {
            req.flash("loginError", "Такого пользователя не существует")
            res.redirect("/auth/login#login");
        }
    } catch (e) {
        console.log(e);
    }
});

router.get("/logout", async (req, res) => {
    req.session.destroy(()=>{

        res.redirect("/auth/login#login");
    });
});


router.post("/register", async (req, res) => {
    try {
        // регистрируем нового пользователя
        const {email, password, confirm, name} = req.body;

        // сещствует ли такой пользователь?
        const candidate = await User.findOne({email});
        if (candidate) {
            req.flash("registerError", "Пользователь с таким email существует");
            
            res.redirect("/auth/login#register");
        } else {
            // создаём пользователя

            // шифрованный пароль
            const hashPassword = await bcrypt.hash(password, 10);

            const user = new User({
                email, name, password: hashPassword, cart: {items: []}
            })
            await user.save();
            res.redirect("/auth/login#login");
        }

    } catch (e) {
        console.log(e);
    }
})


module.exports = router;