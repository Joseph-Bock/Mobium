module.exports = (req, res, next) => {
    if (user = req.session.user) {
        let id = user.id;

        if (user.admin == 1 || id == req.params.id) {
            next();
        } else {
            return res.redirect('/');
        }
    } else {
        return res.redirect('/');
    }
}