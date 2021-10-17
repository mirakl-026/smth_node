const {body} = require("express-validator");

exports.registerValidators = [
    body("email").isEmail().withMessage("Введите корректный email"),
    body("password", "Пароль: лат.буквы и цифры").isLength({min:2, max:56}).isAlphanumeric(),
    body("confirm").custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error( "Пароли должны совпадать");
        }
        return true;
    }),
    body("name").isLength({min: 3}).withMessage("Имя минимум 3 символа")
]