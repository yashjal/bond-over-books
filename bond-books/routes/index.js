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

router.post('/books-remove', function(req, res, next) {
	var x = req.body.book;
	if (Array.isArray(x)) {
		for (var i=0; i<x.length; i++) {
			if (i === x.length-1) {
				Book.findByIdAndRemove(x[i], function(err) {
					if (!err) {
						res.redirect('/books');
					}
				});
			} else {
				Book.findByIdAndRemove(x[i], function(err) {
					
				});
			}
		}

	} else {
		Book.findByIdAndRemove(x, function(err) {
			if (!err) {
				res.redirect('/books');
			}
		});
	}	
});

router.get('/login', function(req, res, next) {
	
	res.render('login.hbs',{ message: req.flash('loginMessage') });
});

router.post('/login', function(req,res,next) {

});

module.exports = router;
