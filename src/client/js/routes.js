/**
 * Created by rachelkoldenhoven on 4/19/16.
 */
(function () {

  'use strict';

  angular.module('gDates')
    .config(appConfig)
    .run(routeChange);

  appConfig.$inject = ['$routeProvider', '$httpProvider'];
  routeChange.$inject = ['$rootScope', '$location', '$window', 'authService'];

  function appConfig($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/home.html',
        restricted: false,
        preventLoggedIn: true
      })
      .when('/register', {
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
      .when('/members', {
        templateUrl: 'templates/members.html',
        controller: 'membersController',
        restricted: true,
        preventLoggedIn: false
      })
      .when('/profile', {
        templateUrl: 'templates/profile.html',
        controller: 'profileController',
        restricted: true,
        preventLoggedIn: false
      })
      .when('/search', {
        templateUrl: 'templates/search.html',
        controller: 'searchController',
        restricted: true,
        preventLoggedIn: false
      })
      .when('/singleMember', {
        templateUrl: 'templates/singleMember.html',
        controller: 'singleMemberController',
        restricted: true,
        preventLoggedIn: false
      })
      .otherwise({redirectTo: '/login'});
    //$httpProvider.interceptors.push('authInterceptor');
  }

  function routeChange($rootScope, $location, $window, authService) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      // if route us restricted and no token is present
      if(next.restricted && !$window.localStorage.getItem('token')) {
        $location.path('/login');
      }
      // if token and prevent loggedin is true
      if(next.preventLoggedIn && $window.localStorage.getItem('token')) {
        $location.path('/members');
      }
    });
  }

})();

