const {Router} = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const keys = require("../keys/index");
const regEmail = require("../emails/registration");
const resetEmail = require("../emails/reset");
const {registerValidators} = require("../utils/validators");
const {validationResult} = require("express-validator");

// const sendgrid = require("nodemailer-sendgrid-transport");
// const sgMail = require('@sendgrid/mail');

const router = Router();


//создаём транспортёр для отправки соообщений
const transporter = nodemailer.createTransport(keys.MAIL_HOST);

// sgMail.setApiKey(keys.SENDGRID_API_KEY);

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


router.post("/register", registerValidators, async (req, res) => {
    try {
        // регистрируем нового пользователя
        const {email, password, confirm, name} = req.body;

        // валидация
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash("registerError", errors.array()[0].msg);
            return res.status(422).redirect("/auth/login#register"); // ошибки валидации
        }

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
                        
            await transporter.sendMail(regEmail(email));
            
            // try {
            //     await sgMail.send({
            //         to: email,
            //         from: 'evgeniy.pgm@inbox.ru', // Use the email address or domain you verified above
            //         subject: 'Sending with Twilio SendGrid is Fun',
            //         text: 'and easy to do anywhere, even with Node.js',
            //         html: '<strong>and easy to do anywhere, even with Node.js</strong>',
            //     });

            // } catch (error) {
            //     console.error(error);
            
            //     if (error.response) {
            //         console.error(error.response.body)
            //     }
            // }
        }

    } catch (e) {
        console.log(e);
    }
});


router.get("/reset", (req,res) =>{
    res.render("auth/reset", {
        title: "Сброс пароля",
        error: req.flash("error")
    })
});

router.post("/reset", (req, res) =>{
    try {
        // генерируем рандомный ключ
        crypto.randomBytes(32, async (error, buffer) => {
            if (error) {
                req.flash("error", "Что-то пошло не так, повторите попытку позже");
                return res.redirect("/auth/reset")
            }

            // получаем токен
            const token = buffer.toString('hex');
            // проверка что email, сбрасывающий пароль вообще существует как пользователь
            const candidate = await User.findOne({email: req.body.email});

            if (candidate) {
                // отправляем письмо
                candidate.resetToken = token;
                candidate.resetTokenExp = Date.now() + 60*60*1000;  // жизнь токена 1 час
                await candidate.save();

                await transporter.sendMail(resetEmail(candidate.email, token));

                res.redirect("/auth/login");

            } else {
                req.flash("error", "Пользователя с таким email нет");
                res.redirect("/auth/reset");
            }

        })

    } catch (e) {
        console.log(e);
    }
});

router.get("/password/:token",  async (req, res) =>{
    if (!req.params.token) {
        return res.redirect("/auth/login");
    }

    try {
        const user = await User.findOne({
            resetToken: req.params.token,
            resetTokenExp: {
                $gt: Date.now()
            }
        });

        if (!user) {
            return res.redirect("/auth/login");
        } else {
            res.render("auth/password", {
                title: "Восстановление доступа",
                error: req.flash("error"),
                userId: user._id.toString(),
                token: req.params.token
            });
        }

    } catch(e) {
        console.log(e);
    }

});


router.post("/password", async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.body.userId,
            resetToken: req.body.token,
            resetTokenExp: {$gt: Date.now()}
        })

        if (user) {
            user.password = await bcrypt.hash(req.body.password, 10);
            user.resetToken = undefined;
            user.resetTokenExp = undefined;
            await user.save();

            res.redirect("/auth/login");

        } else {
            req.flash("loginError", "Время жизни токена истекло...");
            res.redirect("/auth/login");
        }


    } catch (e) {
        console.log(e);
    }
})

module.exports = router;