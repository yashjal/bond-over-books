var express = require('express');
var router = express.Router();
var passport = require('passport');
require(__dirname + '/../db.js');
var mongoose = require('mongoose');
var Book = mongoose.model('Book');
var User = mongoose.model('User');

router.get('/', function(req,res,next) {
	Book.find({}, function(err,books,count) {
		if (!err) {
			if (Array.isArray(books)) {
				//sort alphabetically by title
				var mapped = books.map(function(el, i) {
  					return { index: i, value: el.title.toLowerCase() };
				});

				mapped.sort(function(a, b) {
  					return +(a.value > b.value) || +(a.value === b.value) - 1;
				});

				var result = mapped.map(function(el){
  					return books[el.index];
				});
				res.render('main.hbs',{books: result, user: req.user});
			} else {
				res.render('main.hbs', {books: books, user: req.user});
			}
		}
	});

});


router.get('/books/:slug', function(req,res,next) {
	Book.findOne({slug: req.params.slug}, function(err,book,count) {
		if (book === null) {
			var err1 = new Error('Not Found');
			err1.status = 404;
			res.status = 404;
			res.render('error.hbs', {message: err1.message,error:{}});
		} else {
			var showForm = !!req.user;
			User.findById(book.user,function(err,usr,count) {
				res.render('index2.hbs',{boo: book, showForm:showForm, user: req.user, usr:usr});
			});
		}
	});
});

router.post('/books/:slug', function(req,res,next) {
	var x = req.body.comm;
	if (x !== "") {	
		Book.findOneAndUpdate({slug: req.params.slug}, {$push: {comments: x}}, function(err,book,count){
			if (!err) {
				res.redirect('/books/'+req.params.slug);
			}
		});
	} else {
		res.redirect('/books/'+req.params.slug);
	}
	
});

router.get('/user/:username', function(req, res, next) {
	User.findOne({username: req.params.username})
	.populate('books').exec(function(err, user) {
		if (user === null) {
			var err1 = new Error('Not Found');
			err1.status = 404;
			res.status = 404;
			res.render('error.hbs', {message: err1.message,error:{}});
		} else {
			var showForm = !!req.user;
			if (showForm) {
				showForm = req.user.username == user.username;
			}
			res.render('index.hbs', {showForm: showForm, books: user.books, username: user.username, user: req.user});
		}
	});
});

router.post('/books-add', function(req, res, next) {

	new Book({
		title: req.body.title,
		author: req.body.author,
		user: req.user._id
	}).save(function(err,book,count) {
		if (!err) {
			req.user.books.push(book._id);
			req.user.save(function(err, savedUser, count) {
				res.redirect('/user/' + req.user.username);
			});
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
						var index = req.user.books.indexOf(x[i]);
						if (index > -1) {
							req.user.books.splice(index,1);
						}
						req.user.save(function(err, savedUser, count) {
							res.redirect('/user/' + req.user.username);
						});
					}
				});
			} else {
				Book.findByIdAndRemove(x[i], function(err) {
					var index = req.user.books.indexOf(x[i]);
					if (index > -1) {
						req.user.books.splice(index,1);
					}
				});
			}
		}

	} else {
		Book.findByIdAndRemove(x, function(err) {
			if (!err) {
				var index = req.user.books.indexOf(x);
				if (index > -1) {
					req.user.books.splice(index,1);
				}
				req.user.save(function(err, savedUser, count) {
					res.redirect('/user/' + req.user.username);
				});
			}
		});
	}	
});


router.get('/login', function(req, res, next) {
	res.render('login.hbs');
});

router.get('/register', function(req,res,next) {
	res.render('register.hbs');
});

router.post('/login', function(req,res,next) {
  passport.authenticate('local', function(err,user) {
    if(user) {
      req.logIn(user, function(err) {
        res.redirect('/user/' + user.username);
      });
    } else {
      res.render('login.hbs', {message:'Your login or password is incorrect.'});
    }
  })(req, res, next);
});

router.post('/register', function(req, res) {
  User.register(new User({username:req.body.username}), 
      req.body.password, function(err, user){
    if (err) {
      res.render('register.hbs',{message:'Your username or password is already taken'});
    } else {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/user/' + req.user.username);
      });
    }
  });   
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
