angular.module('bookstore.landing', [])
.controller('LandingController', ['$scope', '$http', 'Landing', function($scope, $routeParams, Landing) {
  $scope.books = [];
  $scope.savedSearch = '';
  $scope.page = 1;
  $scope.index = 0;
  $scope.fetchBooks = function(search, index) {
    Landing.getBooks(search, index)
      .then(function(book) {
        $scope.books = $scope.books.concat(book.items);
        // clear search field
        $scope.search = '';
        $scope.index += 41;
        console.log('startIndex now ' + $scope.index);
        $scope.savedSearch = search;
        $scope.loadMore = false;
      });
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