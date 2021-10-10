const {Router} = require("express");
const Course = require("../models/course");

const router = Router();

function mapCartItems(cart) {
    return cart.items.map(c => ({
        title: c.courseId.title,
        count: c.count,
        price: c.courseId.price
    }))
}

function computePrice(courses) {
    return courses.reduce((total, course) => {
        return total += course.count * course.price;
    }, 0);
}

// теперь корзина привязана к пользователю

router.post("/add", async (req, res) => {
    const course = await Course.findById(req.body.id);

    await req.user.addToCart(course);

    res.redirect("/cart");
});


router.get("/", async (req, res) => {
    const user = await req.user
    .populate("cart.items.courseId");

    const courses = mapCartItems(user.cart);

    res.render("cart", {
        title: "Корзина",
        isCart: true,
        courses: courses,
        price: computePrice(courses)
    })
});

router.delete("/remove/:id", async (req, res) => {
    const cart = await Cart.remove(req.params.id);
    res.status(200).json(cart);
});


module.exports = router;