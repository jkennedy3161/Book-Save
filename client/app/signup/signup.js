angular.module('bookstore.signup', [])
.controller('SignUpController', function($scope, Auth, $window, $location) {
  $scope.signup = function(username, password) {
    var data = {username: username, password: password};
    if (username && password) {
      Auth.signup(data)
        .then(function(token) {
          $window.localStorage.setItem('access_token', token);
          if($window.localStorage.access_token) {
            $location.path('/landing');
          }
        });
    }
  };
});