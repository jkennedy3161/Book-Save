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
    var filterArr = book.volumeInfo.imageLinks.thumbnail.split('&');
    var thumbnail = filterArr[0] + '&' + filterArr[1] + '&' + filterArr[2] + '&' + 'zoom=0' + '&' +filterArr[5];
    var smallThumbnail = filterArr[0] + '&' + filterArr[1] + '&' + filterArr[2] + '&' + 'zoom=1' + '&' +filterArr[5];
    var bookObj = {
      title: book.volumeInfo.title,
      authors: (book.volumeInfo.authors === undefined) ? 'No Authors' : book.volumeInfo.authors,
      thumbnail: thumbnail,
      smallThumbnail: smallThumbnail,
      description: book.volumeInfo.description
    };
    Landing.saveBook(bookObj)
      .then(function(book) {
        alert(bookObj.title + ' saved to your shelf!');
      })
  };
}]);