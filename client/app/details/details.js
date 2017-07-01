angular.module('bookstore.details', [])
.controller('DetailsController', function($scope, $route, Details, Auth, $location) {
  $scope.book = {};
  $scope.alert = '';
  $scope.id = $route.current.params.id;
  Details.bookInfo($scope.id)
    .then(function(book) {
      $scope.book = book;
    })
  $scope.remove = function(bookId) {
    Auth.removeBook(bookId)
      .then(function(book) {
        $scope.alert = book.title + ' removed from your shelf!';
      })
  };

});