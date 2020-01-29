var express = require('express');
var router = express.Router();

var register = require('../controllers/registerController');
var login = require('../controllers/loginController');

router.get('/', (req, res, next) => {
	console.log(req.session.userId)
	res.render('index', {
		username: req.session.username,
		id: req.session.id,
	});
});

router.get('/login', (req, res, next) => {
	console.log(req.session.userId)
	res.render('login');
})

router.post('/login', login.loginUser, (req, res, next) => {
	console.log(req.session.userId)
	res.redirect('/');
});

router.get('/register', (req, res, next) => {
	console.log(req.session.userId)
	res.render('register');
});

router.post('/register', register.validateUser, register.registerUser, (req, res, next) => {
	console.log(req.session.userId)
	res.redirect('/');
});

router.get('/logout', (req, res, next) => {
	req.session.destroy();
	res.redirect('/');
})

module.exports = router;