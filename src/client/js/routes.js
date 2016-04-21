/**
 * Created by rachelkoldenhoven on 4/19/16.
 */
(function () {

  'use strict';

  angular.module('gDates')
    .config(appConfig)
    .run(routeChange);

  appConfig.$inject = ['$stateProvider', '$httpProvider', '$urlRouterProvider'];
  routeChange.$inject = ['$rootScope', '$location', '$window', 'authService'];

  function appConfig($stateProvider, $httpProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'templates/home.html',
        restricted: false,
        preventLoggedIn: true
      })
      .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'registerController',
        restricted: false,
        preventLoggedIn: true
      })
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginController',
        restricted: false,
        preventLoggedIn: true
      })
      .state('logout', {
        url: '/logout',
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
      .state('members', {
        url: '/members',
        templateUrl: 'templates/members.html',
        controller: 'membersController',
        restricted: true,
        preventLoggedIn: false
      })
      .state('members.selected', {
        url: '/:id',
        templateUrl: 'templates/singleMember.html',
        controller: 'profileController',
        restricted: true,
        preventLoggedIn: false
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'templates/profile.html',
        controller: 'profileController',
        restricted: true,
        preventLoggedIn: false
      })
      .state('search', {
        url: '/search',
        templateUrl: 'templates/search.html',
        controller: 'searchController',
        restricted: true,
        preventLoggedIn: false
      })
      .state('singleMember', {
        url: '/singleMember',
        templateUrl: 'templates/singleMember.html',
        controller: 'singleMemberController',
        restricted: true,
        preventLoggedIn: false
      });
      $urlRouterProvider.otherwise('/login');
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

