var express = require('express');
var router = express.Router();

var register = require('../controllers/registerController');
var login = require('../controllers/loginController');
var products = require('../controllers/productsController');

router.get('/', products.getItems, (req, res, next) => {
	console.log(req.session.userId)
	res.render('index', {
		username: req.session.username,
		id: req.session.id,
		products: res.locals,
	});
});

router.get('/login', (req, res, next) => {
		console.log(req.session.userId)
		res.render('login');
	})
	.post('/login', login.authenticateUser, login.loginUser, (req, res, next) => {
		console.log(req.session.userId)
		res.redirect('/');
	});

router.get('/register', (req, res, next) => {
		console.log(req.session.userId)
		res.render('register');
	})
	.post('/register', register.validateUser, register.registerUser, (req, res, next) => {
		console.log(req.session.userId)
		res.redirect('/');
	});

router.get('/logout', (req, res, next) => {
	req.session.destroy();
	res.redirect('/');
})

router.get('/basket', (req, res, next) => {
		if (!req.session.basket) // xd
			req.session.basket = [];
		res.render('basket', {
			username: req.session.username,
			id: req.session.id,
			basket: req.session.basket,
		});
	})
	.post('/basket', products.addToCart, (req, res, next) => {
		res.redirect('/');
	})

module.exports = router;