angular.module('bookstore.services', [])
.factory('Auth', function($http, $window) {
  var signup = function(data) {
    return $http({
      method: 'POST',
      url: '/api/users',
      data: JSON.stringify(data),
      ContentType: 'application/json'
    })
    .then(function(res) {
      return res.data.token;
    })
  };
  var signin = function(data) {
    return $http({
      method: 'POST',
      url: '/auth/signin' ,
      data: data,
      headers: $window.localStorage.getItem('access_token'),
      ContentType: 'application/json'
    })
    .then(function(res) {
      return res.data;
    });
  };
  var me = function(token) {
    return $http({
      method: 'GET',
      url: '/api/users/me',
      params: {access_token: token},
      ContentType: 'application/json'
    })
    .then(function(res) {
      return res.data;
    });
  };
  var removeBook = function(bookId) {
    return $http({
      method: 'DELETE',
      url: '/api/books/' + bookId,
      params: {access_token: $window.localStorage.getItem('access_token')},
      ContentType: 'application/json'
    })
    .then(function(res) {
      return res.data;
    });
  };
  return {
    signup: signup,
    signin: signin,
    me: me,
    removeBook: removeBook
  }
})
.factory('Landing', function($http, $window) {
  var getBooks = function(search, index) {
    return $http({
      method: 'GET',
      url: 'https://www.googleapis.com/books/v1/volumes?q=' + search + '&printType=books&orderBy=relevance&filter=ebooks&maxResults=40&startIndex=' + index
    })
    .then(function(res) {
      return res.data;
    });
  };
  var saveBook = function(book) {
    return $http({
      method: 'POST',
      url: 'api/books',
      data: JSON.stringify(book),
      ContentType: 'application/json',
      params: {access_token: $window.localStorage.getItem('access_token')}
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
.factory('Shelf', function($http, $window) {
  var getShelf = function(userId) {
    return $http({
      method: 'GET',
      url: 'api/books/',
      params: {userId: userId, access_token: $window.localStorage.getItem('access_token')},
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
      return res.data;
    });
  }

  return {
    bookInfo: bookInfo
  }
});