const database = require('./databaseController');

function validateEmail(email) {
    var reg = /^[^@]+@[^@]+\.[^@]/;
    return !reg.test(email);
}

function validatePassword(pwd, pwd2) {
    return pwd != pwd2;
}

exports.validateUser = async (req, res, next) => {
    var username = req.body.username;
    var pwd = req.body.password;
    var pwd2 = req.body.password2;
    var email = req.body.email;

    var usernameExists = false;

    await database.usernameExists(username)
        .then(data => {
            if (data) {
                usernameExists = true;
            }
        });

    if (usernameExists) {
        req.flash('register', 'Nazwa użytkownika już istnieje!')
        res.render('register', {
            alert: req.flash('register'),
        });
    } else if (validateEmail(email)) {
        req.flash('register', 'Podaj poprawny email!')
        res.render('register', {
            alert: req.flash('register'),
        });
    } else if (validatePassword(pwd, pwd2)) {
        req.flash('register', 'Hasła muszą sie zgadzać!')
        res.render('register', {
            alert: req.flash('register'),
        });
    } else if (pwd === '') {
        req.flash('register', 'Hasło nie może być puste!')
        res.render('register', {
            alert: req.flash('register'),
        });
    } else if (email === '') {
        req.flash('register', 'Adres email nie może być pusty!')
        res.render('register', {
            alert: req.flash('register'),
        });
    } else if (username === '') {
        req.flash('register', 'Nazwa użytkownika nie może być pusta!')
        res.render('register', {
            alert: req.flash('register'),
        });
    } else {
        next();
    }
};

exports.registerUser = (req, res, next) => {
    database.addUser(req.body);
    next();
};