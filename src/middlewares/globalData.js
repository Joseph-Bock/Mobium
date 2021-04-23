module.exports = (req, res, next) => {
    res.locals.loginError = req.session.loginError;
    res.locals.user = req.session.user;
    next();
}