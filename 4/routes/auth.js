const {Router} = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
// const sendgrid = require("nodemailer-sendgrid-transport");
const keys = require("../keys/index");
const regEmail = require("../emails/registration");

// const sgMail = require('@sendgrid/mail');

const router = Router();


// создаём транспортёр для отправки соообщений
const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465 ,
    secure: true,
    auth: {
      user: "mirakl026@yandex.ru",
      pass: "wJNCNJTz!Up5-iA",
    },
})

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

            // отправка письма
            res.redirect("/auth/login#login");
            
            await transporter.sendMail({
                from: "mirakl026@yandex.ru",
                to: email,
                subject: 'Message from Node js',
                text: 'This message was sent from Node js server.',
                html:
                  'This <i>message</i> was sent from <strong>Node js</strong> server.',
            });
        }

    } catch (e) {
        console.log(e);
    }
})


module.exports = router;