var database = require('../controllers/databaseController');

exports.getItems = async (req, res, next) => {
    await database.getItems()
        .then(data => {
            res.locals = data;
        })
    if (!res.locals) {
        // wsm nie wiem
        res.redirect('/');
    } else {
        next();
    }
}