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
      $scope.user.slug = $scope.user.username;
      console.log($scope.user);
      authService.register($scope.user)
        .then(function(user) {
          authService.setUserInfo(user);
          $location.path('/members');
        })
        .catch(function(err) {
          // check status code, send appropriate message
          console.log(err);
        });
    };
  }]);


app.controller('loginController', ['$rootScope', '$scope', '$location', 'authService',
  function($rootScope, $scope, $location, authService) {
    $scope.user = {};
    $scope.login = function() {
      authService.login($scope.user)
        .then(function(user) {
          authService.setUserInfo(user);
          $location.path('/members');
          $rootScope.currentUser = authService.getUserInfo();
        })
        .catch(function(err) {
          // check status code, send appropriate message
          console.log(err);
        });
    };
  }]);

app.controller('membersController', ['$scope', 'memberDataService',
  function($scope, memberDataService) {

    memberDataService.getMembers()
      .then(function(members) {
        console.log(members);
        $scope.members = members.data.data;
      });

  }]);