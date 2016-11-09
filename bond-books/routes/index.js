var express = require('express');
var router = express.Router();
require(__dirname + '/../db.js');
var mongoose = require('mongoose');
var Book = mongoose.model('Book');

router.get('/books', function(req, res, next) {
	var books = Book.find({}, function(err,books,count) {
		if (!err) {
			res.render('index.hbs', {books: books});
		}
	});

});

router.post('/books-add', function(req, res, next) {
	new Book({
		title: req.body.title,
		author: req.body.author
	}).save(function(err,book,count) {
		if (!err) {
			res.redirect('/books');
		}
	});

});

module.exports = router;
