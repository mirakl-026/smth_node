const {Router} = require("express");

const router = Router();

router.get("/", (req, res) =>{
    res.render("cources", {
        title: "Курсы",
        isCources: true
    });
});

module.exports = router;