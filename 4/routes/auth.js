const {Router} = require("express");
const User = require("../models/user");
const router = Router();

router.get("/login", async (req, res) => {
    res.render("auth/login", {
        title: "Авторизация",
        isLogin: true
    })
});


router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;

        // проверка на существование пользователя
        const candidate = await User.findOne({email});
        
        if (candidate) {
            // проверяем пароль
            const areSame = password === candidate.password;
            if (areSame) {
                req.session.user = candidate;
                req.session.isAuthenticated = true;
                req.session.save(err => {
                    if (err)
                        throw err;
                    
                        res.redirect("/");
                });

            } else {
                res.redirect("/auth/login#login");
            }

        } else {
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
            res.redirect("/auth/login#register");
        } else {
            // создаём пользователя
            const user = new User({
                email, name, password, cart: {items: []}
            })
            await user.save();
            res.redirect("/auth/login#login");
        }

    } catch (e) {
        console.log(e);
    }
})


module.exports = router;