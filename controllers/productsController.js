var database = require('../controllers/databaseController');

exports.getItems = async (req, res, next) => {
    await database.getItems()
        .then(data => {
            res.locals.items = data;
        });
    next();
}

exports.getSearchedItems = async (req, res, next) => {
    await database.getItemsFiltered(req.body.searchQuery)
        .then(data => {
            res.locals.items = data;
        });
    next();
}

exports.addProduct = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const img = req.body.img;

    if (name === '' || price === '' || description === '' || img === '') {
        req.flash('emptyFields', 'Wypełnij wszystkie pola!')
        res.render('addProduct', {
            alert: req.flash('emptyFields'),
        });
    } else {
        database.addItem({
            name: name,
            price: price,
            description: description,
            img: img,
        });
        req.flash('addedProduct', 'Pomyślnie dodano nowy przedmiot na półkę!');
        next();
    }
}

exports.addToCart = async (req, res, next) => {
    const id = req.body.itemId;

    if (!req.session.cart)
        req.session.cart = [];
    const cart = req.session.cart;

    if ((index = cart.findIndex(o => o.id == id)) >= 0) {
        cart[index].count++;
    } else {
        await database.getItem(id)
            .then(data => {
                data.count = 1;
                req.session.cart.push(data);
            });
    }
    req.flash('cart', 'Pomyślnie dodano do koszyka!');
    next();
}