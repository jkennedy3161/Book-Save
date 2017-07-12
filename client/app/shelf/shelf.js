angular.module('bookstore.shelf', [])
.controller('ShelfController', function($scope, $routeParams, Shelf, Details, $window, Auth) {
  $scope.collections = [];
  $scope.cart = [];
  $scope.id = $routeParams.id;
  $scope.totalPrice = 0;
  $scope.checkout = false;
  $scope.location = $window.location;  $scope.getShelf = function() {
    Shelf.getShelf($window.localStorage.getItem('userId'))
      .then(function(collections) {
        console.log(collections);
        $scope.collections = collections;
      });
  };
  $scope.addToCart = function(book) {
    console.log($scope.location);
    console.log(book);
    $scope.cart = $scope.cart.concat(book);
    console.log($scope.cart);
    $scope.totalPrice += Number(book.price);
    $scope.roundedPrice = Math.floor($scope.totalPrice * 100) / 100;
  };
  $scope.removeBook = function(bookId) {
    Auth.removeBook(bookId)
      .then(function(book) {
        $scope.alert = book.title + ' removed from your shelf!';
        Shelf.getShelf().then(function(books) {$scope.collections = books;});
      })
  };
  $scope.fakeBuy = function() {
    $scope.checkout = true;
    $('#myModal').on('shown.bs.modal', function () {
  $('#myInput').focus()
})
  };
  $scope.stripeCallback = function(code, result) {
    if(result.error) {
      alert('it failed! error: ' + result.error.message);
    } else {
      console.log(result);
      Shelf.sendToken(
        {
          stripeToken: result.id,
          price: Math.round($scope.roundedPrice * 100),
          name: result.card.name
        })
        .then(function(response) {
          var price = (response.amount / 100).toFixed(2);
          $scope.alert = response.outcome.seller_message + '! Your card was charged with a total of $' + price;
        })
    }
    $('#myModal.modal').hide();
    $('.modal-backdrop').hide();
    // reset cart and price
    $scope.cart = [];
    $scope.roundedPrice = totalPrice = 0;
  };
})