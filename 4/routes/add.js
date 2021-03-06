const {Router} = require("express");
const Course = require("../models/course");
const auth = require("../middleware/auth");
const {courseValidators} = require("../utils/validators");
const {validationResult} = require("express-validator");

const router = Router();

router.get("/", auth, (req, res) =>{
    res.render("add", {
        title: "Добавить курс",
        isAdd: true
    });
});

// свзяываем пользователя и курс
router.post("/", auth, courseValidators, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render("add", {
            title: "Добавить курс",
            isAdd: true,
            error: errors.array()[0].msg,
            data: {
                title: req.body.title,
                price: req.body.price,
                img: req.body.img,
            }
        })
    }

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
