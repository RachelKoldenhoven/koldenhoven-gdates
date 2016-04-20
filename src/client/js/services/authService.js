/**
 * Created by rachelkoldenhoven on 4/19/16.
 */

app.service('authService', ['$http', '$window', function($http, $window) {
  var user = {};
  return {
    login: function(user) {
      return $http.post('https://galvanize-student-apis.herokuapp.com/gdating/auth/login', user);
    },
    logout: function(user) {
      user = null;
      $window.localStorage.clear();
    },
    register: function(user) {
      return $http.post('https://galvanize-student-apis.herokuapp.com/gdating/auth/register', user);
    },
    setUserInfo: function(userData) {
      $window.localStorage.setItem('user', JSON.stringify(userData.data.data.user));
      $window.localStorage.setItem('token', JSON.stringify(userData.data.data.token));
    },
    getUserInfo: function(userData) {
      return $window.localStorage.getItem('user');
    }
  };
}]);

//app.service('authInterceptor', ['$window', function($window) {
//  return {
//    request: function(config) {
//      // check for token in headers
//      // config.headers['X-requested-with'] = XMLHttpRequest;
//      var token = $window.localStorage.getItem('token');
//      if(token) {
//        //config.headers.Authorization = "Bearer " + token;
//        // return $q.resolve(config);
//      }
//      return config;
//    }
//  };
//}]);