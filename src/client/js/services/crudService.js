/**
 * Created by rachelkoldenhoven on 4/19/16.
 */
app.service('crudService', ['$http', function($http) {

  return {
    getAll: function(resource) {
      return $http.get(resource)
        .then(function(res){
          return res;
        })
        .catch(function(err){
          console.log(err);
          return err;
        });
    },
    getOne: function(resource) {
      return $http.get(resource)
        .then(function(res) {
          return res;
        })
        .catch(function(err) {
          console.log(err);
          return err;
        })
    },
    editOne: function(resource, payload) {
      return $http.put(resource, payload)
        .then(function(res){
          return res;
        })
        .catch(function(err){
          console.log(err);
          return err;
        });
    },
    removeOne: function(resource) {
      return $http.delete(resource)
        .then(function(res){
          console.log('crudServicedelete: ', res);
          return res;
        })
        .catch(function(err){
          console.log(err);
          return err;
        });
    }
  };

}]);