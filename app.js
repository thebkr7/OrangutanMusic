var orangutan = angular.module('orangutan', []); //not sure why [] is needed

//Todo: modularize into seperate folders
  //use components/bindings for data transfer

orangutan.controller('bigController', ['$scope', '$http', '$window', function($scope, $http, $window) {
  var input = {};
  var videos = [];

  // var emailClickHandler = function() {
  //   $scope.hiddenEmail = !$scope.hiddenEmail;
  //   console.log('EMAIL', $scope.hiddenEmail)
  // }

//GET monkeys
  $http({
    method: 'GET',
    url: '/videos'
  }).then(function(res) {
    $scope.videos = res.data;
    console.log('orangutan videos array app.js', $scope.videos);
  }, function(error) {
    console.log('app.js Get error =', error);
  });

  $scope.playMusic = function(url) {
    url += "&autoplay=1";
    console.log('url = ', url)
    return url
  }

//POST Fake Data
  $scope.save = function(songs) {
    $http({
      method: 'POST',
      data: songs,
      url: '/save'
    }).then(function(res) {
      console.log('posted app.js');
    }, function(error) {
      console.log('app.js Get error =', error);
    });
  }


  $scope.search = function(query, callback) {
      $http.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          q: query,
          type: 'video',
          maxResults: 5,
          key: '', //TODO $window.key get working
          videoEmbeddable: 'true'
        }
      })
      .then(function({data}) {
        if (callback) {
          callback(data.items);
        }
      })
      .catch(function({data}) {
        data.error.errors.forEach(function(err) {
          console.error(err);
        });
      });
    };

//WORKS TO GENERATE pre populated playlists
  // console.log($scope.search('1 hour Kygo', function(data) {
  //   data = {data};
  //   $scope.save(data);
  // }))





//PLAY ON CLICK
  $scope.onYouTubeIframeAPIReady = function(video) {
    // video = video.slice(32);
    console.log('VIDEO app.js', video)
    var e = document.getElementById("youtube-audio"),
        t = document.createElement("img");
    t.setAttribute("id", "youtube-icon"), t.style.cssText = "cursor:pointer;cursor:hand", e.appendChild(t);
    var a = document.createElement("div");
    a.setAttribute("id", "youtube-player"), e.appendChild(a);
    var o = function(e) {
        var a = e ? "IDzX9gL.png" : "quyUPXN.png";
        t.setAttribute("src", "https://i.imgur.com/" + a)
    };
    e.onclick = function() {
        r.getPlayerState() === YT.PlayerState.PLAYING || r.getPlayerState() === YT.PlayerState.BUFFERING ? (r.pauseVideo(), o(!1)) : (r.playVideo(), o(!0))
    };
    var r = new YT.Player("youtube-player", {
        height: "0",
        width: "0",
        videoId: video,
        playerVars: {
            autoplay: 1,
            loop: 1
        },
        events: {
            onReady: function(e) {
                r.setPlaybackQuality("small"), o(r.getPlayerState() !== YT.PlayerState.CUED)
            },
            onStateChange: function(e) {
                e.data === YT.PlayerState.ENDED && o(!1)
            }
        }
    })
  }

}]);



// orangutan.service('youTube', function($http, $window) {
//   this.search = function(query, callback) {
//     $http.get('https://www.googleapis.com/youtube/v3/search', {
//       params: {
//         part: 'snippet',
//         q: query,
//         type: 'video',
//         maxResults: 5,
//         key: $window.YOUTUBE_API_KEY,
//         videoEmbeddable: 'true'
//       }
//     })
//     .then(function({data}) {
//       if (callback) {
//         callback(data.items);
//       }
//     })
//     .catch(function({data}) {
//       data.error.errors.forEach(function(err) {
//         console.error(err.message);
//       });
//     });
//   };
// });

// orangutan.service.s

