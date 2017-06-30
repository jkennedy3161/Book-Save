angular.module('bookstore.account', [])
.controller('AccountController', function($scope, $location, Auth, $window) {
  $scope.token = $window.localStorage.access_token || '';
  $scope.signin = function(username, password) {
    var data = {
      username: username,
      password: password
    };
    Auth.signin(data)
      .then(function(user) {
        if(user === undefined) {
          alert('no username found!');
        } else {
          $window.localStorage.setItem('access_token', user.token);
          $location.path('/landing');
        }
      })
      .catch(function(err) {
        //console.log(err);
      });
  };
});