/**
 * Created by rachelkoldenhoven on 4/19/16.
 */
app.controller('navController', ['$rootScope', '$scope', 'authService',
  function($rootScope, $scope, authService){
    $rootScope.currentUser = authService.getUserInfo();
  }]);