angular.module('bookstore', [
  'bookstore.landing',
  'bookstore.shelf',
  'bookstore.services',
  'ngRoute'])
.controller('bookstoreController', function() {
})
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/landing/landing.html',
      controller: 'LandingController'
    })
    .when('/shelf', {
      templateUrl: 'app/shelf/shelf.html',
      controller: 'ShelfController'
    })
})