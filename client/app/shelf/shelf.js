angular.module('bookstore.shelf', [])
.controller('ShelfController', function($scope, $routeParams, Shelf, Details, $window) {
  $scope.collections = [];
  $scope.id = $routeParams.id;
  $scope.userId = $window.localStorage.getItem('userId');
  $scope.getShelf = function() {
    Shelf.getShelf($scope.userId)
      .then(function(collections) {
        $scope.collections = collections;
      });
  };
})