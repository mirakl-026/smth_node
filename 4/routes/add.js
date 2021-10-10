const {Router} = require("express");
const Course = require("../models/course");

const router = Router();

router.get("/", (req, res) =>{
    res.render("add", {
        title: "Добавить курс",
        isAdd: true
    });
});

// свзяываем пользователя и курс
router.post("/", async (req, res) => {

    const course = new Course({
        title: req.body.title,
        price: req.body.price,
        img: req.body.img,
        userId: req.user._id
    });

    try {
        await course.save();    // уже в монгу сохраняет
       // редирект
        res.redirect("/courses");

    } catch (error) {
        console.log(error);
    }

});


module.exports = router;
