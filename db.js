var mongoose = require('mongoose');
var mongoClient = require('mongodb').MongoClient;
mongoose.connect('mongodb://admin:admin@ds123556.mlab.com:23556/bluemusic');


var Users = mongoose.Schema({
  username: String,
  password: String,
});

var Songs = mongoose.Schema({
  username: String,
  title: String,
  url: String,
  music: Object,
  time: {
    type: Date,
    default: Date.now
  }
});

var User = mongoose.model('User', Users);
var Song = mongoose.model('Song', Songs)



module.exports.User = User;
module.exports.Song = Song;


