angular.module('bookstore.services', [])
.factory('Auth', function($http) {
  var login = function(data) {
    return $http({
      method: 'POST',
      url: '/api/users',
      data: JSON.stringify(data),
      ContentType: 'application/json'
    })
    .then(function(res) {
      return res.data;
    })
  };
  return {
    login: login
  }
})
.factory('Landing', function($http) {
  var getBooks = function(search, index) {
    return $http({
      method: 'GET',
      url: 'https://www.googleapis.com/books/v1/volumes?q=' + search + '&printType=books&orderBy=relevance&filter=ebooks&maxResults=40&startIndex=' + index
    })
    .then(function(res) {
      //console.log(res.data);
      return res.data;
    });
  };
  var saveBook = function(book) {
    return $http({
      method: 'POST',
      url: 'api/books',
      data: JSON.stringify(book)
    })
    .then(function(res) {
      return res.data;
    });
  };

  return {
    getBooks: getBooks,
    saveBook: saveBook
  }
})
.factory('Shelf', function($http) {
  var getShelf = function() {
    return $http({
      method: 'GET',
      url: 'api/books',
      ContentType: 'application/json'
    })
    .then(function(res) {
      return res.data;
    });
  };

  return {
    getShelf: getShelf
  };
})
.factory('Details', function($http) {
  var bookInfo = function(id) {
    return $http({
      method: 'GET',
      url: 'api/books/' + id,
      ContentType: 'application/json'
    })
    .then(function(res) {
      //console.log(res.data)
      return res.data;
    });
  }

  return {
    bookInfo: bookInfo
  }
});