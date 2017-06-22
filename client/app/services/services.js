angular.module('bookstore.services', [])
.factory('Landing', function($http) {
  var getBooks = function(search, index) {
    return $http({
      method: 'GET',
      url: 'https://www.googleapis.com/books/v1/volumes?q=intitle:' + search + '&printType=books&orderBy=relevance&filter=ebooks&maxResults=40&startIndex=' + index
    })
    .then(function(res) {
      console.log(res.data.items);
      return res.data.items;
    });
  };

  return {
    getBooks: getBooks
  }
})