const database = require('./databaseController');

exports.getOrders = async (req, res, next) => {
    await database.getOrders()
        .then(data => {
            res.locals.orders = data;
        })
    if (!res.locals) {
        res.redirect('/');
    } else {
        next();
    }
}

exports.addOrder = (req, res, next) => {
    const item = req.body.item;
    const amount = req.body.amount;

    if (item === '' || amount === '') {
        req.flash('emptyFields', 'Wypełnij wszystkie pola!')
        res.render('addOrder', {
            alert: req.flash('emptyFields'),
        });
    } else {
        database.addOrder({
            itemName: item,
            amount: amount,
        });
        req.flash('addedOrder', 'Pomyślnie dodano nowe zamówienie!');
        next();
    }
}