# Bond over Books #

## Overview ##
My website will store information of each user's personal library of books.
In the home page, each user will be able to see and comment on all the books
that belong in someone's library. Essentially, it's a platform for book lovers.

## Sample Schemas ##

1. User Schema:
{ username: String,
  password: String,
  books: [Book]
}

2. Book schema:
{ title: String,
  author: String,
  edition: String,
  publisher: String,
  user: User
}
