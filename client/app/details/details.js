angular.module('bookstore.details', [])
.controller('DetailsController', function($scope, $route, Details) {
  $scope.book = {};
  $scope.id = $route.current.params.id;
  Details.bookInfo($scope.id)
    .then(function(book) {
      $scope.book = book;
    })

});