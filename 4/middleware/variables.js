// параметры ко всем ответам сервера

module.exports = function (req, res, next) {
    res.locals.isAuth = req.session.isAthenticated;

    next();
}