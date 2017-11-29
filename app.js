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

}]);