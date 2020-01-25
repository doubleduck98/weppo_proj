var express = require('express');
var router = express.Router();

var register = require('../controllers/registerController');
var login = require('../controllers/loginController');

router.get('/', function (req, res, next) {
	res.render('index');
});

router.get('/login', (req, res, next) => {
	res.render('login');
})

router.post('/login', login.loginUser, (req, res, next) => {
	res.send('zalogowano');
});

router.get('/register', (req, res, next) => {
	res.render('register');
});

router.post('/register', register.validateUser, register.registerUser, (req, res, next) => {
	res.redirect('/');
});

module.exports = router;