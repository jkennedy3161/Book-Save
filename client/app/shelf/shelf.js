angular.module('bookstore.shelf', [])
.controller('ShelfController', function($scope, $routeParams, Shelf, Details, $window, Auth) {
  $scope.collections = [];
  $scope.cart = [];
  $scope.items = 0;
  $scope.id = $routeParams.id;
  $scope.totalPrice = 0;
  $scope.checkout = false;
  $scope.location = $window.location;
  $scope.getShelf = function() {
    Shelf.getShelf($window.localStorage.getItem('userId'))
      .then(function(collections) {
        $scope.collections = collections;
      });
  };
  $scope.addToCart = function(book) {
      var bookNames = $scope.cart.map(function(book) {
        return book.title;
      });
      if (bookNames.includes(book.title)) {
        for (var i = 0; i < $scope.cart.length; i++) {
          if (bookNames[i] === book.title) {
            book.dupl++;
            $scope.cart.splice(i, 1, book);
            Shelf.updateBook(book._id, {dupl: book.dupl});
          }
        }
      } else {
        book.dupl = 1;
        $scope.cart.push(book);
        Shelf.updateBook(book._id, {dupl: book.dupl});
    }
    $scope.items++;
    $scope.totalPrice += Number(book.price);
    $scope.roundedPrice = Math.floor($scope.totalPrice * 100) / 100;
    $scope.alert = book.title + ' added to your cart!';
  };
  $scope.removeBook = function(book) {

    $scope.items -= book.dupl;
    // reset dupl for fresh cart
    Shelf.updateBook(book._id, {dupl: 0})
      .then(function(updatedBook) {
        Auth.removeBook(updatedBook)
           .then(function(removed) {
            for (var i = 0; i < $scope.cart.length; i++) {
              if($scope.cart[i].title  === book.title) {
                // update cart
                var removed = $scope.cart.splice(i, 1);
                $scope.totalPrice -= Number(book.price * removed[0].dupl);
                $scope.roundedPrice = Math.floor($scope.totalPrice * 100) / 100;
              }
            }
          })
          .then(function() {
            $scope.alert = book.title + ' removed from your shelf!';
            Shelf.getShelf()
              .then(function(books) {
                $scope.collections = books;
              });
          });
      });
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
      Shelf.sendToken(
        {
          stripeToken: result.id,
          price: Math.round($scope.roundedPrice * 100),
          name: result.card.name
        })
        .then(function(response) {
          var price = (response.amount / 100).toFixed(2);
          $scope.alert = response.outcome.seller_message +  ' Your card was charged with a total of $' + price;
        })
    }
    $('#myModal.modal').hide();
    $('.modal-backdrop').hide();
    // reset cart and price
    $scope.cart = [];
    $scope.roundedPrice = totalPrice = 0;
  };
})