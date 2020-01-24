const database = require('./databaseController');

function validateUsername(username) {
    return !database.validateUsername(username);
}

function validateEmail(email) {
    var reg = /^[^@]+@[^@]+\.[^@]/;
    return !reg.test(email);
}

function validatePassword(pwd, pwd2) {
    return pwd != pwd2;
}

exports.validateUser = (req, res, next) => {
    var username = req.body.username;
    var pwd = req.body.password;
    var pwd2 = req.body.password2;
    var email = req.body.email;


    if (validateUsername(username)) {
        res.send('nazwa uzytkownika zajeta');
    } else if (validateEmail(email)) {
        res.send('podaj poprawny email')
    } else if (validatePassword(pwd, pwd2)) {
        res.send('hasła muszą sie zgadzać');
    } else if (pwd === '') {
        res.send('hasło nie może być puste');
    } else {
        next();
    }
};

exports.registerUser = (req, res, next) => {
    database.addUser(req.body);
    next();
};