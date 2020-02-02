var express = require('express');
var router = express.Router();

var register = require('../controllers/registerController');
var login = require('../controllers/loginController');
var products = require('../controllers/productsController');
var orders = require('../controllers/ordersController');
var users = require('../controllers/usersController');
var redirect = require('../controllers/redirects');

router.get('/', products.getItems, (req, res, next) => {
	res.render('index', {
		username: req.session.username,
		id: req.session.userId,
		products: res.locals.items,
		cartFlash: req.flash('cart'),
	});
});

router.post('/search', products.getSearchedItems, (req, res, next) => {
	res.render('index', {
		username: req.session.username,
		id: req.session.userId,
		products: res.locals.items,
		cartFlash: req.flash('cart'),
	});
});


router.get('/login', redirect.ifLogged, (req, res, next) => {
		res.render('login');
	})
	.post('/login', redirect.ifLogged, login.authenticateUser, login.loginUser, (req, res, next) => {
		res.redirect('/');
	});


router.get('/register', redirect.ifLogged, (req, res, next) => {
		res.render('register');
	})
	.post('/register', redirect.ifLogged, register.validateUser, register.registerUser, (req, res, next) => {
		res.redirect('/');
	});


router.get('/logout', redirect.ifNotLogged, (req, res, next) => {
	req.session.destroy();
	res.redirect('/');
});


router.get('/cart', (req, res, next) => {
		if (!req.session.cart) // xd
			req.session.cart = [];
		res.render('cart', {
			username: req.session.username,
			id: req.session.userId,
			cart: req.session.cart,
		});
	})
	.post('/cart', products.addToCart, (req, res, next) => {
		res.redirect('/');
	})
	.post('/cart/buy', (req, res, next) => {
		req.flash('cart', 'Zakupiono przedmioty!');
		req.session.cart = [];
		res.redirect('/');
	})


router.get('/admin', redirect.ifLogged, (req, res, next) => {
		res.render('loginAdmin');
	})
	.post('/admin', redirect.ifLogged, login.authenticateAdmin, (req, res, next) => {
		res.redirect('/');
	});


router.get('/addProduct', redirect.ifNotAdmin, (req, res, next) => {
		res.render('addProduct', {
			addFlash: req.flash('addedProduct'),
		});
	})
	.post('/addProduct', redirect.ifNotAdmin, products.addProduct, (req, res, next) => {
		res.redirect('/addProduct');
	});


router.get('/orders', redirect.ifNotAdmin, orders.getOrders, (req, res, next) => {
	res.render('orders', {
		username: req.session.username,
		id: req.session.userId,
		orders: res.locals.orders,
	});
});


router.get('/orders/addOrder', redirect.ifNotAdmin, (req, res, next) => {
		res.render('addOrder', {
			addFlash: req.flash('addedOrder'),
		});
	})
	.post('/orders/addOrder', redirect.ifNotAdmin, orders.addOrder, (req, res, next) => {
		res.redirect('/orders/addOrder');
	});


router.get('/users', redirect.ifNotAdmin, users.getUsers, (req, res, next) => {
	res.render('users', {
		username: req.session.username,
		id: req.session.userId,
		users: res.locals.users,
	});
})

module.exports = router;