const keys = require("../keys/index")

module.exports = function (email) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: "Регистрация завершена",   // тема
        html: `
            <h1>Привет</h1>
            <p>Вы успешно создали аккаунт ${email}</p>
            <hr />
            <a href="${keys.BASE_URL}">Магазин курсов</a>
        `
    }
}