const database = require('./databaseController');

exports.getUsers = async (req, res, next) => {
    await database.getUsers()
        .then(data => {
            res.locals.users = data;
        });
    next();
}