/**
 * Created by rachelkoldenhoven on 4/19/16.
 */
app.controller('navController', ['$rootScope', '$scope', 'authService',
  function($rootScope, $scope, authService){
    $rootScope.currentUser = authService.getUserInfo();
  }]);


app.controller('registerController', ['$scope', '$location', 'authService',
  function($scope, $location, authService) {
    $scope.user = {};
    $scope.register = function() {
      console.log($scope.user);
      authService.register($scope.user)
        .then(function(user) {
          authService.setUserInfo(user);
          $location.path('/');
        })
        .catch(function(err) {
          // check status code, send appropriate message
          console.log(err);
        });
    };
  }]);