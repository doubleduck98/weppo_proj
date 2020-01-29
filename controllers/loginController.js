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
                    req.session.name = data.id;
                }
            }
        });

    if (userExists && goodPassword) {
        await database.getUser(req.body.username)
            .then(data => {
                req.session.username = data.username;
                req.session.userId = data.id;
            });
        next();
    } else if (!userExists) {
        res.send('podany uzytkownik nie istnieje');
    } else {
        res.send('złe hasło');
    }
}