var mongoose = require('mongoose');
var URLSlugs = require('mongoose-url-slugs');

var User = new mongoose.Schema({
  library:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

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


mongoose.connect('mongodb://localhost/final-project');
