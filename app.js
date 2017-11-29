var orangutan = angular.module('orangutan', []);

orangutan.controller('bioController', ['$scope', '$http', function($scope, $http) {
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
    $scope.videos = res.data.reverse();
    console.log('orangutan videos array app.js', $scope.videos);
  }, function(error) {
    console.log('app.js Get error =', error);
  });

  $scope.playMusic = function(url) {
    url += "&autoplay=1";
    console.log('url = ', url)
    return url
  }

  $scope.onYouTubeIframeAPIReady = function(video) {
    video = video.slice(32);
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