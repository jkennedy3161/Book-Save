angular.module('bookstore.account', [])
.controller('AccountController', function($scope, $location, Auth, $window) {
  $scope.token = $window.localStorage.getItem('access_token') || '';
  // automatically redirect to landing page if token is stored in localStorage
  if($scope.token) {
    $location.path('/landing');
  }
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
        }
      })
      .catch(function(err) {
        //console.log(err);
      });
  };
});