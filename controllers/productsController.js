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

exports.addToCart = async (req, res, next) => {
    const id = req.body.itemId;

    if (!req.session.basket) // xd
        req.session.basket = [];
    const basket = req.session.basket;

    if ((index = basket.findIndex(o => o.id == id)) >= 0) {
        basket[index].count++;
    } else {
        await database.getItem(id)
            .then(data => {
                data.count = 1;
                req.session.basket.push(data);
            })
    }
    req.flash('basket', 'Pomyślnie dodano do koszyka!');
    next();
}