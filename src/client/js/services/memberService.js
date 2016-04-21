/**
 * Created by rachelkoldenhoven on 4/19/16.
 */
app.service('memberDataService', ['$rootScope', 'crudService', function($rootScope, crudService) {

  return {
    getMembers: function() {
      return crudService.getAll('https://galvanize-student-apis.herokuapp.com/gdating/members?limit=10')
        .then(function(members) {
          return members;
        });
    },
    getMember: function(memberId) {
      return crudService.getOne('https://galvanize-student-apis.herokuapp.com/gdating/members/' + memberId)
        .then(function(member) {
          return member;
        });
    },
    editMember: function(member) {
      crudService.editOne('https://galvanize-student-apis.herokuapp.com/gdating/members/' + member._id, member)
        .then(function(member) {
          return member;
        });
    },
    removeMember: function(memberId) {
      crudService.removeOne('https://galvanize-student-apis.herokuapp.com/gdating/members/' + memberId)
        .then(function(member) {
          return member;
        });
    }
  };

}]);