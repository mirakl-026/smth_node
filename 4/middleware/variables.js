// параметры ко всем ответам сервера

module.exports = function (req, res, next) {
    res.locals.isAuth = req.session.isAuthenticated;

    // для CSRF защиты
    res.locals.csrf = req.csrfToken();

    next();
}