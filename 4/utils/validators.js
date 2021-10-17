const {body} = require("express-validator");
const User = require("../models/user");

exports.registerValidators = [
    body("email").isEmail().withMessage("Введите корректный email").custom( async (value, {req}) => {
        try {
            const user = await User.findOne({ email: value });
            if (user) {
                return Promise.reject("Пользователь уже существует");
            }
        } catch(e) {
            console.log(e);
        }
    }),
    body("password", "Пароль: лат.буквы и цифры").isLength({min:2, max:56}).isAlphanumeric(),
    body("confirm").custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error( "Пароли должны совпадать");
        }
        return true;
    }),
    body("name").isLength({min: 3}).withMessage("Имя минимум 3 символа")
]