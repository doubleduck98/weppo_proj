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

    var usernameExists;

    await database.usernameExists(username)
        .then(data => {
            if (data) {
                usernameExists = true;
            }
        });

    if (usernameExists) {
        res.send('nazwa użytkownika już istnieje');
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