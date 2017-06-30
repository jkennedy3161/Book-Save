angular.module('bookstore', [
  'bookstore.account',
  'bookstore.signup',
  'bookstore.landing',
  'bookstore.shelf',
  'bookstore.details',
  'bookstore.services',
  'ngRoute'])
.controller('bookstoreController', function() {
})
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/account/account.html',
      controller: 'AccountController'
    })
    .when('/signup', {
      templateUrl: 'app/signup/signup.html',
      controller: 'SignUpController'
    })
    .when('/landing', {
      templateUrl: 'app/landing/landing.html',
      controller: 'LandingController'
    })
    .when('/shelf', {
      templateUrl: 'app/shelf/shelf.html',
      controller: 'ShelfController'
    })
    .when('/details/:id', {
      templateUrl: 'app/details/details.html',
      controller: 'DetailsController'
    })
    .otherwise('/', {
      templateUrl: 'app/account/account.html'
    })
})