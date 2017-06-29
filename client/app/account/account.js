angular.module('bookstore.account', [])
.controller('AccountController', function($scope, $location, Auth) {
  $scope.login = function(username, password) {
    var data = {username: username, password: password};
    Auth.login(data)
      .then(function() {
        $location.path('/landing');
      });
  };
});