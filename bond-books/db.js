var mongoose = require('mongoose');
var URLSlugs = require('mongoose-url-slugs');

var User = new mongoose.Schema({
	google: {
	  id: String,
	  token: String,
	  email: String,
	  name: String
	}
	//library:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

var Book = new mongoose.Schema({
  //user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  title: {type: String, required: true},
  author: {type: String, required: true},
  //publisher: {type: String, required: false},
  //edition: {type: String, required: false},
  //comments: {type: [String], required: false},
  //image_url: {type: String, required: false},
  //createdAt: {type: Date, required: false},
  //genre: {type: String, required: false}
});

mongoose.model('Book', Book);
mongoose.model('User', User);

// is the environment variable, NODE_ENV, set to PRODUCTION? 
if (process.env.NODE_ENV == 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configration from a file
 // use blocking file io to do this...
 var fs = require('fs');
 var path = require('path');
 var fn = path.join(__dirname, 'config.json');
 var data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 var conf = JSON.parse(data);
 var dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb://localhost/ait-final-project';
}

mongoose.connect(dbconf);
