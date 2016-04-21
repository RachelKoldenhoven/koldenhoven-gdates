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
    $scope.refreshMembers = function() {
      $scope.loading = true;
      memberDataService.getMembers($scope.pageNumber, $scope.filterCriteria)
          .then(function(members) {
            $scope.members = members;
            $scope.loading = false;
          });
    };
    $scope.filterByMe = function (param) {
      if($scope.filterCriteria === param) {
        return;
      }
      $scope.pageNumber = 1;
      $scope.filterCriteria = param;
      $scope.refreshMembers();

    };
    $scope.changePage = function(number) {
      if($scope.pageNumber === 1 && number <0) {
        return;
      }
      $scope.pageNumber += number;
      $scope.refreshMembers();
    };
    /// initialize state
    $scope.pageNumber = 1;
    $scope.filterByMe('all');

  }]);

app.controller('profileController', ['$rootScope', '$scope', '$location', '$stateParams', 'memberDataService',
  function($rootScope, $scope, $location, $stateParams, memberDataService) {
    var member = JSON.parse($rootScope.currentUser);
    var memberId = member._id;
    memberDataService.getMember(memberId)
      .then(function(member) {
        $scope.member = member.data.data;
      });

    $scope.update = function() {
      memberDataService.editMember($scope.member)
        .then(function(member) {
          $scope.member = member.data.data;
        });
    };

    $scope.delete = function() {
      memberDataService.deleteMember($scope.member);
      $location.path('/logout');
    }

  }]);