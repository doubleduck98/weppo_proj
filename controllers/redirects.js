exports.ifNotAdmin = (req, res, next) => {
    if (req.session.userId === -1) {
        next();
    } else {
        res.redirect('/');
    }
}

exports.ifLogged = (req, res, next) => {
    if (req.session.userId) {
        res.redirect('/')
    } else {
        next();
    }
}

exports.ifNotLogged = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/');
    }
}