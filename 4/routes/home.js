// expres.Router
const {Router} = require("express");

const router = Router();

router.get("/", (req, res) => {
    res.render("index", {
        title: "Главная страница",  // заголовок
        isHome: true    // активная страница
    });
});


module.exports = router;
