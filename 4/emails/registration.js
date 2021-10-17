const keys = require("../keys/index")

module.exports = function (email) {
    return {
        from: keys.EMAIL_FROM,
        to: email,
        subject: 'Регистрация пользователя',
        html: `
            <h1>Пользователь ${email} зарегестрирован!</h1>
            <p>Удачного обучения!</p>
            <hr />
            <a href="${keys.BASE_URL}">Магазин курсов</a>
        `,
    };
}