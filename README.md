# Bond over Books #

## Overview ##
My website stores information of each user's personal library of books.
In the home page, each user will be able to see and comment on all the books
that belong in someone's library. Essentially, it's a platform for book lovers.

## Data Model ##
We simply have to store a collection of books and each book will be reference
the owner/user.

Schema:
```javascript
// users
// * our site requires authentication...
// * so users have a username and password
// * each user has 0 or more books; forming 
// one personal library
var User = new mongoose.Schema({
  // username, password provided by plugin
  books:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
});

// a book in a library
// * includes a title, author
// * each book has a discussion/comments section,
// where people can talk about the book
var Book = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  title: {type: String, required: true},
  author: {type: String, required: false},
});
```
## Wireframes ##

/home - page lists all the books ever posted by any user (arranged by date created)

![ScreenShot](https://github.com/nyu-csci-ua-0480-001-fall-2016/yj627-final-project/blob/master/documentation/home.jpg)

/user/:user - page for modifying user's personal library

![ScreenShot](https://github.com/nyu-csci-ua-0480-001-fall-2016/yj627-final-project/blob/master/documentation/personal-library.jpg)

/books/:slug - each book has its own page where users can have discussions about the book

![ScreenShot](https://github.com/nyu-csci-ua-0480-001-fall-2016/yj627-final-project/blob/master/documentation/book-slug.jpg)

## Site map ##

![ScreenShot](https://github.com/nyu-csci-ua-0480-001-fall-2016/yj627-final-project/blob/master/documentation/SiteMap.png)

## User Stories ##

1. as a user, I have a library of books with 0 or more books in it
2. as a user, I can add/delete books from my library
3. as a user, I can view books from others' libraries
4. as a user, I can open any book and have a discussion about the book with other users

## Research Topics ##

* (6 points) User Authentication: sign-up and registeration
* (2 points) Client side form validation: errors integrated into the DOM, displaying errors with alert
