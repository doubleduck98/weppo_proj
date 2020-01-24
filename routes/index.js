var express = require('express');
var router = express.Router();

var database = require('../controllers/databaseController');
var register = require('../controllers/registerController');

router.get('/', function (req, res, next) {
	res.render('index');
});

router.get('/login', (req, res, next) => {
	res.render('login');
})

router.post('/login', (req, res, next) => {
	res.send('zalogowano');
});

router.get('/register', (req, res, next) => {
	res.render('register');
});

router.post('/register', register.validateUser, register.registerUser, (req, res, next) => {
	res.redirect('/');
});

module.exports = router;