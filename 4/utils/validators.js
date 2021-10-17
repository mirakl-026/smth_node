const {body} = require("express-validator");
const User = require("../models/user");

exports.registerValidators = [
    body("email")
        .isEmail()
        .withMessage("Введите корректный email")
        .custom( async (value, {req}) => {
            try {
                const user = await User.findOne({ email: value });
                if (user) {
                    return Promise.reject("Пользователь уже существует");
                }
            } catch(e) {
                console.log(e);
            }
        })
        .normalizeEmail(),  // санитайзер - приводит к разным регистрам в соответсвии с держателями почты
    body("password", "Пароль: лат.буквы и цифры")
        .isLength({min:2, max:56})
        .isAlphanumeric()
        .trim(),    // санитайзер - удаляет пробелы по краям
    body("confirm")
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error( "Пароли должны совпадать");
            }
            return true;
        })
        .trim(),
    body("name")
        .isLength({min: 3})
        .withMessage("Имя минимум 3 символа")
        .trim()
]

exports.loginValidators = [
    body("email")
        .isEmail()
        .withMessage("Введите корректный email")
        .normalizeEmail(),  // санитайзер - приводит к разным регистрам в соответсвии с держателями почты
    body("password", "Пароль: лат.буквы и цифры")
        .isLength({min:2, max:56})
        .isAlphanumeric()
        .trim(),    // санитайзер - удаляет пробелы по краям
]