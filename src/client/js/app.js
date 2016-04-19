/**
 * Created by rachelkoldenhoven on 4/19/16.
 */
var app = angular.module('gDates', ['ngRoute', 'ngSanitize']);


app.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/home.html',
      restricted: true,
      preventLoggedIn: false
    })
    .when('/register',{
      templateUrl: 'templates/register.html',
      controller: 'registerController',
      restricted: false,
      preventLoggedIn: true
    })
    .when('/login', {
      templateUrl: 'templates/login.html',
      controller: 'loginController',
      restricted: false,
      preventLoggedIn: true
    })
    .when('/logout', {
      restricted: false,
      preventLoggedIn: false,
      resolve: {
        test: function(authService, $rootScope, $location) {
          authService.logout();
          $rootScope.currentUser = authService.getUserInfo();
          $location.path('/login');
        }
      }
    })
    .otherwise({redirectTo: '/login'});
  $httpProvider.interceptors.push('authInterceptor');
});