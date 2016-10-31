# Bond over Books #

## Overview ##
My website stores information of each user's personal library of books.
In the home page, each user will be able to see and comment on all the books
that belong in someone's library. Essentially, it's a platform for book lovers.

## Data Model ##
We simply have to store a collection of books and each book will be reference
the owner/user.

First draft Schema:
```javascript
// users
// * our site requires authentication...
// * so users have a username and password
// * each user has 0 or more books; forming 
// one personal library
var User = new mongoose.Schema({
  // username, password provided by plugin
  library:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
});

// a book in a library
// * includes a title, author, publisher, edition,
// image, and a genre
// * each book has a discussion/comments section,
// where people can talk about the book
var Book = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  title: {type: String, required: true},
  author: {type: String, required: false},
  publisher: {type: String, required: false},
  edition: {type: String, required: false},
  discussion/comments: {type: [String], required: true},
  image_url: {type: String, required: false},
  createdAt: {type: Date, required: true},
  genre: {type: String, required: true}
});
```
## Wireframes ##



## Site map ##

## User Stories ##

## Research Topics ##


