angular.module('bookstore.shelf', [])
.controller('ShelfController', function($scope, Shelf) {
  $scope.collections = [];
  $scope.getShelf = function() {
    Shelf.getShelf()
      .then(function(collections) {
        $scope.collections = collections;
      });
  };
})