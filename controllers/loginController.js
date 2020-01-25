const database = require('./databaseController');

exports.loginUser = async (req, res, next) => {
    var userExists = false;
    var goodPassword = false;
    await database.authenticateUser(req.body)
        .then(data => {
            if (data) {
                userExists = true;

                if (data.pwd_match) {
                    goodPassword = true;
                }
            }
        });

    if (userExists && goodPassword) {
        next();
    } else if (!userExists) {
        res.send('podany uzytkownik nie istnieje');
    } else {
        res.send('złe hasło');
    }
}