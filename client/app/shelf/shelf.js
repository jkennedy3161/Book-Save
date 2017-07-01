angular.module('bookstore.shelf', [])
.controller('ShelfController', function($scope, $routeParams, Shelf, Details, $window) {
  $scope.collections = [];
  $scope.id = $routeParams.id;
  $scope.getShelf = function() {
    Shelf.getShelf($window.localStorage.getItem('userId'))
      .then(function(collections) {
        console.log(collections);
        $scope.collections = collections;
      });
  };
})