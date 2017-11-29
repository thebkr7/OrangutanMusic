// var session = require('express-session');
var bodyParser = require('body-parser');
var db = require('./db.js');
// var bcrypt = require('bcrypt');
// var path = require('path');
var express = require('express');
var app = express();
var request = require('request');
var $ = require('jquery');

var port = process.env.PORT || 8080;
app.use(express.static(__dirname + '/'));
app.use(bodyParser());

// app.use(session({secret:"music go boom boom boom", resave:false, saveUninitialized:true}))


//INITIAL GET
app.get('/videos', function(req, res) {
  db.Song.find({}, function(error, data) {
    if (error) {
      console.log('error line 22 server.js FAILLLLLL', error);
    } else {
      console.log('success 24 get request SUCCESSSSSS');
      data.reverse();
      res.send(data);
      res.end();
    }
  });
});


//HANDLE DIARY POSTS
app.post('/entries', function(req, res) {
  // console.log('POST REQ SESSION USER', req.session.user);
  addSong(res, req, req.body.title, req.body.text);
});

var addSong = function(res, req, title, text) {
  if (error === null) {
    console.log(response);
  }
  var newSong = new db.Song({
    title: title,
    text: text,
    // username: req.session.user
  });
  newSong.save(function(error) {
    if (error) throw error;
    res.status(200).end();
  });
}

//MAKE FAKE DATA
// var addSong = function(res, req, title, text) {
//   // if (error === null) {
//   //   console.log(response);
//   // }
//   var newSong = new db.Song({
//     title: 'The Best Of YIRUMA ',
//     url: 'https://www.youtube.com/watch?v=8Z5EjAmZS1o',
//     // username: 'unkown'
//   });
//   newSong.save(function(error) {
//     if (error) throw error;
//     // res.status(200).end();
//   });
// }
// addSong();


/*
window.exampleVideoData = [{
  kind: 'youtube#searchResult',
  etag: 'abQHWywil_AkNqdqji7_FqiK-u4/Ykxo_CqKu8F8kcm-iNgL332gQTY',
  id: {
    kind: 'youtube#video',
    videoId: '4ZAEBxGipoA'
  },
  snippet: {
    publishedAt: '2015-08-02T20:52:58.000Z',
    channelId: 'UCJbPGzawDH1njbqV-D5HqKw',
    title: 'React JS Tutorial for Beginners - 1 - Introduction',
    description: 'My website - https://www.thenewboston.com/videos.php Have questions about the tutorial or React? Ask them here ...',
    thumbnails: {
      default: {
        url: 'https://i.ytimg.com/vi/4ZAEBxGipoA/default.jpg',
        width: 120,
        height: 90
      },
      medium: {
        url: 'https://i.ytimg.com/vi/4ZAEBxGipoA/mqdefault.jpg',
        width: 320,
        height: 180
      },
      high: {
        url: 'https://i.ytimg.com/vi/4ZAEBxGipoA/hqdefault.jpg',
        width: 480,
        height: 360
      }
    },
    channelTitle: 'thenewboston',
    liveBroadcastContent: 'none'
  }
}, ....]
*/










//****LOGINS AND CREAT ACCOUNT BELOW*****


// app.post('/logout', function(req, res) {
  //   // console.log(currentUsername)
  //   req.session.destroy(function(err) {
  //     if (err) throw err;
  //   })
  //   res.send();
  //   res.end();
  // })

//NEW ACOUNT:
// app.post('/newAccount', function(req, res) {
//   addAccount(req.body.username, req.body.password);
//   res.status(200).end();
// });

// var addAccount = function(user, password) {
//   var hash = bcrypt.hashSync(password, 10);
//   var newAccount = new db.User({
//     username: user,
//     password: hash
//   });
//   newAccount.save(function(error) {
//     if (error) throw error;
//   });
// }

// var createSession = function(req, res, newUser) {
//   return req.session.regenerate(function() {
//     req.session.user = newUser;
//     res.send('true');
//     res.end()
//   })
// }


//HANDLE LOGIN
// app.post('/login', function(req, res) {
//   db.User.findOne({
//     username: req.body.username
//   }, function(error, user) {
//     if (error) {
//     }
//     if (user) {
//       if (bcrypt.compareSync(req.body.password, user.password)) {
//         createSession(req, res, user.username);
//       } else {
//         console.log('Wrong password');
//         res.send();
//         res.end();
//       }
//     }
//   });
// });


app.listen(port, function() {
  console.log('Yayy Server is listening on ' + port);
});
