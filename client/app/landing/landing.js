angular.module('bookstore.landing', [])
.controller('LandingController', ['$scope', '$http', 'Landing', function($scope, $http, Landing) {
  $scope.books = [];
  $scope.search = '';
  $scope.savedSearch = '';
  $scope.page = 1;
  $scope.pages = [];
  $scope.index = 0;
  $scope.fetchBooks = function(search, index) {
    $scope.savedSearch = search;
    $scope.page = ++index;
    $scope.pages = [];
    Landing.getBooks(search, index)
      .then(function(book) {
        $scope.books = book;
        // clear search field
        $scope.search = '';
        $scope.pages.push($scope.page);
      });
  };
  $scope.nextPage = function(startIndex) {
    $scope.page++;
    $scope.pages.push($scope.page);
    $scope.books = [];
    $scope.index += 41;
    Landing.getBooks($scope.savedSearch, $scope.index)
      .then(function(book) {
        $scope.books = book;
      })
  };
  $scope.saveBook = function(book) {
    var bookObj = {
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors[0],
      imageLinks: [book.volumeInfo.imageLinks.smallThumbnail, book.volumeInfo.thumbnail]
    };
    Landing.saveBook(bookObj)
      .then(function(book) {
        alert(bookObj.title + ' saved to your shelf!');
      })
  };
}]);