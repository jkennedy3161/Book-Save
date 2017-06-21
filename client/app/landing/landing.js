angular.module('bookstore.landing', [])
.controller('LandingController', ['$scope', '$http', 'Landing', function($scope, $http, Landing) {
  $scope.books = [];
  $scope.search = '';
  $scope.fetchBooks = function(search) {
    Landing.getBooks(search)
      .then(function(book) {
        $scope.books = book;
        // clear search field
        $scope.search = '';
      });
  };
}]);