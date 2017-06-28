angular.module('bookstore.shelf', [])
.controller('ShelfController', function($scope, $routeParams, Shelf, Details) {
  $scope.collections = [];
  $scope.id = $routeParams.id;
  $scope.getShelf = function() {
    Shelf.getShelf()
      .then(function(collections) {
        $scope.collections = collections;
      });
  };
  $scope.bookInfo = function(book) {
    console.log(book._id);
    console.log($routeParams.id);

  };
})