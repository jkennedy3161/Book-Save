angular.module('bookstore.services', [])
.factory('Landing', function($http) {
  var getBooks = function(search) {
    return $http({
      method: 'GET',
      url: 'https://www.googleapis.com/books/v1/volumes?q=intitle:' + search + '&printType=books&orderBy=relevance&maxResults=40'
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