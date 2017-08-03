angular.module('bookstore.signup', [])
.controller('SignUpController', function($scope, Auth, $window, $location) {
  $scope.signup = function(username, password) {
    var data = {username: username, password: password};
    Auth.signup(data)
      .then(function(token) {
        if (token !== undefined) $window.localStorage.setItem('access_token', token);
        console.log($window.localStorage.access_token);
        if($window.localStorage.access_token) {
          $location.path('/landing');
        } else {
          document.querySelector('#error').innerHTML = 'username ' + username + ' already created, use different username';
        }
      });
  };
});