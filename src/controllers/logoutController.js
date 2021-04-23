module.exports = (req, res) => {
    delete req.session.user;
    delete res.locals.user;

    res.redirect('back');
}