const database = require('./databaseController');

exports.authenticateUser = async (req, res, next) => {
    var userExists = false;
    var goodPassword = false;
    await database.authenticateLogin(req.body)
        .then(data => {
            if (data) {
                userExists = true;

                if (data.pwd_match) {
                    goodPassword = true;
                    req.session.name = data.id;
                }
            }
        });
    if (userExists && goodPassword) {
        next();
    } else if (!userExists) {
        req.flash('login', 'Podany uzytkownik nie istnieje!');
        res.render('login', {
            alert: req.flash('login'),
        });
    } else {
        req.flash('login', 'Złe hasło!');
        res.render('login', {
            alert: req.flash('login'),
        });
    }
}

exports.loginUser = async (req, res, next) => {
    await database.getUser(req.body.username)
        .then(data => {
            req.session.username = data.username;
            req.session.userId = data.id;
        });
    next();
}

exports.authenticateAdmin = (req, res, next) => {
    if(req.body.password === 'admin') {
        req.session.username = 'admin';
        req.session.userId = -1;
        next()
    } else {
        req.flash('login', 'Złe hasło!');
        res.render('loginAdmin', {
            alert: req.flash('login'),
        })
    }
}