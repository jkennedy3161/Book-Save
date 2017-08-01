angular.module('bookstore.signup', [])
.controller('SignUpController', function($scope, Auth, $window, $location) {
  $scope.signup = function(username, password) {
    var data = {username: username, password: password};
    Auth.signup(data)
      .then(function(token) {
        $window.localStorage.setItem('access_token', token);
        $location.path('/landing');
      });
  };
});