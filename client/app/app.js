angular.module('bookstore', [
  'bookstore.landing',
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
})